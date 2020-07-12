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
  StatisticalHorizontal,
} from '../../../components/organisms';
import { HistoricalCache } from 'hooks/useHistoricalData';
import { StatisticalCache } from 'hooks/useStatisticalData';

export function BaseHomeLayout({ ticker }: { ticker?: string }) {
  HistoricalCache.preload(ticker);
  StatisticalCache.preload(ticker);
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
            <StatisticalHorizontal ticker={ticker} />
            <StockAreaCharts ticker={ticker} />
            <HistoricalTable ticker={ticker} />
          </ErrorBoundary>
        </MainContent>
      </Body>
    </div>
  );
}
