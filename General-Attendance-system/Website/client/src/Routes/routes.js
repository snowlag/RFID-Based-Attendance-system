import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import UserLists from "src/views/Users"

import TimeInLogsTable from "src/views/Logs/Presents"
import TimeOutLogstable from "src/views/Logs/Completed"
import EarlyLeavesLogs from "src/views/Logs/EarlyLeaves"
//New imports
import NewDeviceForm from 'src/views/Form/NewDevice'
import CardList from  "src/views/Cards"
import RegisterUser from "src/views/auth/RegisterView"

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
      {path: "logs/present" , element: <TimeInLogsTable /> },
      {path: "logs/earlyleaves" , element: <EarlyLeavesLogs /> },
      {path: "logs/completed" , element: <TimeOutLogstable /> },
       {path: "register/admin" , element: <RegisterUser /> },
      { path: '404', element: < NotFoundView /> },
      { path: '*', element: <Navigate to="" /> }
    ]
  },
  
  
];

export default routes;
