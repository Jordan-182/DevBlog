import { addArticle } from "@/lib/articles/addArticle";
import { deleteArticle } from "@/lib/articles/deleteArticle";
import { getOne } from "@/lib/articles/getArticle";
import { getAll } from "@/lib/articles/getArticles";
import { patchArticle } from "@/lib/articles/patchArticle";
import { ArticleModel } from "@/model/ArticleModel";

export async function getAllArticles(): Promise<ArticleModel[]> {
  return getAll();
}

export async function getOneBySlug(slug: string): Promise<ArticleModel> {
  return getOne(slug);
}

export async function deleteOne(id: number) {
  return deleteArticle(id);
}

export async function addOne(article: Omit<ArticleModel, "id" | "created_at">) {
  return addArticle(article);
}

export async function editOne(
  article: ArticleModel
): Promise<{ message: string }> {
  return patchArticle(article);
}
