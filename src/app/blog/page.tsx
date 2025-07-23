import { ArticleModel } from "@/model/ArticleModel";
import { getAllArticles } from "@/service/ArticlesService";
import Link from "next/link";
import styles from "./blogPage.module.css";

export default async function Blog() {
  const articles: ArticleModel[] = await getAllArticles();
  return (
    <section className={styles.page}>
      <h1>Blog</h1>
      <p>
        Des lignes de code, des retours d’expérience, des astuces front et back
        : ce blog est mon carnet de bord de développeur web. J’y documente ce
        que j’apprends en React, TypeScript, Node.js, et plus encore. Explore
        les articles ci-dessous 👇
      </p>
      <ul className={styles.articlesContainer}>
        {articles.map((article) => (
          <li key={article.id} className={styles.articleCard}>
            <div className={styles.imageContainer}>
              <img src={article.cover_url} alt={article.title} />
            </div>
            <div className={styles.cardContainer}>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
            </div>
            <div className={styles.linkContainer}>
              <Link href={`/blog/${article.slug}`} className={styles.link}>
                Lire l&apos;article
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
