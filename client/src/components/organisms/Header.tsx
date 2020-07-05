import React from 'react';
import { NavbarLink } from '../atoms';
import { SearchBar } from '../molecules';
import './styles/Header.scss';

export function Header() {
  return (
    <div className="Header">
      <div className="container">
        <NavbarLink title="Stock App" path="/" />
        <ol className="list-links">
          <li>
            <NavbarLink title="Latest News" path="/news/amd" />
          </li>
          <li>
            <NavbarLink title="Quote" path="/quote" />
          </li>
        </ol>
        <SearchBar />
      </div>
    </div>
  );
}
