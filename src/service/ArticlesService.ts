import { getAll } from "@/lib/articles/getArticles";
import { ArticleModel } from "@/model/ArticleModel";

export async function getAllArticles(): Promise<ArticleModel[]> {
  return getAll();
}
