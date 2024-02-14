import React from 'react';
import { useRoutes, Navigate, Route } from 'react-router-dom';
import Login from '../pages/guest/Login';
import Index from '../pages/private/profile';
import DashboardLayout from '../components/layouts/DashboardLayout';
import Add from '../pages/private/profile/Add';
import PrivateRoute from '../middlware/PrivateRoute.tsx';

const routes = [
  { path: "/", element: <Navigate to="/dashboard" /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: <PrivateRoute
    element = {<DashboardLayout />}/> ,
    children: [
      { index: true , element: <Navigate to="profile" /> },
      { path: "profile", element: <Index /> },
      { path: "add", element: <Add /> },
      { path: "*", element: <Navigate to="/dashboard" /> },
    ],
  },
  { path: "*", element: <>not found</> },
];

export default function AppRoutes() {
  const route = useRoutes(routes);
  return route;
}
