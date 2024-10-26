import React from 'react';
import { Navigate } from 'react-router-dom';

import { useGlobalContext } from '../../hooks/useGlobalContext.hook';

const RedirectAuthRoute = ({ children }) => {
  const { loggedInUser } = useGlobalContext();

  if (loggedInUser) {
    return <Navigate to='/dashboard' replace={true} />;
  }

  return children;
};

export default RedirectAuthRoute;
