import React from 'react';
import { BaseHomeLayout, BaseHomeWelcome } from './templates';
import { ErrorBoundary } from '../../components/organisms';
import { useParams } from 'react-router-dom';

export function Home() {
  const { ticker } = useParams();
  if (ticker) {
    return (
      <ErrorBoundary>
        <BaseHomeLayout ticker={ticker} />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <BaseHomeWelcome />
    </ErrorBoundary>
  );
}
