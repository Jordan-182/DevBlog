import { likesMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function getLikesByArticle(article_id: number) {
  const res = await fetch(`${apiRoutes.LIKES}/${article_id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(likesMessages.error);
  return res.json();
}
