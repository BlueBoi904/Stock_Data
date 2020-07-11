import React from 'react';
import { Header, Body, MainContent } from '../../../components/organisms';

// Removed News as I don't want to make the call right now and waste my API keys limits
export function BaseNewsLayout({}: { ticker: string }) {
  return (
    <div>
      <Header />
      <Body>
        <MainContent />
      </Body>
    </div>
  );
}
