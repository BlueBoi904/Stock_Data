import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navlink.scss';

export function NavbarLink({ title, path }: { title: string; path: string }) {
  return <Link to={path}>{title}</Link>;
}
