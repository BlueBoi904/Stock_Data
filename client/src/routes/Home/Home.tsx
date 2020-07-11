import React from 'react';
import { BaseHomeLayout } from './templates';
import { ErrorBoundary } from '../../components/organisms';
import { useParams } from 'react-router-dom';

export function Home() {
  const { ticker } = useParams();
  return (
    <ErrorBoundary>
      <BaseHomeLayout ticker={ticker} />
    </ErrorBoundary>
  );
}
