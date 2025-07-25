import { likesMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function deleteLike(article_id: number, user_id: number) {
  const res = await fetch(
    `${apiRoutes.LIKES}/${article_id}?user_id=${user_id}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(likesMessages.deleteFail);
  }

  return res.json();
}
