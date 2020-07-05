import React from 'react';
import './styles/SideBar.scss';

export function SideBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="SideBar">
      <div className="sticky">{children}</div>
    </div>
  );
}
