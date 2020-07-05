import React from 'react';
import { Header, Body } from '../../../components/Organisms';
import { TextTitle } from '../../../components/Atoms';

function TempCheck() {
  function items() {
    const items: ReturnType<typeof TextTitle>[] = [];
    for (let i = 0; i < 40; i++) {
      items.push(<TextTitle key={i}>{i}</TextTitle>);
    }
    return items;
  }
  return items();
}

export function BaseHomeLayout({}) {
  return (
    <div>
      <Header />
      <Body>{TempCheck()}</Body>
    </div>
  );
}
