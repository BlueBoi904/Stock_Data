import React from 'react';
import { NavbarLink } from '../Atoms';
import './styles/Header.scss';

export function Header() {
  return (
    <div className="Header">
      <div className="container">
        <NavbarLink title="Stock App" path="/" />
        <ol className="list-links">
          <li>
            <NavbarLink title="Latest News" path="/news" />
          </li>
          <li>
            <NavbarLink title="Quote" path="/quote" />
          </li>
        </ol>
      </div>
    </div>
  );
}
