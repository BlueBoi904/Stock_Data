import React from 'react';
import {
  Body,
  Header,
  MainContent,
  SideBar,
  RecentSearches,
} from '../../../components/organisms';

// Removed News as I don't want to make the call right now and waste my API keys limits
export function BaseNewsLayout({}: { ticker: string }) {
  return (
    <div>
      <Header />
      <Body>
        <SideBar>
          <RecentSearches />
        </SideBar>
        <MainContent>
          <div />
        </MainContent>
      </Body>
    </div>
  );
}
