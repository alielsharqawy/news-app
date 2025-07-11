"use client";
import { useEffect, useState } from "react";
import { fetchNews } from "@/utils/fetchNews";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";

interface Article {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  source: { name: string };
}

const NewsGrid: React.FC<{ articles: Article[] }> = ({ articles }) => {
  if (articles.length === 0) {
    return (
      <p className="text-center col-span-full text-gray-500 text-lg">
        No news available at the moment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, idx) => (
        <NewsCard key={`${article.url}-${idx}`} article={article} />
      ))}
    </div>
  );
};

export default function Home() {
  const [news, setNews] = useState<Article[]>([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState(""); // not used currently
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const articles = await fetchNews(category, search); // ✅ دمج البحث والفئة
        setNews(articles || []);
      } catch {
        setError("An error occurred while loading news. Please try again later.");
        setNews([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeout = setTimeout(() => loadNews(), 400); // 🔍 delay عند البحث
    return () => clearTimeout(timeout); // cleanup
  }, [category, search]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />
      <main className="container mx-auto p-6">
        {isLoading ? (
          <div className="text-center text-gray-600 text-lg">
            Loading news...
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-lg">{error}</div>
        ) : (
          <NewsGrid articles={news} />
        )}
      </main>
    </div>
  );
}
