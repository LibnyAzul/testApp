import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { Thunk } from 'shared/redux/store';
import {
  ICustomAlerts,
  initialState as start
} from 'shared/utils/components/alerts';
import _ from 'lodash';

interface IAlertState {
  customAlert: ICustomAlerts;
}

const initialState: IAlertState = {
  customAlert: start
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setCustomAlert: (state, action: PayloadAction<ICustomAlerts | any>) => {
      state.customAlert = action.payload;
    }
  }
});

export const persistAlertsConfig = {
  key: 'alerts',
  storage,
  whitelist: ['customAlert']
};

export const { setCustomAlert } = alertsSlice.actions;
export default alertsSlice.reducer;

export const handleCustomAlert =
  (message: string = '', type: string = start.alert.type): Thunk =>
  async (dispatch): Promise<void> => {
    dispatch(
      setCustomAlert({
        ...start,
        open: true,
        alert: {
          type,
          message
        }
      })
    );
  };

export const handleCustomAlertSuccess =
  (data: any): Thunk =>
  async (dispatch): Promise<void> => {
    dispatch(
      setCustomAlert({
        ...start,
        open: true,
        alert: {
          type: 'success',
          message: `El registro con el identificador "${
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            !_.isNil(data.id) ? data.id : '¿?'
          }" ha sido procesado correctamente.`
        }
      })
    );
  };
