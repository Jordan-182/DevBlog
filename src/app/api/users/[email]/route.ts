import { userMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { UserModel } from "@/model/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const userEmail = pathname.split("/").pop();
  if (typeof userEmail !== "string") {
    return NextResponse.json(
      { error: userMessages.invalidEmail },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.query(
      "SELECT u.name, u.email, u.avatar, u.status FROM users AS u WHERE u.email = ?",
      [userEmail]
    );
    const results = Array.isArray(rows) ? (rows as UserModel[]) : [];

    if (results.length === 0) {
      return NextResponse.json(
        { error: userMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/users/[email]) :", error);
    return NextResponse.json({ error: userMessages.server }, { status: 500 });
  }
}
