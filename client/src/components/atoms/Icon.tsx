import React from 'react';
import { GlyphMap } from '../../assets/icons/GlyphMap';
import './styles/Icon.scss';

export type IconName = keyof typeof GlyphMap;

export function Icon({
  name,
  size = 20,
  color = 'black',
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  return (
    <div style={{ fontSize: size, color }} className="Icon">
      {String.fromCharCode(GlyphMap[name])}
    </div>
  );
}
