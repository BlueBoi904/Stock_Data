import React from 'react';
import { TextBody } from '../atoms';
import './styles/StatView.scss';

export function StatView({ name, value }: { name: string; value: string }) {
  return (
    <div className="StatView">
      <div className="name">
        <TextBody>{name}</TextBody>
      </div>
      <div className="value">
        <TextBody>{value}</TextBody>
      </div>
    </div>
  );
}
