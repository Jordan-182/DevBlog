"use client";

import { useArticlesContext } from "@/context/ArticlesContext";
import { appRoutes } from "@/data/ROUTES";
import { ArticleModel } from "@/model/ArticleModel";
import { editOne, getOneBySlug } from "@/service/ArticlesService";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import styles from "./editPage.module.css";

export default function EditArticle() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const [article, setArticle] = useState<ArticleModel | null>(null);
  const { setArticles } = useArticlesContext();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getOneBySlug(slug);
        setArticle(data);
      } catch (err) {
        console.error("Erreur lors du fetch de l'article :", err);
      }
    };

    fetchArticle();
  }, [slug]);

  const [titleState, setTitleState] = useState("");
  const [slugState, setSlugState] = useState("");
  const [summaryState, setSummaryState] = useState("");
  const [contentState, setContentState] = useState("");
  const [coverUrlState, setCoverUrlState] = useState("");

  useEffect(() => {
    if (article) {
      setTitleState(article.title);
      setSlugState(article.slug);
      setSummaryState(article.summary);
      setContentState(article.content);
      setCoverUrlState(article.cover_url);
    }
  }, [article]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title: string = titleState;
    const slug: string = slugState;
    const summary: string = summaryState;
    const content: string = contentState;
    const cover_url: string = coverUrlState;

    if (
      !title.trim() ||
      !slug.trim() ||
      !summary.trim() ||
      !content.trim() ||
      !cover_url.trim()
    ) {
      return;
    }
    if (title.trim().length > 255 || slug.trim().length > 255) {
      return;
    }

    try {
      await editOne({
        id: article?.id,
        title: title.trim(),
        slug: slug.trim(),
        summary: summary.trim(),
        content: content.trim(),
        cover_url: cover_url.trim(),
        created_at: article?.created_at,
        user_id: article?.user_id,
      } as ArticleModel);
      setArticles((prev) =>
        prev && article
          ? prev.map((a) =>
              a.id === article.id
                ? new ArticleModel(
                    article.id,
                    title,
                    slug,
                    summary,
                    content,
                    cover_url,
                    article.created_at,
                    article.user_id
                  )
                : a
            )
          : prev
      );

      setTimeout(() => {
        router.push(appRoutes.ADMIN);
      }, 1500);
    } catch (err: unknown) {
      console.error("Erreur : ", err);
    }
  };

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
            value={titleState}
            onChange={(e) => setTitleState(e.target.value)}
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
            value={slugState}
            onChange={(e) => setSlugState(e.target.value)}
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
            value={summaryState}
            onChange={(e) => setSummaryState(e.target.value)}
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
            value={coverUrlState}
            onChange={(e) => setCoverUrlState(e.target.value)}
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
            value={contentState}
            onChange={(e) => setContentState(e.target.value)}
            placeholder="Contenu de l'article"
            maxLength={65535}
            required
          />
        </label>
        <button type="submit">Modifier</button>
      </form>
    </section>
  );
}
