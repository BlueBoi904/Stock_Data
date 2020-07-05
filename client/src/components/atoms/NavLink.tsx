import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navlink.scss';

export function NavbarLink({ title }: { title: string }) {
  return <Link to="/">{title}</Link>;
}
