import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import Login from '../components/Login/Login';
import ProtectRoute from './ProtectedRoutes';
import Search from '../components/Search';
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectRoute redirectTo="/">
            <Dashboard />
          </ProtectRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectRoute redirectTo="/">
            <Search />
          </ProtectRoute>
        }
      />
      <Route
        path="/my-flashcards"
        element={
          <ProtectRoute redirectTo="/">
            <Dashboard />
          </ProtectRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
