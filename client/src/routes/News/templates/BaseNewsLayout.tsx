import React from 'react';
import { Header, Body, MainContent } from '../../../components/organisms';
import { News } from '../../../components/molecules/index';

export function BaseNewsLayout({ ticker }: { ticker: string }) {
  return (
    <div>
      <Header />
      <Body>
        <MainContent>
          <News ticker={ticker} />
        </MainContent>
      </Body>
    </div>
  );
}
