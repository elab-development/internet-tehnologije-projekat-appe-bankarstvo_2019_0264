import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader } from 'lucide-react';
import toast from 'react-hot-toast';

import { users } from '../../utils/data';
import { useGlobalContext } from '../../hooks/useGlobalContext.hook';
import Input from '../../components/shared/Input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setLoggedInUser } = useGlobalContext();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (email.trim() === '') {
      setError('Email is required!');
      setIsLoading(false);
      return;
    }

    if (password.trim() === '') {
      setError('Password is required!');
      setIsLoading(false);
      return;
    }

    const userWithEmail = users.filter((user) => user.email === email)[0];

    if (!userWithEmail) {
      setError('User not exist!');
      setIsLoading(false);
      return;
    }

    if (userWithEmail.password !== password) {
      setError('Wrong credentials!');
      setIsLoading(false);
      return;
    }

    setLoggedInUser(userWithEmail);
    toast.success('Logged in successfully!');

    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-violet-400 to-purple-500 text-transparent bg-clip-text'>
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='flex items-center mb-6'>
            <Link
              to='/login'
              className='text-sm text-violet-400 hover:underline'
            >
              Forgot password?
            </Link>
          </div>

          {error && <p className='text-red-500 font-semibold mb-6'>{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='w-full py-3 px-4 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-violet-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className='w-6 h-6 animate-spin  mx-auto' />
            ) : (
              'Login'
            )}
          </motion.button>
        </form>
      </div>

      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Don't have an account?{' '}
          <Link to='/login' className='text-violet-400 hover:underline'>
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;