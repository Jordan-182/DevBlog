"use client";

import { useArticlesContext } from "@/context/ArticlesContext";
import { useUserContext } from "@/context/UserContext";
import { formMessages } from "@/data/formMessages";
import { articlesMessages } from "@/data/responseMessages";
import { addOne, getAllArticles } from "@/service/ArticlesService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./addPage.module.css";

export default function AddArticle() {
  const { user } = useUserContext();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { setArticles } = useArticlesContext();
  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title")?.toString().trim() || "";
    const slug = formData.get("slug")?.toString().trim() || "";
    const summary = formData.get("summary")?.toString().trim() || "";
    const content = formData.get("content")?.toString().trim() || "";
    const cover_url = formData.get("cover_url")?.toString().trim() || "";
    const user_id = user?.id || 1;
    if (!title || !content || !summary || !content || !cover_url) {
      setError(formMessages.requiredInput);
      return;
    }
    if (title.length > 255) {
      setError(formMessages.titleTooLong);
      return;
    }
    if (slug.length > 255) {
      setError(formMessages.titleTooLong);
      return;
    }

    try {
      await addOne({ title, slug, summary, content, cover_url, user_id });
      const updatedArticles = await getAllArticles();
      setArticles(updatedArticles);
      setSuccess(articlesMessages.addSuccess);
      setTimeout(() => {
        router.push("/admin");
      }, 1500);
    } catch {
      setError(articlesMessages.addFail);
    }
  };

  return (
    <section className={styles.container}>
      {success ? (
        <p className={styles.success}>
          {success} Vous allez être redirigés vers la page admin.
        </p>
      ) : (
        <>
          <h1>Ajouter un article</h1>
          <form action={handleSubmit} className={styles.form}>
            <label htmlFor="title">
              Titre
              <input
                id="title"
                name="title"
                type="text"
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
                placeholder="Contenu de l'article"
                maxLength={65535}
                required
              />
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit">Ajouter</button>
          </form>
        </>
      )}
    </section>
  );
}
