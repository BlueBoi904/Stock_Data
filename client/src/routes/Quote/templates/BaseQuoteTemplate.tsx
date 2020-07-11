import React from 'react';
import { Body, Header, MainContent } from '../../../components/organisms';
import { useParams } from 'react-router-dom';

export function BaseQuoteTemplate({}) {
  const { ticker } = useParams();
  return (
    <div>
      <Header />
      <Body>
        <MainContent>
          <div>
            <h1>{ticker}</h1>
          </div>
        </MainContent>
      </Body>
    </div>
  );
}
