import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import AddOrEdit from './addOrEdit';
import User from './user';
import Details from './details';

const Users: FC<string> = (path: string) => {
  return (
    <Route>
      <Route index path={path} element={<User />} />
      <Route path={`${path}/add`} element={<AddOrEdit />} />
      <Route path={`${path}/edit/:id`} element={<AddOrEdit />} />
      <Route path={`${path}/details/:id`} element={<Details />} />
    </Route>
  );
};

export default Users;
