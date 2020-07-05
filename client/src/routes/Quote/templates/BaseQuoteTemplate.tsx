import React from 'react';
import { Header, Body } from '../../../components/Organisms';
import { TextTitle } from '../../../components/Atoms';

function TempCheck() {
  function items() {
    const items: ReturnType<typeof TextTitle>[] = [];
    for (let i = 100; i > 50; i--) {
      items.push(<TextTitle key={i}>{i}</TextTitle>);
    }
    return items;
  }
  return items();
}

export function BaseQuoteTemplate({}) {
  return (
    <div>
      <Header />
      <Body>{TempCheck()}</Body>
    </div>
  );
}