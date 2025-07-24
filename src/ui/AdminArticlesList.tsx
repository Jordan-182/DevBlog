"use client";

import { useArticlesContext } from "@/context/ArticlesContext";
import AdminArticleRow from "./AdminArticleRow";
import styles from "./AdminArticlesList.module.css";
import Loader from "./Loader";

export default function AdminArticleList() {
  const { articles } = useArticlesContext();
  if (!articles)
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <AdminArticleRow key={article.id} article={article} />
      ))}
    </ul>
  );
}
