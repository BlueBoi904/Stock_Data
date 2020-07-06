import React from 'react';
import { BaseHomeLayout } from './templates';
import { API } from '../../api';

export function Home() {
  API.get('/historical', { ticker: 'TSLA' }).then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    },
  );
  return <BaseHomeLayout />;
}
