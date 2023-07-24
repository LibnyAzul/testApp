import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer, { persistAuthConfig } from 'shared/redux/slices/auth';
import settingsReducer, {
  persistSettingsConfig
} from 'shared/redux/slices/settings';
import userReducer, { persistUser } from 'shared/redux/slices/auth/user';
import alertsReducer, { persistAlertsConfig } from 'shared/redux/slices/alerts';

const store = configureStore({
  reducer: {
    alerts: persistReducer<ReturnType<typeof alertsReducer>>(
      persistAlertsConfig,
      alertsReducer
    ),
    auth: persistReducer<ReturnType<typeof authReducer>>(
      persistAuthConfig,
      authReducer
    ),
    user: persistReducer<ReturnType<typeof userReducer>>(
      persistUser,
      userReducer
    ),
    settings: persistReducer<ReturnType<typeof settingsReducer>>(
      persistSettingsConfig,
      settingsReducer
    )
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false
    })
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export type Thunk = ThunkAction<
  Promise<unknown>,
  RootState,
  unknown,
  Action<string | unknown>
>;

export const persistor = persistStore(store);

export default store;
