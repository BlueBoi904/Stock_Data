import React from 'react';

function Quote(): JSX.Element {
  async function getQuote() {
    try {
      const response = await fetch('http://localhost:8080/quote');
      const data = await response.json();
      console.log('data', data);
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
