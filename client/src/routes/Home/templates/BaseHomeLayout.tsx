import React from 'react';
import {
  Body,
  Header,
  HistoricalTable,
  MainContent,
  SideBar,
} from '../../../components/organisms';
import { TextTitle } from '../../../components/atoms';
import { useHistoricalData } from '../../../hooks';

function TempCheck(num: number) {
  function items() {
    const itemsArray: ReturnType<typeof TextTitle>[] = [];
    for (let i = 0; i <= num; i++) {
      itemsArray.push(<TextTitle key={i}>{i}</TextTitle>);
    }
    return itemsArray;
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
