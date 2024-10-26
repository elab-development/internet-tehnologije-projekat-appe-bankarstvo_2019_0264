import React, { useState } from 'react';

import GlobalContext from './GlobalContext';

const ContextWrapper = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [dashboardView, setDashboardView] = useState('home');

  return (
    <GlobalContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        dashboardView,
        setDashboardView,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
