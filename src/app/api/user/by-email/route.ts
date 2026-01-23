import { NextResponse } from "next/server";
import { db } from "@/server/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: `Missing email: ${email}` },
      { status: 400 },
    );
  }

  const user = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      institution: true,
      phoneNumber: true,
      domicile: true,
      education: true,
      major: true,
      semester: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: `User with ${email} not found or not registered` },
      { status: 404 },
    );
  }
  if (
    !user?.phoneNumber ||
    !user?.domicile ||
    !user?.institution ||
    !user?.education ||
    !user?.major ||
    !user?.semester
  ) {
    return NextResponse.json(
      {
        error: `${user.email} | ${user.name}'s profile is not complete yet! please make sure all the required fields are filled.`,
      },
      { status: 404 },
    );
  }

  return NextResponse.json(user, { status: 200 });
}
