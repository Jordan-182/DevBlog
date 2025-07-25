"use client";

import { useUserContext } from "@/context/UserContext";
import { ArticleModel } from "@/model/ArticleModel";
import { getAllLikes } from "@/service/LikeService";
import { useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import styles from "./LikesSection.module.css";

interface LikesSectionProps {
  article: ArticleModel;
}

export default function LikesSection({ article }: LikesSectionProps) {
  const { user } = useUserContext();
  const [likesCount, setLikesCount] = useState(0);

  const articleId = article?.id;

  // Charger le nombre de likes
  useEffect(() => {
    const loadLikesCount = async () => {
      if (!articleId) return;

      try {
        const allLikes = await getAllLikes(articleId);
        setLikesCount(Array.isArray(allLikes) ? allLikes.length : 0);
      } catch (error) {
        console.error("Erreur lors du chargement des likes:", error);
      }
    };

    loadLikesCount();
  }, [articleId]);

  // Fonction pour forcer le refresh du compteur depuis LikeButton
  const handleLikeChange = (increment: boolean) => {
    setLikesCount((prev) => (increment ? prev + 1 : Math.max(0, prev - 1)));
  };

  return (
    <div className={styles.likesContainer}>
      {user && <LikeButton article={article} onLikeChange={handleLikeChange} />}

      <span className={styles.likesCounter}>
        {likesCount} {likesCount <= 1 ? "like" : "likes"}
        {!user && likesCount > 0 && " • Connectez-vous pour liker"}
      </span>
    </div>
  );
}
