import React from 'react';
import { TextSubTitle, TextBody } from '../atoms';
import { useHistoricalData } from '../../hooks';
import './styles/HistoricalTable.scss';

export function HistoricalTable({
  value,
  loading,
  ticker,
}: ReturnType<typeof useHistoricalData>) {
  if (loading) {
    return <div>Loading The Page</div>;
  }

  function constructTable() {
    const copy = [...value];
    const table = [];
    if (copy.length > 0) {
      const [headers] = copy.splice(0, 1);
      const headerRows = headers.map((row) => (
        <th key={row}>
          <TextBody>{row}</TextBody>
        </th>
      ));
      table.push(
        <thead key="header">
          <tr>{headerRows}</tr>
        </thead>,
      );
      const body = copy.map((item, idx) => {
        const rows = item.map((row, i) => (
          <td key={i}>
            <TextBody>{row}</TextBody>
          </td>
        ));
        return <tr key={idx}>{rows}</tr>;
      });
      table.push(<tbody key="body">{body}</tbody>);
      return table;
    }
    return table;
  }

  return (
    <div className="HistoricalTable">
      <TextSubTitle>{`${ticker} Historical Data`}</TextSubTitle>
      <table>{constructTable()}</table>
    </div>
  );
}
