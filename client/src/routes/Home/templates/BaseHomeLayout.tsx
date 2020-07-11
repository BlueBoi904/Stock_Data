import React from 'react';
import {
  Body,
  Header,
  HistoricalTable,
  MainContent,
  SideBar,
  RecentSearches,
  ErrorBoundary,
} from '../../../components/organisms';
import { HistoricalCache } from 'hooks/useHistoricalData';

export function BaseHomeLayout({ ticker }: { ticker?: string }) {
  console.log(ticker);
  HistoricalCache.preload(ticker);
  return (
    <div>
      <Header />
      <Body>
        <SideBar>
          <RecentSearches />
        </SideBar>
        <MainContent>
          <ErrorBoundary>
            <HistoricalTable ticker={ticker} />
          </ErrorBoundary>
        </MainContent>
      </Body>
    </div>
  );
}
