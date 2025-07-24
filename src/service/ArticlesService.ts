import { addArticle } from "@/lib/articles/addArticle";
import { deleteArticle } from "@/lib/articles/deleteArticle";
import { getAll } from "@/lib/articles/getArticles";
import { ArticleModel } from "@/model/ArticleModel";

export async function getAllArticles(): Promise<ArticleModel[]> {
  return getAll();
}

export async function deleteOne(id: number) {
  return deleteArticle(id);
}

export async function addOne(article: Omit<ArticleModel, "id" | "created_at">) {
  return addArticle(article);
}
