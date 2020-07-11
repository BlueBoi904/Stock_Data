import React from 'react';
import {
  Header,
  Body,
  MainContent,
  SideBar,
  HistoricalTable,
} from '../../../components/organisms';
import { TextTitle } from '../../../components/atoms';
import { useHistoricalData } from '../../../hooks';

function TempCheck(num: number) {
  function items() {
    const items: ReturnType<typeof TextTitle>[] = [];
    for (let i = 0; i <= num; i++) {
      items.push(<TextTitle key={i}>{i}</TextTitle>);
    }
    return items;
  }
  return items();
}

export function BaseHomeLayout({}) {
  const data = useHistoricalData('TSLA');
  return (
    <div>
      <Header />
      <Body>
        <SideBar>{TempCheck(25)}</SideBar>
        <MainContent>
          <HistoricalTable {...data} />
        </MainContent>
      </Body>
    </div>
  );
}
