import React from "react";

function News() {
  async function getNews() {
    try {
      let response = await fetch("http://localhost:8080/news");
      let data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  }

  return (<div>
    <h1>News</h1>
    <button onClick={getNews}>Get News</button>
  </div>);
}

export default News;
