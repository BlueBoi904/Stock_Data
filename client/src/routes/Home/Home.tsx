import React from 'react';
import { BaseHomeLayout } from './templates';
import { Route } from 'react-router-dom';

export function Home() {
  return <Route path="/" component={BaseHomeLayout} exact />;
}
