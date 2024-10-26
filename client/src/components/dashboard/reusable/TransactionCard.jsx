import React from 'react';

const TransactionCard = ({ transaction, index }) => {
  return (
    <div className='w-1/2 bg-white p-3 m-3 rounded-lg shadow-md hover:scale-105 cursor-pointer'>
      <div className='flex items-center justify-between px-5 gap-5'>
        <div className='flex flex-col'>
          <p className='text-xs'>Transaction #{index + 1}</p>
          <p className='text-sm font-semibold'>{transaction.description}</p>
          <p className='text-xs font-semibold'>
            {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
        {transaction.amount > 0 ? (
          <h2 className='text-green-700 font-bold text-2xl'>
            {transaction.amount} {transaction.currency}
          </h2>
        ) : (
          <h2 className='text-red-700 font-bold text-2xl'>
            {transaction.amount} {transaction.currency}
          </h2>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;
