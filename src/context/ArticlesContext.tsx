"use client";

import { ArticleModel } from "@/model/ArticleModel";
import { getAllArticles } from "@/service/ArticlesService";
import { createContext, useContext, useEffect, useState } from "react";

type ArticlesContextType = {
  articles: ArticleModel[] | null;
  setArticles: React.Dispatch<React.SetStateAction<ArticleModel[] | null>>;
};

const ArticlesContext = createContext<ArticlesContextType>({
  articles: null,
  setArticles: () => {},
});

export const useArticlesContext = () => useContext(ArticlesContext);

export function ArticlesProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<ArticleModel[] | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getAllArticles();
        setArticles(data);
      } catch (err) {
        console.error("Erreur lors du fetch articles context :", err);
        setArticles(null);
      }
    };
    fetchArticles();
  }, []);

  return (
    <ArticlesContext value={{ articles, setArticles }}>
      {children}
    </ArticlesContext>
  );
}
