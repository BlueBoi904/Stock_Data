import React from 'react';
import { GlyphMap } from '../../assets/icons/GlyphMap';

export function Icon() {
  return (
    <div style={styles.icon}>{String.fromCharCode(GlyphMap.activity)}</div>
  );
}

const styles = {
  icon: {
    fontFamily: 'Feather',
  },
};
