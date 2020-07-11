import React from 'react';
import './styles/MainContent.scss';

export function MainContent({ children }: { children: React.ReactNode }) {
  return <div className="MainContent">{children}</div>;
}
