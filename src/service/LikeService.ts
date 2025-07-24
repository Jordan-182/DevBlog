import { addLike } from "@/lib/likes/addLike";
import { getLikesByArticle } from "@/lib/likes/getLikes";
import { LikeModel } from "@/model/LikeModel";

export async function addOne(like: LikeModel) {
  return addLike(like);
}

export async function getAllLikes(article_id: number) {
  return getLikesByArticle(article_id);
}
