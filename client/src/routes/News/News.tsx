import React, { useState } from 'react';
import { TextTitle, TextSubTitle } from '../../components/atoms';

function News(): JSX.Element {
  const [news, setNews] = useState();
  async function getNews() {
    try {
      const response = await fetch('http://localhost:8080/news');
      const data = await response.json();
      const { news } = data;
      setNews(news);
      console.log();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>News</h1>
      <button onClick={getNews}>Get News</button>
      {news &&
        news.map((item) => {
          return (
            <div key={item.id}>
              <TextTitle>{item.headline}</TextTitle>
              <TextSubTitle>{item.summary}</TextSubTitle>
            </div>
          );
        })}
    </div>
  );
}

export default News;
