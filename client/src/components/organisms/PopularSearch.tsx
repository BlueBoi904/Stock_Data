import React from 'react';
import { TextBody, TextSubTitleSmall, NavLink } from '../atoms';
import './styles/PopularSearch.scss';

export function PopularSearch() {
  return (
    <div className="PopularSearch">
      <TextSubTitleSmall>Popular Stocks</TextSubTitleSmall>
      <NavLink path="/historical/TSLA">
        <TextBody>TSLA</TextBody>
      </NavLink>
      <NavLink path="/historical/AAPL">
        <TextBody>AAPL</TextBody>
      </NavLink>
      <NavLink path="/historical/SNAP">
        <TextBody>SNAP</TextBody>
      </NavLink>
      <NavLink path="/historical/GILD">
        <TextBody>GILD</TextBody>
      </NavLink>
    </div>
  );
}
