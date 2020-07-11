import React, { useState } from 'react';
import { Icon } from '../atoms';
import './styles/SearchBar.scss';
import { useHistory } from 'react-router-dom';

export function SearchBar() {
  const [value, setValue] = useState('');
  const history = useHistory();

  async function onSubmit(e) {
    e.preventDefault();
    history.push(`/quote/${value}`);
  }

  return (
    <div className="SearchBar">
      <Icon name="search" />
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          type="search"
          placeholder="Enter a stock ticker..."
          maxLength={4}
        />
      </form>
    </div>
  );
}
