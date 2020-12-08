import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import UserLists from "src/views/Users"

import TimeOutLogstable from "src/views/Logs/Completed"

//New imports
import NewDeviceForm from 'src/views/Form/NewDevice'
import CardList from  "src/views/Cards"
import RegisterUser from "src/views/auth/RegisterView"
import Lectures from 'src/views/Lectures'
import DefaultersList from 'src/views/defaulters'

const routes = [
  {

    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element:  <Navigate to="/login" /> },
      { path: 'login', element: <LoginView /> },
      { path: '404', element: < NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Navigate to="create/device" /> },
      { path: 'create/device', element:  < NewDeviceForm /> },
      { path: 'users', element:  <UserLists /> },
      { path: 'card/list', element:  <CardList /> },
      { path: 'lectures', element:  <Lectures /> },
      {path: "logs/attendance" , element: <TimeOutLogstable /> },
      {path: "logs/defaulter" , element: <DefaultersList /> },
       {path: "register/admin" , element: <RegisterUser /> },
      { path: '404', element: < NotFoundView /> },
      { path: '*', element: <Navigate to="" /> }
    ]
  },
  
  
];

export default routes;
