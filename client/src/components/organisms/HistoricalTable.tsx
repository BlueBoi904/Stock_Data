import React, { useCallback } from 'react';
import { TextSubTitle, TextBody } from '../atoms';
import { useHistoricalData } from '../../hooks';
import './styles/HistoricalTable.scss';
import { LoaderTable } from './LoaderTable';

export function HistoricalTable({ ticker }: { ticker: string }) {
  const { value, loading } = useHistoricalData(ticker);

  const constructTable = useCallback(() => {
    const copy = [...value];
    const table = [];
    if (copy.length > 0) {
      const [headers] = copy.splice(0, 1);
      const headerRows = headers.map((row) => (
        <th key={`${ticker}-${row}`}>
          <TextBody>{row}</TextBody>
        </th>
      ));
      table.push(
        <thead key={`${ticker}-header`}>
          <tr>{headerRows}</tr>
        </thead>,
      );
      const body = copy.map((item, idx) => {
        const rows = item.map((row, i) => (
          <td key={`${ticker}-${i}`}>
            <TextBody>{row}</TextBody>
          </td>
        ));
        return <tr key={`${ticker}-${idx}`}>{rows}</tr>;
      });
      body.reverse();
      table.push(<tbody key={`${ticker}-body`}>{body}</tbody>);
      return table;
    }
    return table;
  }, [value, ticker]);

  if (loading) {
    return <LoaderTable />;
  }

  if (!value) {
    return <div>No Data Returned</div>;
  }

  return (
    <div key={ticker} className="HistoricalTable">
      <TextSubTitle>{`${ticker} Historical Data`}</TextSubTitle>
      <table>{constructTable()}</table>
    </div>
  );
}
