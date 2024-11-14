import React from 'react';

import { useGlobalContext } from '../../hooks/useGlobalContext.hook';
import HomeView from '../../components/dashboard/views/HomeView';
import TransactionsView from '../../components/dashboard/views/TransactionsView';
import ConverterView from '../../components/dashboard/views/ConverterView';

const Dashboard = () => {
  const { dashboardView } = useGlobalContext();

  
  return (
    <>
      {dashboardView === 'home' && <HomeView />}
      {dashboardView === 'transactions' && <TransactionsView />}
      {dashboardView === 'converter' && <ConverterView />}
    </>
  );
};

export default Dashboard;
