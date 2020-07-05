import React from 'react';
import { NavbarLink } from '../atoms';
import './styles/Header.scss';

export function Header() {
  return (
    <div className="Header">
      <div className="container">
        <NavbarLink title="Stock App" />
      </div>
    </div>
  );
}
