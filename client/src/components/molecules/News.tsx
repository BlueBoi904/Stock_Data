import React, { useEffect } from 'react';
import './styles/News.scss';
import { useGetNews } from '../../hooks';
import { SubTextTag, TextListTag, TextSubTitle } from '../atoms';

export function News({ ticker }: { ticker: string }) {
  const { data, getNews } = useGetNews();
  useEffect(() => {
    getNews(ticker);
  }, [getNews, ticker]);
  return (
    <div className="News">
      <TextSubTitle>News</TextSubTitle>
      <div className="news-link">
        <ol>
          {data.map((item) => {
            return (
              <li key={item.url}>
                <TextListTag>11:02AM</TextListTag>
                <a href={item.url}>{item.headline}</a>
                <SubTextTag>{item.source}</SubTextTag>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
