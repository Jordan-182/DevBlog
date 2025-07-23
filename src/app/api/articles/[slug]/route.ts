import { articlesMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import type { ArticleModel } from "@/model/ArticleModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  const pathname = _req.nextUrl.pathname;
  const slug = pathname.split("/").pop();
  if (!slug || typeof slug !== "string") {
    return NextResponse.json(
      { error: articlesMessages.invalidId },
      { status: 400 }
    );
  }

  try {
    const [rows] = await db.query(
      "SELECT id, title, slug, summary, content, cover_url, created_at, user_id FROM articles WHERE slug = ?",
      [slug]
    );
    const results = Array.isArray(rows) ? (rows as ArticleModel[]) : [];

    if (results.length === 0) {
      return NextResponse.json(
        { error: articlesMessages.notFound },
        { status: 404 }
      );
    }

    return NextResponse.json(results[0]);
  } catch (error) {
    console.error("Erreur MySQL (GET /api/articles/[slug]) :", error);
    return NextResponse.json(
      { error: articlesMessages.server },
      { status: 500 }
    );
  }
}
