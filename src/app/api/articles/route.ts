import { articlesMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { ArticleModel } from "@/model/ArticleModel";
import { NextRequest, NextResponse } from "next/server";

interface InsertResult {
  insertId: number;
  affectedRows?: number;
  warningStatus?: number;
}

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

export async function POST(request: NextRequest) {
  try {
    const { title, slug, summary, content, cover_url, user_id } =
      await request.json();
    if (
      typeof title !== "string" ||
      typeof slug !== "string" ||
      typeof summary !== "string" ||
      typeof content !== "string" ||
      typeof cover_url !== "string" ||
      typeof user_id !== "number" ||
      title.trim() === "" ||
      slug.trim() === "" ||
      summary.trim() === "" ||
      content.trim() === "" ||
      cover_url.trim() === "" ||
      user_id <= 0 ||
      title.length > 255 ||
      slug.length > 255
    ) {
      return NextResponse.json(
        { error: articlesMessages.invalidData },
        { status: 400 }
      );
    }
    const [result] = (await db.query(
      "INSERT INTO articles (title, slug, summary, content, cover_url, user_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        title.trim(),
        slug.trim(),
        summary.trim(),
        content.trim(),
        cover_url.trim(),
        user_id,
      ]
    )) as [InsertResult, unknown];

    return NextResponse.json({
      message: articlesMessages.addSuccess,
      insertedId: result.insertId,
    });
  } catch (error) {
    console.error("Erreur MySQL (POST) :", error);
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
