import React from 'react';
import './styles/Text.scss';

export function TextTitle({ children }: { children: string }) {
  return <div className="Title H1">{children}</div>;
}

export function TextSubTitle({ children }: { children: string }) {
  return <div className="Title H2">{children}</div>;
}
