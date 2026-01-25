import { teamCreationLimiter } from "@/lib/ratelimit";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

type Member = {
  userId: string;
  name: string;
  email: string;
  institution: string;
  role: "Leader" | "Member";
  teamId: string;
  teamName: string;
};

export async function POST(req: Request) {
  const {
    name,
    userId,
    email,
    members,
    leaderName,
    leaderEmail,
    leaderPhoneNumber,
    teamInstitution,
  } = await req.json();
  try {
    const authUser = await db.user.findUnique({
      where: { email, id: userId },
    });
    if (!authUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const key = authUser ? `user:${userId}` : `ip:${ip}`;
    const { success, reset } = await teamCreationLimiter.limit(key);
    if (!success) {
      return NextResponse.json(
        {
          error: `Too many requests, please try again after ${Math.ceil(
            (reset - Date.now()) / 1000,
          )} seconds`,
          resetAt: reset,
        },
        { status: 429 },
      );
    }

    const result = await db.$transaction(async (tx) => {
      // Check if team name is already exist
      const existingTeamName = await tx.team.findUnique({ where: { name } });
      if (existingTeamName) throw new Error("TEAM_EXIST");

      const submittedMemberEmails = members.map(
        (member: Member) => member.email,
      );
      const existingUsers = await tx.user.findMany({
        where: { email: { in: submittedMemberEmails } },
      });

      // Create team
      const team = await tx.team.create({
        data: {
          name,
          leaderUserId: userId,
          leaderName,
          leaderEmail,
          leaderPhoneNumber,
          teamInstitution,
        },
      });

      // Prepare member data
      const membersToCreate = members.map((member: Member) => {
        const matchingUser = existingUsers.find(
          (u) => u.email === member.email,
        );
        return {
          name: member.name,
          email: member.email,
          institution: member.institution,
          teamId: team.id,
          teamName: name,
          role: member.role,
          userId: member.role === "Leader" ? userId : matchingUser?.id,
        };
      });

      // Create team members
      // Maybe this is where DO fails, need to double check it again later
      const createdMembers = await tx.teamMember.createManyAndReturn({
        data: membersToCreate,
      });

      // Update user profiles based on submitted data
      await Promise.all(
        createdMembers.map((member) => {
          if (member.userId) {
            return tx.user.update({
              where: { id: member.userId },
              data: { institution: member.institution },
            });
          }
        }),
      );
      return { team, createdMembers };
    });
    console.log("Success! Team and Members created.");
    return NextResponse.json({ success: true, ...result }, { status: 200 });
  } catch (error: any) {
    console.error("Team Creation Error:", error);
    const message =
      error.message === "TEAM_EXIST"
        ? "Team name has taken"
        : "Something went wrong when creating team";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
