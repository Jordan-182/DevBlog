import { apiRoutes } from "@/data/ROUTES";
import { ArticleModel } from "@/model/ArticleModel";
import Link from "next/link";
import styles from "./slugPage.module.css";

type Article = {
  title: string;
  content: string;
  cover_url: string;
  created_at: string;
};

export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/articles");
  const articles = await res.json();

  return articles.map((article: ArticleModel) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(`${apiRoutes.ARTICLES}/${params.slug}`);
  const article: Article = await res.json();

  return (
    <article className={styles.article}>
      <Link href={"/blog"}>← Retour</Link>
      <div className={styles.imageContainer}>
        <img src={article.cover_url} alt={article.title} />
      </div>
      <h1>{article.title}</h1>
      <p>Posté le {article.created_at}</p>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </article>
  );
}
