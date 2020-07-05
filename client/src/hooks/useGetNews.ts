import { useState } from 'react';

export type News = {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
};

export type NewsHookType = {
  getNews: (ticker: string) => Promise<void>;
  data: News[];
};

export function useGetNews(): NewsHookType {
  const [data, setData] = useState<News[]>([]);

  async function getNews(ticker: string) {
    try {
      const response = await fetch(`http://localhost:8080/news/${ticker}`);
      const datum: { news: News[] } = await response.json();
      const { news } = datum;
      setData(news);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getNews,
    data,
  };
}
