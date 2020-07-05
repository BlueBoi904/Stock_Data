import React from 'react';
import { Header, Body } from '../../../components/organisms';
import { News } from '../../../components/molecules/index';

export function BaseNewsLayout({ ticker }: { ticker: string }) {
  return (
    <div>
      <Header />
      <Body>
        <News ticker={ticker} />
      </Body>
    </div>
  );
}
