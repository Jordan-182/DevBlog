"use client";

import { useUserContext } from "@/context/UserContext";
import { ArticleModel } from "@/model/ArticleModel";
import { LikeModel } from "@/model/LikeModel";
import { addOne, checkIfUserLiked, deleteOne } from "@/service/LikeService";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./LikeButton.module.css";

interface LikeButtonProps {
  article: ArticleModel;
  onLikeChange?: (increment: boolean) => void;
}

export default function LikeButton({ article, onLikeChange }: LikeButtonProps) {
  const { user } = useUserContext();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userId = user?.id;
  const articleId = article?.id;

  useEffect(() => {
    const checkLikeStatus = async () => {
      if (!userId || !articleId) return;

      try {
        const response = await checkIfUserLiked(articleId, userId);
        setIsLiked(response.exists);
      } catch (error) {
        console.error("Erreur lors de la vérification du like:", error);
      }
    };

    checkLikeStatus();
  }, [userId, articleId]);

  const handleLike = async () => {
    if (!userId || !articleId || isLoading) return;

    setIsLoading(true);

    try {
      if (!isLiked) {
        const newLike: LikeModel = {
          article_id: articleId,
          user_id: userId,
        };
        await addOne(newLike);
        setIsLiked(true);
        onLikeChange?.(true);
      } else {
        await deleteOne(articleId, userId);
        setIsLiked(false);
        onLikeChange?.(false);
      }
    } catch (error) {
      console.error("Erreur lors du like/unlike:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (!user) return null;

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`${styles.button} ${isLiked ? styles.liked : styles.notLiked}`}
    >
      <Image
        src={"/like.png"}
        alt={isLiked ? "Unlike l'article" : "Liker l'article"}
        height={20}
        width={20}
        className={styles.likeIcon}
      />
    </button>
  );
}
