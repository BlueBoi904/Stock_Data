import { BaseQuoteTemplate } from './templates';
import React from 'react';

function Quote(): JSX.Element {
  /*
  async function getQuote() {
    try {
      const response = await fetch('http://localhost:8080/quote');
      const data = await response.json();
      console.log('data', data);
    } catch (error) {
      console.log(error);
    }
  }
  */

  return <BaseQuoteTemplate />;
}

export default Quote;
