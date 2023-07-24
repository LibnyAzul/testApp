import { customSelector } from 'hooks/redux';
import React, { FC, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import { CssBaseline } from '@mui/material';

interface ThemeProps {
  children: ReactNode;
}

const MuiThemeProvider: FC<ThemeProps> = ({ children }) => {
  const { customTheme } = customSelector((state) => state.settings);

  return (
    <StyledEngineProvider>
      <ThemeProvider theme={createTheme(customTheme)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MuiThemeProvider;
