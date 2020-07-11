import React, { useState } from 'react';
import { Icon } from '../atoms';
import './styles/SearchBar.scss';
import { useHistory } from 'react-router-dom';

export function SearchBar() {
  const [text, setText] = useState('');
  const history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    history.push(`/historical/${text}`);
    setText('');
  }

  return (
    <div className="SearchBar">
      <Icon name="search" />
      <form onSubmit={onSubmit}>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          type="search"
          placeholder="Enter a stock ticker..."
          maxLength={4}
        />
      </form>
    </div>
  );
}
