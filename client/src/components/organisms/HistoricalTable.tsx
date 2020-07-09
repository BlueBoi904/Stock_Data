import React from 'react';

export function HistoricalTable({ data }: { data: string[][] }) {
  if (data && data.length > 0) {
    return <div>Has Data</div>;
  }

  return <div>loading</div>;
}
