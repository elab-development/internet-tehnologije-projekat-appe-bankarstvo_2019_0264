import React from 'react';
import { Navigate } from 'react-router-dom';

import { useGlobalContext } from '../../hooks/useGlobalContext.hook';

const PrivateRoute = ({ children }) => {
  const { loggedInUser } = useGlobalContext();

  if (!loggedInUser) {
    return <Navigate to='/login' replace={true} />;
  }

  return children;
};

export default PrivateRoute;
