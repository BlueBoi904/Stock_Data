import React from 'react';
import {
  Body,
  Header,
  HistoricalTable,
  MainContent,
  SideBar,
  PopularSearch,
  RecentSearch,
  StockAreaCharts,
  ErrorBoundary,
} from '../../../components/organisms';
import { HistoricalCache } from 'hooks/useHistoricalData';

export function BaseHomeLayout({ ticker }: { ticker?: string }) {
  HistoricalCache.preload(ticker);
  return (
    <div>
      <Header />
      <Body>
        <SideBar>
          <PopularSearch />
          <RecentSearch />
        </SideBar>
        <MainContent>
          <ErrorBoundary key={ticker}>
            <StockAreaCharts ticker={ticker} />
            <HistoricalTable ticker={ticker} />
          </ErrorBoundary>
        </MainContent>
      </Body>
    </div>
  );
}
