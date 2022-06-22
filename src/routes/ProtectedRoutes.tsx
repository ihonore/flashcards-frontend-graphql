import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({ children, redirectTo }: any) {
  const token = localStorage.getItem('userToken');
  if (token) {
    return children;
  }
  return <Navigate to={redirectTo} />;
}
