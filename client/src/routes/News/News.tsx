import React from 'react';
import { BaseNewsLayout } from './templates';
import { useParams } from 'react-router-dom';

export function News(): JSX.Element {
  const { ticker } = useParams();
  return <BaseNewsLayout ticker={ticker} />;
}
