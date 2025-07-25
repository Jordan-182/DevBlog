import { likesMessages } from "@/data/responseMessages";
import { db } from "@/lib/db";
import { LikeModel } from "@/model/LikeModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { article_id: string } }
) {
  const { article_id } = params;
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");

  try {
    if (user_id) {
      const [rows] = await db.query(
        "SELECT id, article_id, user_id FROM likes WHERE article_id = ? AND user_id = ?",
        [article_id, user_id]
      );
      const results = Array.isArray(rows) ? (rows as LikeModel[]) : [];

      return NextResponse.json({
        exists: results.length > 0,
        like: results.length > 0 ? results[0] : null,
      });
    }

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { article_id: string } }
) {
  const { article_id } = params;
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return NextResponse.json(
      { error: "user_id est requis pour supprimer un like" },
      { status: 400 }
    );
  }

  try {
    const [result] = await db.query(
      "DELETE FROM likes WHERE article_id = ? AND user_id = ?",
      [article_id, user_id]
    );

    const deleteResult = result as { affectedRows: number };

    if (deleteResult.affectedRows === 0) {
      return NextResponse.json(
        { error: likesMessages.notFound || "Like non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: likesMessages.deleted,
      deleted: true,
    });
  } catch (error) {
    console.error("Erreur MySQL (DELETE) :", error);
    return NextResponse.json({ error: likesMessages.server }, { status: 500 });
  }
}
