import React from 'react';
import {
  Body,
  Header,
  MainContent,
  SideBar,
  PopularSearch,
  RecentSearch,
} from '../../../components/organisms';
import { TextSubTitle } from '../../../components/atoms';

export function BaseHomeWelcome() {
  return (
    <div>
      <Header />
      <Body>
        <SideBar>
          <PopularSearch />
          <RecentSearch />
        </SideBar>
        <MainContent>
          <TextSubTitle>Stock App</TextSubTitle>
        </MainContent>
      </Body>
    </div>
  );
}
