import React, { useEffect } from 'react';
import './styles/News.scss';
import { useGetNews } from '../../hooks';

export function News({ ticker }: { ticker: string }) {
  const { data, getNews } = useGetNews();
  useEffect(() => {
    getNews(ticker);
  }, [ticker]);
  return (
    <div className="News">
      <h1>News</h1>
      {data &&
        data.map((item) => {
          return (
            <div className="news-link">
              <a href={item.url}>{item.headline}</a>
            </div>
          );
        })}
    </div>
  );
}
