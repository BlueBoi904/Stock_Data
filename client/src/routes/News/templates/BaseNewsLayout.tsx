import React from 'react';
import { Header, Body } from '../../../components/organisms';
import { News } from '../../../components/molecules/index';

export function BaseNewsLayout({}) {
  return (
    <div>
      <Header />
      <Body>
        <News />
      </Body>
    </div>
  );
}
