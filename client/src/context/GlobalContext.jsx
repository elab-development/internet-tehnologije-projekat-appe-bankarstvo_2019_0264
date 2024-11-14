import React from 'react';

const GlobalContext = React.createContext({
  loggedInUser: null,
  setLoggedInUser: () => {},
  dashboardView: 'home',
  setDashboardView: () => {},
});

export default GlobalContext;
