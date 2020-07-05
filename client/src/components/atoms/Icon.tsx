import React from 'react';
import { GlyphMap } from '../../assets/icons/GlyphMap';
import './styles/Icon.scss';

export type IconName = keyof typeof GlyphMap;

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <div style={{ fontSize: size }} className="Icon">
      {String.fromCharCode(GlyphMap[name])}
    </div>
  );
}
