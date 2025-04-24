// pages/api/news.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category = '', search = '' } = req.query;

  const apiKey = process.env.NEWS_API_KEY as string; 
  const query =
    search !== ''
      ? `q=${encodeURIComponent(search as string)}`
      : category !== ''
      ? `category=${category}`
      : 'category=general';

  const url = `https://newsapi.org/v2/top-headlines?country=us&${query}&apiKey=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  return res.status(200).json(data.articles || []);
}
