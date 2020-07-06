import React from 'react';
import { Icon } from '../atoms';
import './styles/SearchBar.scss';

export function SearchBar() {
  return (
    <div className="SearchBar">
      <Icon name="search" />
      <input type="search" placeholder="Search for tickers..." />
    </div>
  );
}
