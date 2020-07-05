import React from 'react';
import './styles/Text.scss';

export function TextTitle({ children }: { children: string }) {
  return <h1 className="Title H1">{children}</h1>;
}

export function TextSubTitle({ children }: { children: string }) {
  return <h2 className="Title H2">{children}</h2>;
}

export function TextBody({ children }: { children: string }) {
  return <div className="Title body">{children}</div>;
}
