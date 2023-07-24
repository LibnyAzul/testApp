import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import RootRoutes from 'routes';
import store, { persistor } from 'shared/redux/store';
import MuiThemeProvider from 'styles/theme';

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MuiThemeProvider>
          <RootRoutes />
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
