import React, { useEffect, useState } from 'react';
import AccountCard from '../reusable/AccountCard';

import { useGlobalContext } from '../../../hooks/useGlobalContext.hook';
import { dataAccounts } from '../../../utils/data';

const HomeView = () => {
  const [accounts, setAccounts] = useState([]);
  const { loggedInUser } = useGlobalContext();

  useEffect(() => {
    let userAccounts = dataAccounts.filter(
      (account) => account.user === loggedInUser.id
    );
    setAccounts(userAccounts);
  }, []);

  return (
    <div className='flex flex-col gap-5 min-h-screen items-center justify-center'>
      {accounts.map((account, index) => (
        <AccountCard key={index} account={account} />
      ))}
    </div>
  );
};

export default HomeView;
