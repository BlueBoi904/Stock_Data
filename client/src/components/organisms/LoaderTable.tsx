import React, { useCallback } from 'react';
import { TextBody } from 'components/atoms';
import './styles/LoaderTable.scss';

export function LoaderTable() {
  const shimmerRows = useCallback(() => {
    const rows = [];
    for (let i = 0; i < 19; i++) {
      const innerTd = [];
      for (let x = 0; x < 7; x++) {
        innerTd.push(<td key={x} />);
      }
      rows.push(<tr key={i}>{innerTd}</tr>);
    }
    return rows;
  }, []);

  return (
    <div className="LoaderTable">
      <table>
        <thead>
          <tr>
            <th>
              <TextBody>Date</TextBody>
            </th>
            <th>
              <TextBody>Open</TextBody>
            </th>
            <th>
              <TextBody>High</TextBody>
            </th>
            <th>
              <TextBody>Low</TextBody>
            </th>
            <th>
              <TextBody>Clost</TextBody>
            </th>
            <th>
              <TextBody>Adj Close</TextBody>
            </th>
            <th>
              <TextBody>Volume</TextBody>
            </th>
          </tr>
        </thead>
        <tbody className="shine">{shimmerRows()}</tbody>
      </table>
    </div>
  );
}
