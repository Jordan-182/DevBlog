import { articlesMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { ArticleModel } from "@/model/ArticleModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, title, slug, summary, content, cover_url, created_at, user_id FROM articles ORDER BY id DESC"
    );
    return NextResponse.json(rows as ArticleModel[]);
  } catch (error) {
    console.error("Erreur MySQL :", error);
    return NextResponse.json(
      { error: articlesMessages.server },
      { status: 500 }
    );
  }
}
