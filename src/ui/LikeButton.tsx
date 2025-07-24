import { useUserContext } from "@/context/UserContext";
import { ArticleModel } from "@/model/ArticleModel";
import { LikeModel } from "@/model/LikeModel";
import { addOne } from "@/service/LikeService";
import Image from "next/image";

interface LikeButtonProps {
  article: ArticleModel;
}

export default function LikeButton({ article }: LikeButtonProps) {
  const { user } = useUserContext();
  const userId = user?.id;
  const articleId = article?.id;

  const handleLike = async () => {
    const newLike: LikeModel = {
      article_id: articleId,
      user_id: userId,
    };
    await addOne(newLike);
  };

  return (
    <button onClick={handleLike}>
      <Image src={"/like.png"} alt="Liker l'article" height={20} width={20} />
    </button>
  );
}
