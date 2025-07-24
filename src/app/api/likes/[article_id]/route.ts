import { likesMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { LikeModel } from "@/model/LikeModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { article_id: string } }
) {
  const { article_id } = params;

  try {
    const [rows] = await db.query(
      "SELECT id, article_id, user_id FROM likes WHERE article_id = ?",
      [article_id]
    );
    return NextResponse.json(rows as LikeModel[]);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json({ error: likesMessages.server }, { status: 500 });
  }
}
