import React from 'react';
import { useHistoricalData } from '../../hooks';

export function HistoricalTable({
  value,
  loading,
}: ReturnType<typeof useHistoricalData>) {
  if (loading) {
    return <div>Loading The Page</div>;
  }
  console.log(value);
  return <div>We Have Data</div>;
}
