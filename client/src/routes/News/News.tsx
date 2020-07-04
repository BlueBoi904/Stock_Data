import React from 'react';

function News(): JSX.Element {
  async function getNews() {
    try {
      const response = await fetch('http://localhost:8080/news');
      const data = await response.json();
      console.log('data', data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>News</h1>
      <button onClick={getNews}>Get News</button>
    </div>
  );
}

export default News;
