import React from 'react';
import { Header, Body } from '../../../components/organisms';
import { TextTitle } from '../../../components/atoms';

function TempCheck() {
  function items() {
    const items: ReturnType<typeof TextTitle>[] = [];
    for (let i = 50; i > 0; i--) {
      items.push(<TextTitle key={i}>{i}</TextTitle>);
    }
    return items;
  }
  return items();
}

export function BaseNewsLayout({}) {
  return (
    <div>
      <Header />
      <Body>{TempCheck()}</Body>
    </div>
  );
}
