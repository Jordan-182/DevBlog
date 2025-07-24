import { articlesMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function addArticle(article: {
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_url: string;
  user_id: number;
}) {
  const res = await fetch(apiRoutes.ARTICLES, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });

  if (!res.ok) throw new Error(articlesMessages.addFail);
  return res.json();
}
