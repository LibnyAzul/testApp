import React from 'react';
import { FKState as initialFKState, IFKVehicle } from './vehicle';

export default interface ITracking {
  id: number;
  latitude: number;
  longitude: number;
  createdDate: string;
  vehicle: IFKVehicle;
}

export const initialState: ITracking = {
  id: 0,
  latitude: 20.67386773,
  longitude: -103.3766127,
  createdDate: '',
  vehicle: initialFKState
};
