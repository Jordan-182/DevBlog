"use client";

import { getAllLikes } from "@/service/LikeService";
import { useEffect, useState } from "react";
import styles from "./LikesCount.module.css";

interface LikesCountProps {
  articleId: number;
  refreshTrigger?: number;
}

export default function LikesCount({
  articleId,
  refreshTrigger = 0,
}: LikesCountProps) {
  const [likesCount, setLikesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikesCount = async () => {
      if (!articleId) return;

      try {
        setIsLoading(true);
        const allLikes = await getAllLikes(articleId);
        setLikesCount(Array.isArray(allLikes) ? allLikes.length : 0);
      } catch (error) {
        console.error("Erreur lors du chargement du compteur de likes:", error);
        setLikesCount(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikesCount();
  }, [articleId, refreshTrigger]);

  if (isLoading) {
    return <span className={styles.loading}>...</span>;
  }

  return (
    <span className={styles.likesCounter}>
      {likesCount} {likesCount <= 1 ? "like" : "likes"}
    </span>
  );
}
