import React from 'react';

import { NavBar } from './sidebar';
import { Dashboard } from './Dashboard';
export const Factory = () => {
  return (
    <div className="flex space-x-14 -y-7 ">
      <NavBar></NavBar>
      <Dashboard></Dashboard>
    </div>
  );
};
