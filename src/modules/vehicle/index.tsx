import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import AddOrEdit from './addOrEdit';
import Vehicle from './vehicle';
import Details from './details';
import CustomMap from './customMap';

const Vehicles: FC<string> = (path: string) => {
  return (
    <Route>
      <Route index path={path} element={<Vehicle />} />
      <Route path={`${path}/add`} element={<AddOrEdit />} />
      <Route path={`${path}/edit/:id`} element={<AddOrEdit />} />
      <Route path={`${path}/details/:id`} element={<Details />} />
      <Route path={`${path}/map`} element={<CustomMap />} />
    </Route>
  );
};

export default Vehicles;
