import React, { useCallback } from 'react';
import { useStatisticalData } from '../../hooks';
import { StatView } from 'components/molecules';
import './styles/StatisticalHorizontal.scss';

export function StatisticalHorizontal({ ticker }: { ticker: string }) {
  const { value, loading } = useStatisticalData(ticker);

  const showStats = useCallback(() => {
    const copy = { ...value };
    const keys = Object.keys(copy);
    let stats = [];
    if (keys.length > 0) {
      stats = keys.map((k) => {
        return <StatView key={k} name={k} value={copy[k]} />;
      });
    }
    return stats;
  }, [value]);

  if (loading) {
    return null;
  }

  return (
    <div className="StatisticalHorizontal">
      <div className="stats-container">{showStats()}</div>
    </div>
  );
}
