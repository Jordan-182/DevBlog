import { articlesMessages } from "@/data/responseMessages";
import { apiRoutes } from "@/data/ROUTES";

export async function getAll() {
  const res = await fetch(`${apiRoutes.ARTICLES}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error(articlesMessages.error);
  return res.json();
}
