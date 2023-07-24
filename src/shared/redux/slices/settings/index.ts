import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { createTheme } from '@mui/material/styles';
import { ThemeOptions } from '@mui/material';

const theme = createTheme();

export interface SettingsState {
  themeMode: string;
  customTheme: ThemeOptions | any;
}

const initialState: SettingsState = {
  themeMode: 'light',
  customTheme: {
    palette: {
      mode: theme.palette.mode,
      background: {
        default: theme.palette.background.default,
        paper: theme.palette.background.paper
      },
      text: {
        primary: theme.palette.text.primary,
        secondary: theme.palette.text.secondary,
        disabled: theme.palette.text.disabled
      },
      primary: {
        main: theme.palette.primary.main,
        light: theme.palette.primary.light,
        dark: theme.palette.primary.dark,
        contrastText: theme.palette.primary.contrastText
      },
      secondary: {
        main: theme.palette.secondary.main,
        light: theme.palette.secondary.light,
        dark: theme.palette.secondary.dark,
        contrastText: theme.palette.secondary.contrastText
      },
      error: {
        main: theme.palette.error.main,
        light: theme.palette.error.light,
        dark: theme.palette.error.dark,
        contrastText: theme.palette.error.contrastText
      },
      warning: {
        main: theme.palette.warning.main,
        light: theme.palette.warning.light,
        dark: theme.palette.warning.dark,
        contrastText: theme.palette.warning.contrastText
      },
      info: {
        main: theme.palette.info.main,
        light: theme.palette.info.light,
        dark: theme.palette.info.dark,
        contrastText: theme.palette.info.contrastText
      },
      success: {
        main: theme.palette.success.main,
        light: theme.palette.success.light,
        dark: theme.palette.success.dark,
        contrastText: theme.palette.success.contrastText
      },
      divider: theme.palette.divider
    }
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<string>) => {
      state.themeMode = action.payload;
    },
    setCustomTheme: (state, action: PayloadAction<ThemeOptions | any>) => {
      state.customTheme = action.payload;
    }
  }
});

// Configuration made to prepare for storage
export const persistSettingsConfig = {
  key: 'settings',
  storage,
  whiteList: ['themeMode', 'customTheme']
};

export const { setThemeMode, setCustomTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
