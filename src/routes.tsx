import React, { FC, useEffect } from 'react';
import LoginScreen from 'modules/auth/LoginScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from 'modules/home/layout';
import Home from 'modules/home';
import { customSelector } from 'hooks/redux';
import axios from 'shared/utils/axios';
import CustomTheme from 'modules/home/settings';
import Users from 'modules/user';
import Vehicles from 'modules/vehicle';

const RootRoutes: FC = () => {
  const entityPath: string = '/entity/';
  const {
    auth: { token }
  } = customSelector((state) => state);

  useEffect(() => {
    token !== null &&
      (axios.defaults.headers.common = { Authorization: `Bearer ${token}` });
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {Users(`${entityPath}user`)}
          {Vehicles(`${entityPath}vehicle`)}
          <Route path="/customize" element={<CustomTheme />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RootRoutes;
