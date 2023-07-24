import { initialState, LoginInterface } from 'shared/dictionary/auth';
import { Thunk } from 'shared/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axios from 'shared/utils/axios';
import storage from 'redux-persist/lib/storage';
import { cleanUserData, setUserInSession } from 'shared/redux/slices/auth/user';
import { errorFormat } from 'shared/utils/validate';
import URL_CATALOG from 'shared/dictionary';

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = Boolean(action.payload);
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setRefresh: (state, action: PayloadAction<string | null>) => {
      state.refresh = action.payload;
    },
    logout: (state, action: PayloadAction<void>) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refresh = null;
    }
  }
});

// Configuration made to prepare for storage
export const persistAuthConfig = {
  key: 'auth',
  storage,
  whiteList: ['isAuthenticated', 'token', 'refresh']
};

export const { setIsAuthenticated, setToken, setRefresh, logout } =
  authSlice.actions;

export default authSlice.reducer;

const customToken =
  (data: LoginInterface, transactionalData: any): Thunk =>
  async (dispatch): Promise<AxiosResponse | any> => {
    try {
      const response: AxiosResponse = await axios.post(
        URL_CATALOG.USER.TOKEN,
        data
      );
      await dispatch(setUserInSession(transactionalData));
      dispatch(setToken(response.data.access));
      dispatch(setRefresh(response.data.refresh));
      dispatch(setIsAuthenticated(true));
      return response.data;
    } catch (err: any) {
      return errorFormat(err);
    }
  };

/**
 * @param {string} email
 * @param {string} password
 */
export const Login =
  (data: LoginInterface): Thunk =>
  async (dispatch): Promise<AxiosResponse | any> => {
    try {
      const response: AxiosResponse = await axios.post(
        URL_CATALOG.USER.LOGIN,
        data
      );
      await dispatch(customToken(data, response.data));
      return response.data;
    } catch (err: any) {
      return errorFormat(err);
    }
  };

/**
 * Function used to close the assignment, and delete the user's assignment.
 */
export const Logout =
  (): Thunk =>
  async (dispatch): Promise<any> => {
    await dispatch(cleanUserData());
    await dispatch(logout());
  };
