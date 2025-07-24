import { deleteArticle } from "@/lib/articles/deleteArticle";
import { getAll } from "@/lib/articles/getArticles";
import { ArticleModel } from "@/model/ArticleModel";

export async function getAllArticles(): Promise<ArticleModel[]> {
  return getAll();
}

export async function deleteOne(id: number) {
  return deleteArticle(id);
}
