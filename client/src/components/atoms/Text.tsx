import React from 'react';
import './styles/Text.scss';

export type TextComponents = {
  children: string | number;
};

export function TextTitle({ children }: TextComponents) {
  return <h1 className="Title H1">{children}</h1>;
}

export function TextSubTitle({ children }: TextComponents) {
  return <h2 className="Title H2">{children}</h2>;
}

export function TextSubTitleSmall({ children }: TextComponents) {
  return <h2 className="Title H3">{children}</h2>;
}

export function TextBody({ children }: TextComponents) {
  return <div className="Title body">{children}</div>;
}

export function TextListTag({ children }: TextComponents) {
  return (
    <div className="TextListTag">
      <span>{children}</span>
    </div>
  );
}

export function SubTextTag({ children }: TextComponents) {
  return (
    <div className="SubTextTag">
      <span>{children}</span>
    </div>
  );
}
