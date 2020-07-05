import React from 'react';
import {
  Header,
  Body,
  MainContent,
  SideBar,
} from '../../../components/organisms';
import { TextTitle } from '../../../components/atoms';

function TempCheck(num: number) {
  function items() {
    const items: ReturnType<typeof TextTitle>[] = [];
    for (let i = 0; i < num; i++) {
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
        <SideBar>{TempCheck(10)}</SideBar>
        <MainContent>{TempCheck(50)}</MainContent>
      </Body>
    </div>
  );
}
