import React from 'react';
import { BaseHomeLayout } from './templates';
import { NewClient } from '../../api';

export function Home() {
  NewClient.get('/historical', { ticker: 'TSLA' }).then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    },
  );
  return <BaseHomeLayout />;
}
