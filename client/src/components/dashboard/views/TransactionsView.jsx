import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Banknote, Text, User, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';

import { useGlobalContext } from '../../../hooks/useGlobalContext.hook';
import { dataAccounts, dataTransactions } from '../../../utils/data';
import TransactionCard from '../reusable/TransactionCard';
import Input from '../../shared/Input';

const TransactionsView = () => {
  const [userTransactions, setUserTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [userAccounts, setUserAccounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Modal Form
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [receiverName, setReceiverName] = useState('');
  const [receiverAccount, setReceiverAccount] = useState('');
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState('');

  const { loggedInUser } = useGlobalContext();

  useEffect(() => {
    const transactions = dataTransactions.filter(
      (t) => t.user === loggedInUser.id
    );
    setUserTransactions(transactions);
    setFilteredTransactions(transactions);

    const accounts = dataAccounts.filter((a) => a.user === loggedInUser.id);
    setUserAccounts(accounts);
  }, [loggedInUser]);

  const handleChangeAccount = (e) => {
    if (parseInt(e.target.value) !== 0) {
      const transactions = userTransactions.filter(
        (t) => t.account === parseInt(e.target.value)
      );
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(userTransactions);
    }
  };

  useEffect(() => {
    setTotalPages(Math.ceil(filteredTransactions?.length / 5));
    setCurrentPage(1);
  }, [filteredTransactions]);

  const handleMakePayment = (e) => {
    e.preventDefault();

    // Check fields inputs
    if (!selectedAccount || parseInt(selectedAccount) === 0) {
      toast.error('Please select Account for payment!');
      return;
    }
    if (receiverName.trim() === '' || receiverAccount.trim() === '') {
      toast.error('Please provide Receiver information!');
      return;
    }
    if (!amount) {
      toast.error('Please provide payment amount!');
      return;
    }
    if (description.trim() === '') {
      toast.error('Please provide payment description!');
      return;
    }

    // Check accounts balance
    let userAccount = dataAccounts.filter(
      (a) => a.id === parseInt(selectedAccount)
    )[0];
    if (!userAccount) {
      toast.error('No account found!');
      return;
    }
    if (userAccount.balance < amount) {
      toast.error('You do not have enough funds for this payment!');
      return;
    }

    const newTransaction = {
      id: new Date(),
      user: loggedInUser.id,
      account: parseInt(selectedAccount),
      amount: -amount,
      description: description,
      date: new Date(),
      currency: userAccount.currency,
    };

    dataTransactions.push(newTransaction);
    setUserTransactions([...userTransactions, newTransaction]);
    setFilteredTransactions([...filteredTransactions, newTransaction]);

    dataAccounts[userAccount.id - 1].balance -= amount;

    setSelectedAccount(0);
    setReceiverName('');
    setReceiverAccount('');
    setAmount(null);
    setDescription('');
    setShowModal(false);
    toast.success('Payment made!');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex justify-between p-5 items-center'
      >
        <select
          onChange={handleChangeAccount}
          className='rounded-lg cursor-pointer'
        >
          <option value={0}>All Accounts</option>
          {userAccounts.map((account) => (
            <option value={account.id} key={account.id}>
              {account.number} ({account.currency})
            </option>
          ))}
        </select>

        <div className='flex gap-2'>
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              onClick={() => setCurrentPage(i + 1)}
              className={` ${
                currentPage === i + 1 ? 'bg-violet-500 text-white' : ''
              } bg-slate-50 text-violet-800 text-xl px-3 py-1 rounded-lg cursor-pointer
                 
                `}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        className='flex flex-col w-full items-center justify-center'
      >
        {filteredTransactions
          ?.slice(currentPage * 5 - 5, currentPage * 5)
          .map((transaction, index) => (
            <TransactionCard
              key={index}
              transaction={transaction}
              index={index}
            />
          ))}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className='mt-10 bg-violet-700 text-white px-5 py-2 text-xl rounded-lg border-2 border-white hover:border-violet-700 hover:text-violet-700 hover:bg-white'
          type='button'
          onClick={() => {
            setShowModal(true);
          }}
        >
          Make new Payment
        </motion.button>
      </motion.div>

      {showModal && (
        <div className='bg-black/50 h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-white rounded-lg shadow-2xl w-1/2'
            onSubmit={handleMakePayment}
          >
            <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
              <span className='material-icons-outlined text-gray-500'>
                drag_handle
              </span>
              <button
                type='button'
                onClick={() => {
                  setShowModal(false);
                }}
              >
                <span className='bg-red-500'></span>
                <span className='bg-teal-500'></span>
                <span className='material-icons-outlined text-red-500'>
                  close
                </span>
              </button>
            </header>
            <div className='p-3 flex flex-col'>
              <select
                onChange={(e) => {
                  setSelectedAccount(e.target.value);
                }}
                className='mb-6 rounded-lg cursor-pointer'
              >
                <option value={0}>From Account</option>
                {userAccounts.map((account) => (
                  <option value={account.id} key={account.id}>
                    {account.number} ({account.currency})
                  </option>
                ))}
              </select>
              <Input
                icon={User}
                type='text'
                placeholder='Receiver Name'
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
              />
              <Input
                icon={Wallet}
                type='text'
                placeholder='Receiver Account'
                value={receiverAccount}
                onChange={(e) => setReceiverAccount(e.target.value)}
              />
              <Input
                icon={Banknote}
                type='number'
                placeholder='Amount'
                min={0.1}
                step='.01'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Input
                icon={Text}
                type='text'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <footer className='flex justify-end w-100 border-t p-3 mt-5'>
              <button
                type='submit'
                className='bg-violet-600 px-6 py-2 rounded-md border-2 border-white text-white hover:bg-white hover:text-violet-600 hover:border-2 hover:border-violet-600'
              >
                Make Payment
              </button>
            </footer>
          </motion.form>
        </div>
      )}
    </>
  );
};

export default TransactionsView;
