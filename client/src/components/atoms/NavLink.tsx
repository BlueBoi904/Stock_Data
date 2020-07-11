import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import './styles/Navlink.scss';

export function NavbarLink({ title, path }: { title: string; path: string }) {
  const match = useRouteMatch(path);
  return (
    <Link to={path} replace={match ? true : false}>
      {title}
    </Link>
  );
}

export function NavLink({
  children,
  path,
}: {
  children: JSX.Element;
  path: string;
}) {
  return <Link to={path}>{children}</Link>;
}
