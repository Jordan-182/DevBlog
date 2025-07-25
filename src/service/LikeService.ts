import { addLike } from "@/lib/likes/addLike";
import { deleteLike } from "@/lib/likes/deleteLike";
import { checkUserLike, getLikesByArticle } from "@/lib/likes/getLikes";
import { LikeModel } from "@/model/LikeModel";

export async function addOne(like: LikeModel) {
  return addLike(like);
}

export async function deleteOne(article_id: number, user_id: number) {
  return deleteLike(article_id, user_id);
}

export async function getAllLikes(article_id: number) {
  return getLikesByArticle(article_id);
}

export async function checkIfUserLiked(article_id: number, user_id: number) {
  return checkUserLike(article_id, user_id);
}
