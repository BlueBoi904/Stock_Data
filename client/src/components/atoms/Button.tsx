import React from 'react';
import './styles/Button.scss';

enum Type {
  Primary = 'primary',
  Secondary = 'secondary',
}

export function Button({
  children,
  onClick,
  type,
}: {
  children: JSX.Element | JSX.Element[];
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type: Type;
}) {
  return (
    <button
      onClick={onClick}
      className={`Button ${type === Type.Primary ? 'primary' : 'secondary'}`}>
      {children}
    </button>
  );
}

Button.Type = Type;
