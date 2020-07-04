import React from "react";

function Quote() {
  async function getQuote() {
    try {
      let response = await fetch("http://localhost:8080/quote");
      let data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Quote</h1>
      <button onClick={getQuote}>Get Quote</button>
    </div>
  );
}

export default Quote;
