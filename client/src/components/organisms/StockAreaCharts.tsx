import React, { useCallback } from 'react';
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from 'recharts';
import './styles/StockAreaCharts.scss';
import { TextSubTitle } from 'components/atoms';
import { useHistoricalData } from 'hooks';

export function StockAreaCharts({ ticker }: { ticker: string }) {
  const { value, loading } = useHistoricalData(ticker);

  const constructTableData = useCallback(() => {
    const copy = [...value];
    let structuredData = [];
    if (copy.length > 0) {
      copy.splice(0, 1);
      structuredData = copy.map((rows) => {
        const date = rows[0];
        const open = parseInt(rows[1]);
        const close = parseInt(rows[4]);
        return {
          date,
          open,
          close,
        };
      });
    }
    return structuredData;
  }, [value]);

  if (loading) {
    return null;
  }

  return (
    <div className="StockAreaCharts">
      <TextSubTitle>{`${ticker} Historical Chart`}</TextSubTitle>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={constructTableData()}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2F3A83" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2F3A83" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#832F3A" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#832F3A" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis type="number" domain={[0, 'auto']} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="open"
              stroke="#2F3A83"
              fillOpacity={1}
              fill="url(#colorOpen)"
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke="#832F3A"
              fillOpacity={1}
              fill="url(#colorClose)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
