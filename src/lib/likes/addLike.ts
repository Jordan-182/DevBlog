import { likesMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function addLike(like: {
  article_id: number | null | undefined;
  user_id: number | null | undefined;
}) {
  const res = await fetch(apiRoutes.LIKES, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(like),
  });

  if (!res.ok) throw new Error(likesMessages.addFail);
  return res.json();
}
