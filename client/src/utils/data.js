export const users = [
  {
    id: 1,
    username: 'johndoe1',
    email: 'john@mail.com',
    password: 'password',
  },
  {
    id: 2,
    username: 'markom',
    email: 'marko@mail.com',
    password: 'password',
  },
  {
    id: 3,
    username: 'petarp',
    email: 'petar@mail.com',
    password: 'password',
  },
  {
    id: 4,
    username: 'lenalj',
    email: 'lena@mail.com',
    password: 'password',
  },
  {
    id: 5,
    username: 'ivanam',
    email: 'ivana@mail.com',
    password: 'password',
  },
];

export const dataAccounts = [
  {
    id: 1,
    user: 1,
    number: '555-1234567-999',
    balance: 1000.12,
    currency: 'EUR',
  },
  {
    id: 2,
    user: 1,
    number: '170-1234567-999',
    balance: 24994.95,
    currency: 'RSD',
  },
  {
    id: 3,
    user: 2,
    number: '666-1234567-999',
    balance: 444.0,
    currency: 'USD',
  },
  {
    id: 4,
    user: 3,
    number: '170-1234567-999',
    balance: 55555.95,
    currency: 'RSD',
  },
  {
    id: 5,
    user: 4,
    number: '170-1234567-999',
    balance: 1679.0,
    currency: 'RSD',
  },
  {
    id: 6,
    user: 5,
    number: '170-1234567-999',
    balance: 8912.95,
    currency: 'RSD',
  },
  {
    id: 7,
    user: 5,
    number: '555-1234567-999',
    balance: 312.95,
    currency: 'EUR',
  },
];

export const dataTransactions = [
  {
    id: 1,
    user: 1,
    account: 2,
    amount: -1200.0,
    currency: 'RSD',
    description: 'Food order',
    date: '2024-09-06',
  },
  {
    id: 2,
    user: 1,
    account: 1,
    amount: 1500.0,
    currency: 'EUR',
    description: 'Paycheck',
    date: '2024-10-01',
  },
  {
    id: 3,
    user: 1,
    account: 2,
    amount: -800.0,
    currency: 'RSD',
    description: 'Groceries',
    date: '2024-08-23',
  },
  {
    id: 4,
    user: 1,
    account: 2,
    amount: 1200.0,
    currency: 'RSD',
    description: 'Freelance payment',
    date: '2024-08-30',
  },
  {
    id: 5,
    user: 1,
    account: 1,
    amount: -200.0,
    currency: 'EUR',
    description: 'Online shopping',
    date: '2024-09-05',
  },
  {
    id: 6,
    user: 1,
    account: 1,
    amount: 500.0,
    currency: 'EUR',
    description: 'Part-time job',
    date: '2024-09-10',
  },
  {
    id: 7,
    user: 1,
    account: 2,
    amount: -100.0,
    currency: 'RSD',
    description: 'Coffee',
    date: '2024-09-07',
  },
  {
    id: 8,
    user: 1,
    account: 2,
    amount: 800.0,
    currency: 'RSD',
    description: 'Freelance work',
    date: '2024-09-15',
  },
  {
    id: 9,
    user: 1,
    account: 2,
    amount: -700.0,
    currency: 'RSD',
    description: 'Gym subscription',
    date: '2024-09-06',
  },
  {
    id: 10,
    user: 1,
    account: 1,
    amount: 900.0,
    currency: 'EUR',
    description: 'Project payment',
    date: '2024-09-10',
  },
];