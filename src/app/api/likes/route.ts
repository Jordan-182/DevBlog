import { likesMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface InsertResult {
  insertId: number;
  affectedRows?: number;
  warningStatus?: number;
}

export async function POST(request: NextRequest) {
  try {
    const { article_id, user_id } = await request.json();
    if (
      typeof user_id !== "number" ||
      typeof article_id !== "number" ||
      user_id <= 0 ||
      article_id <= 0
    ) {
      return NextResponse.json(
        { error: likesMessages.invalidData },
        { status: 400 }
      );
    }
    const [result] = (await db.query(
      "INSERT INTO likes (article_id, user_id) VALUES (?, ?)",
      [article_id, user_id]
    )) as [InsertResult, unknown];

    return NextResponse.json({
      message: likesMessages.addSuccess,
      insertedId: result.insertId,
    });
  } catch (error) {
    console.error("Erreur MySQL (POST) :", error);
    return NextResponse.json({ error: likesMessages.server }, { status: 500 });
  }
}
