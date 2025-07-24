import { articlesMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";
import { ArticleModel } from "@/model/ArticleModel";

export async function getOne(slug: string): Promise<ArticleModel> {
  const res = await fetch(`${apiRoutes.ARTICLES}/${slug}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404) {
    throw new Error(articlesMessages.notFound);
  }

  if (!res.ok) {
    throw new Error(articlesMessages.error);
  }

  return res.json();
}
