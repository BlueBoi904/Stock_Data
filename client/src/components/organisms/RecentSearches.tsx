import React from 'react';
import { TextBody, TextSubTitleSmall, NavLink } from '../atoms';
import './styles/RecentSearches.scss';

export function RecentSearches() {
  return (
    <div className="RecentSearches">
      <TextSubTitleSmall>Popular Stocks</TextSubTitleSmall>
      <NavLink path="/home/TSLA">
        <TextBody>TSLA</TextBody>
      </NavLink>
      <NavLink path="/home/AAPL">
        <TextBody>AAPL</TextBody>
      </NavLink>
      <NavLink path="/home/SNAP">
        <TextBody>SNAP</TextBody>
      </NavLink>
      <NavLink path="/home/GILD">
        <TextBody>GILD</TextBody>
      </NavLink>
    </div>
  );
}
