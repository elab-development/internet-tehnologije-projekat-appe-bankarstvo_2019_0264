import { Coins, Euro, Minus, Plus } from 'lucide-react';
import React from 'react';

const AccountCard = ({ account }) => {
  return (
    <div className='bg-white rounded-lg shadow-md hover:scale-105 cursor-pointer'>
      <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-gray-500 text-md uppercase'>
              {account.currency} Account
            </h3>
            <p className='text-2xl'>{account.number}</p>
          </div>

          {account.currency === 'EUR' ? (
            <Euro
              size={30}
              color='#fff'
              className='bg-teal-500 rounded-full p-1'
            />
          ) : account.currency === 'USD' ? (
            <DollarSign
              size={30}
              color='#fff'
              className='bg-teal-500 rounded-full p-1'
            />
          ) : (
            <Coins
              size={30}
              color='#fff'
              className='bg-teal-500 rounded-full p-1'
            />
          )}
        </div>
        <div className='flex items-center gap-1 text-sm'>
          {account.balance > 0 ? (
            <span className='text-green-500 flex items-center'>
              <Plus size={18} />
            </span>
          ) : (
            account.balance !== 0 && (
              <span className='text-red-500 flex items-center'>
                <Minus size={18} />
              </span>
            )
          )}
          <span
            className={`${
              account.balance > 0
                ? 'text-green-500'
                : account.balance === 0
                ? 'text-gray-500'
                : 'text-red-500'
            }`}
          >
            {account.balance} {account.currency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
