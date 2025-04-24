import React from 'react';

// Define the article type for better type safety
interface Article {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  source: { name: string };
}

type Props = {
  article: Article;
};

// Image Component with fallback
const ArticleImage: React.FC<{ urlToImage: string | null; title: string }> = ({ urlToImage, title }) => {
  if (!urlToImage) {
    return (
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-sm">لا توجد صورة متاحة</span>
      </div>
    );
  }
  return (
    <img
      src={urlToImage}
      alt={title}
      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
    />
  );
};

// Content Component
const ArticleContent: React.FC<{
  title: string;
  description: string | null;
  url: string;
  sourceName: string;
}> = ({ title, description, url, sourceName }) => (
  <div className="p-4 space-y-3">
    <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">{title}</h2>
    <p className="text-gray-600 text-sm line-clamp-3">
      {description || 'لا يوجد وصف متاح لهذا المقال.'}
    </p>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block text-teal-600 font-medium hover:text-teal-800 transition-colors duration-200"
    >
     Read More - {sourceName}
    </a>
  </div>
);

// Main NewsCard Component
const NewsCard: React.FC<Props> = ({ article }) => {
  return (
    <div className="group bg-white shadow-lg rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      {/* Article Image */}
      <ArticleImage urlToImage={article.urlToImage} title={article.title} />
      {/* Article Content */}
      <ArticleContent
        title={article.title}
        description={article.description}
        url={article.url}
        sourceName={article.source.name}
      />
    </div>
  );
};

export default NewsCard;