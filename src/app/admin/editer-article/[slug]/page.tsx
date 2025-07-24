"use client";

import { ArticleModel } from "@/model/ArticleModel";
import { getOneBySlug } from "@/service/ArticlesService";
import { useEffect, useState } from "react";
import styles from "./editPage.module.css";

export default function EditArticle({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<ArticleModel | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getOneBySlug(params.slug);
        setArticle(data);
      } catch (err) {
        console.error("Erreur lors du fetch de l'article :", err);
      }
    };

    fetchArticle();
  }, [params.slug]);

  const [title, setTitle] = useState(article?.title);
  const [slug, setSlug] = useState(article?.slug);
  const [summary, setSummary] = useState(article?.summary);
  const [content, setContent] = useState(article?.content);
  const [coverUrl, setCoverUrl] = useState(article?.cover_url);

  const handleSubmit = (e: React.FormEvent) => {};

  return (
    <section className={styles.container}>
      <h1>Modifier l&apos;article {article?.id}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="title">
          Titre
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de l'article"
            maxLength={255}
            required
          />
        </label>
        <label htmlFor="slug">
          Slug
          <input
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            type="text"
            placeholder="Slug de l'article"
            maxLength={255}
            required
          />
        </label>
        <label htmlFor="summary">
          Aperçu
          <textarea
            id="summary"
            name="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Aperçu de l'article"
            maxLength={65535}
            required
          />
        </label>
        <label htmlFor="cover_url">
          Lien de l&apos;illustration
          <input
            id="cover_url"
            name="cover_url"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            type="text"
            placeholder="URL de l'illustrartion de l'article"
            maxLength={65535}
            required
          />
        </label>
        <label htmlFor="content">
          Contenu
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Contenu de l'article"
            maxLength={65535}
            required
          />
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </section>
  );
}
