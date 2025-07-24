import { articlesMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function deleteArticle(id: number) {
  const res = await fetch(`${apiRoutes.ARTICLES}?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(articlesMessages.deleteFail);
  return { response: res.json(), status: 200 };
}
