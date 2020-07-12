import React, { useCallback } from 'react';
import { TextBody, TextSubTitleSmall, NavLink } from '../atoms';
import './styles/PopularSearch.scss';
import { useRecentSearch } from '../../hooks';

export function RecentSearch() {
  const setOfKeys = useRecentSearch();

  const renderRecent = useCallback(() => {
    const keys = [];
    {
      setOfKeys.forEach((key) => {
        keys.push(
          <NavLink key={key} path={`/historical/${key}`}>
            <TextBody>{key}</TextBody>
          </NavLink>,
        );
      });
    }
    return keys;
  }, [setOfKeys]);

  if (setOfKeys.size === 0) {
    return null;
  }

  return (
    <div className="PopularSearch">
      <TextSubTitleSmall>Recently Viewed</TextSubTitleSmall>
      {renderRecent()}
    </div>
  );
}
