import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import PrivateRoute from './components/auth/PrivateRoute';
import RedirectAuthRoute from './components/auth/RedirectAuthRoute';
import LandingLayout from './components/layout/LandingLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import Landing from './pages/public/Landing';
import Login from './pages/auth/Login';
import Dashboard from './pages/private/Dashboard';
import NotFound from './pages/public/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <LandingLayout>
              <Landing />
            </LandingLayout>
          }
        />
        <Route
          path='/login'
          element={
            <RedirectAuthRoute>
              <LandingLayout>
                <Login />
              </LandingLayout>
            </RedirectAuthRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path='*'
          element={
            <LandingLayout>
              <NotFound />
            </LandingLayout>
          }
        />
      </Routes>

      <Toaster reverseOrder={false} position='top-center' />
    </BrowserRouter>
  );
}

export default App;
