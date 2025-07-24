import { articlesMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { ArticleModel } from "@/model/ArticleModel";
import { NextRequest, NextResponse } from "next/server";

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

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");
    const requestId = idParam !== null ? parseInt(idParam, 10) : NaN;

    if (isNaN(requestId)) {
      return NextResponse.json(
        { error: articlesMessages.invalidId },
        { status: 400 }
      );
    }

    await db.query("DELETE FROM articles WHERE id = ?", [requestId]);
    return NextResponse.json({ message: articlesMessages.deleted });
  } catch (error) {
    console.error("Erreur MySQL (DELETE) :", error);
    return NextResponse.json(
      { error: articlesMessages.server },
      { status: 500 }
    );
  }
}
