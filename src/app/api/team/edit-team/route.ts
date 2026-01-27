import { teamEditLimiter } from "@/lib/ratelimit";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

type Member = {
  name: string;
  email: string;
  userId: string;
  teamId: string;
  teamName: string;
  institution: string;
  role: "Leader" | "Member";
};

export async function POST(req: Request) {
  const {
    teamName: submittedTeamName,
    userId,
    email,
    members,
    teamId: submittedTeamId,
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
    const { success, reset } = await teamEditLimiter.limit(key);
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
      // Current team from database
      const existingCurrentTeam = await tx.team.findUnique({
        where: { id: submittedTeamId },
        include: { members: true },
      });

      console.log("Current team: ", existingCurrentTeam);

      // Check if edited team name is already taken
      console.log("Current existing team name: ", existingCurrentTeam?.name);
      console.log("Submitted team name: ", submittedTeamName);

      if (existingCurrentTeam?.name !== submittedTeamName) {
        const existingTeamName = await tx.team.findUnique({
          where: {
            name: submittedTeamName,
          },
        });

        if (existingTeamName) {
          console.log("Team name is already taken");
          throw new Error("TEAM_EXIST");
        }
      }

      // Check if all members are registered
      const existingSubmittedUsers = await tx.user.findMany({
        where: { email: { in: members.map((member: Member) => member.email) } },
      });

      const submittedMemberEmails = members.map(
        (member: Member) => member.email,
      );
      console.log("Submitted emails: ", submittedMemberEmails);

      console.log(
        "Existing users based on submitted emails: ",
        existingSubmittedUsers,
      );
      if (existingSubmittedUsers.length !== submittedMemberEmails.length) {
        return NextResponse.json(
          { success: false, error: "All members must be registered" },
          { status: 400 },
        );
      }

      // if all member is registered, add userId to submitted members
      const submittedMembers = members.map((member: Member) => {
        return {
          name: member.name,
          email: member.email,
          userId: existingSubmittedUsers.find(
            (user) => user.email === member.email,
          )?.id,
          role: member.role,
          institution: member.institution,
        };
      });

      console.log("Submitted members: ", submittedMembers);

      const submittedMemberEmailsSet = new Set(submittedMemberEmails);
      const existingCurrentTeamMembersEmails = new Set(
        existingCurrentTeam?.members.map((member) => member.email),
      );

      // Check if all members are unique
      const submittedMemberProfiles = existingSubmittedUsers.map((user) => {
        return {
          name: user.name,
          email: user.email,
          userId: user.id,
          role: user.role,
          institution: user.institution,
        };
      });
      console.log("Member profiles: ", submittedMemberProfiles);

      // Update team
      const team = await tx.team.update({
        where: { id: submittedTeamId },
        data: {
          name: submittedTeamName,
          leaderUserId: userId,
          leaderName,
          leaderEmail,
          leaderPhoneNumber,
          teamInstitution,
        },
      });

      console.log("Team updated: ", team);

      // Determined what's changed
      const membersToAdd = submittedMembers.filter(
        (member: Member) => !existingCurrentTeamMembersEmails.has(member.email),
      );
      console.log("Members to add: ", membersToAdd);

      const membersToRemove = existingCurrentTeam?.members.filter(
        (member) => !submittedMemberEmailsSet.has(member.email),
      );
      console.log("Members to remove: ", membersToRemove);

      const membersToUpdate = submittedMembers.filter((member: Member) =>
        existingCurrentTeamMembersEmails.has(member.email),
      );

      // Remove old members
      const removeMembers = await tx.teamMember.deleteMany({
        where: {
          teamId: submittedTeamId,
          email: {
            in: membersToRemove?.map((member) => member.email as string),
          },
        },
      });
      console.log("Remove members: ", removeMembers);
      // Add new members
      const addMembers = await tx.teamMember.createManyAndReturn({
        data: membersToAdd.map((member: Member) => ({
          name: member.name,
          email: member.email,
          teamId: submittedTeamId,
          teamName: submittedTeamName,
          role: member.role,
          institution: member.institution,
          userId:
            member.role === "Leader"
              ? userId
              : member.role === "Member"
                ? submittedMemberProfiles.find(
                    (memberProfile) => memberProfile.email === member.email,
                  )?.userId
                : undefined,
        })),
      });
      console.log("Add members: ", addMembers);

      await Promise.all(
        addMembers.map((member) =>
          tx.user.update({
            where: { id: member.userId },
            data: {
              institution: member.institution,
            },
          }),
        ),
      );

      console.log("Members to update: ", membersToUpdate);

      const updatedUser = await Promise.all(
        membersToUpdate.map((member: Member) =>
          tx.teamMember.update({
            where: {
              userId_teamId: {
                userId: member.userId,
                teamId: submittedTeamId,
              },
            },
            data: {
              name: member.name,
              role: member.role,
              email: member.email,
              institution: member.institution,
              teamName: submittedTeamName,
              userId:
                member.role === "Leader"
                  ? userId
                  : member.role === "Member"
                    ? submittedMemberProfiles.find(
                        (memberProfile) => memberProfile.email === member.email,
                      )?.userId
                    : undefined,
            },
          }),
        ),
      );

      console.log("Updated user: ", updatedUser);

      await Promise.all(
        updatedUser.map((member) =>
          tx.user.update({
            where: { id: member.userId },
            data: {
              institution: member.institution,
            },
          }),
        ),
      );

      return {
        team,
        membersToAdd,
        membersToRemove,
        membersToUpdate,
        addMembers,
        updatedUser,
      };
    });

    console.log("Success! Team and Members are edited.");
    return NextResponse.json({ success: true, ...result }, { status: 200 });
  } catch (error: any) {
    // console.log(error);
    console.error("Team Edit Error:", error);
    const message =
      error.message === "TEAM_EXIST"
        ? "Team name has taken"
        : "Something went wrong when editing team";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
