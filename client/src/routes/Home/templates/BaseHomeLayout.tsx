import React from 'react';
import { Header, Body } from '../../../components/organisms';
import { TextTitle, Icon } from '../../../components/atoms';

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
      <Body>
        <Icon />
        {TempCheck()}
      </Body>
    </div>
  );
}
