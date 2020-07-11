import React from 'react';
import { Body, Header, MainContent } from '../../../components/organisms';
import { TextTitle } from '../../../components/atoms';

function TempCheck() {
  function items() {
    const itemsArray: ReturnType<typeof TextTitle>[] = [];
    for (let i = 100; i > 50; i--) {
      itemsArray.push(<TextTitle key={i}>{i}</TextTitle>);
    }
    return itemsArray;
  }
  return items();
}

export function BaseQuoteTemplate({}) {
  return (
    <div>
      <Header />
      <Body>
        <MainContent>{TempCheck()}</MainContent>
      </Body>
    </div>
  );
}
