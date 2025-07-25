"use client";

import { useArticlesContext } from "@/context/ArticlesContext";
import { ArticleModel } from "@/model/ArticleModel";
import { deleteOne, getAllArticles } from "@/service/ArticlesService";
import Link from "next/link";
import { startTransition } from "react";
import styles from "./AdminArticleRow.module.css";

interface Props {
  article: ArticleModel;
}

export default function AdminArticleRow({ article }: Props) {
  const { setArticles } = useArticlesContext();
  const handleDelete = async () => {
    if (confirm("Supprimer cet article ?")) {
      startTransition(async () => {
        await deleteOne(article.id);
        const updatedArticles = await getAllArticles();
        setArticles(updatedArticles);
      });
    }
  };
  return (
    <li key={article.id} className={styles.container}>
      <h4>{article.title}</h4>
      <p>Posté le {article.created_at}</p>
      <section className={styles.buttonContainer}>
        <Link
          href={`/admin/editer-article/${article.slug}`}
          className={styles.editButton}
        >
          Editer
        </Link>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Supprimer
        </button>
      </section>
    </li>
  );
}
