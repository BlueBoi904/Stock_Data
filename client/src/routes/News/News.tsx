import React from 'react';
import { BaseNewsLayout } from './templates';

export function News(): JSX.Element {
  return <BaseNewsLayout />;
}

// Put your stuff in a comment as this is going to be refactored

/*
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

  function ShowRoute(){
    return(
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
    )
  }
  */
