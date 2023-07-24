import React, { FC, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  Grid,
  Switch,
  ThemeOptions,
  Typography
} from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import Company from 'modules/companies/company';
import Button from '@mui/material/Button';
import { customDispatch, customSelector } from 'hooks/redux';
import { setCustomTheme } from 'shared/redux/slices/settings';
import { useNavigate } from 'react-router-dom';

const CustomTheme: FC = () => {
  const { customTheme } = customSelector((state) => state.settings);
  const [value, setValue] = React.useState('1');
  const [themeOptions, setThemeOptions] = useState<ThemeOptions | any>(
    customTheme
  );
  const [theme, setTheme] = useState<string>(customTheme.palette.mode);
  const dispatch = customDispatch();
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  });
  const lightTheme = createTheme({
    palette: {
      mode: 'light'
    }
  });

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: string
  ): void => {
    setValue(newValue);
  };

  const handleChangeMode = (): void => {
    setTimeout(() => {
      setThemeOptions(theme === 'light' ? lightTheme : darkTheme);
      setTheme(theme === 'light' ? 'dark' : 'light');
    }, 100);
  };

  const HandleMode = (): any => {
    return (
      <Typography>
        {`Entorno: ${
          themeOptions.palette.mode === 'light' ? 'Claro!' : 'Oscuro!'
        }`}
        <Switch
          onChange={handleChangeMode}
          defaultChecked={theme === 'light'}
        />
      </Typography>
    );
  };

  const HandleBackground = (): any => {
    return (
      <Grid>
        <Typography variant="h6">Background</Typography>

        <Typography sx={{ mt: 2, mb: 1 }}>Default</Typography>
        <MuiColorInput
          value={themeOptions.palette?.background?.default ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                background: {
                  ...themeOptions.palette?.background,
                  default: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Paper</Typography>
        <MuiColorInput
          value={themeOptions.palette?.background?.paper ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                background: {
                  ...themeOptions.palette?.background,
                  paper: color
                }
              }
            })
          }
        />
      </Grid>
    );
  };

  const HandleText = (): any => {
    return (
      <Grid>
        <Typography variant="h6">Text</Typography>

        <Typography sx={{ mt: 2, mb: 1 }}>Primary</Typography>
        <MuiColorInput
          value={themeOptions.palette?.text?.primary ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                text: {
                  ...themeOptions.palette?.text,
                  primary: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Secondary</Typography>
        <MuiColorInput
          value={themeOptions.palette?.text?.secondary ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                text: {
                  ...themeOptions.palette?.text,
                  secondary: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Disabled</Typography>
        <MuiColorInput
          value={themeOptions.palette?.text?.disabled ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                text: {
                  ...themeOptions.palette?.text,
                  disabled: color
                }
              }
            })
          }
        />
      </Grid>
    );
  };

  const HandlePrimary = (): any => {
    return (
      <Grid>
        <Typography variant="h6">Primary</Typography>

        <Typography sx={{ mt: 2, mb: 1 }}>Main</Typography>
        <MuiColorInput
          value={themeOptions.palette?.primary?.main ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                primary: {
                  ...themeOptions.palette?.primary,
                  main: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Light</Typography>
        <MuiColorInput
          value={themeOptions.palette?.primary?.light ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                primary: {
                  ...themeOptions.palette?.primary,
                  light: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Dark</Typography>
        <MuiColorInput
          value={themeOptions.palette?.primary?.dark ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                primary: {
                  ...themeOptions.palette?.primary,
                  dark: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>ContrastText</Typography>
        <MuiColorInput
          value={themeOptions.palette?.primary?.contrastText ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                primary: {
                  ...themeOptions.palette?.primary,
                  contrastText: color
                }
              }
            })
          }
        />
      </Grid>
    );
  };

  const HandleSecondary = (): any => {
    return (
      <Grid>
        <Typography variant="h6">Secondary</Typography>

        <Typography sx={{ mt: 2, mb: 1 }}>Main</Typography>
        <MuiColorInput
          value={themeOptions.palette?.secondary?.main ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                secondary: {
                  ...themeOptions.palette?.secondary,
                  main: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Light</Typography>
        <MuiColorInput
          value={themeOptions.palette?.secondary?.light ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                secondary: {
                  ...themeOptions.palette?.secondary,
                  light: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Dark</Typography>
        <MuiColorInput
          value={themeOptions.palette?.secondary?.dark ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                secondary: {
                  ...themeOptions.palette?.secondary,
                  dark: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>ContrastText</Typography>
        <MuiColorInput
          value={themeOptions.palette?.secondary?.contrastText ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                secondary: {
                  ...themeOptions.palette?.secondary,
                  contrastText: color
                }
              }
            })
          }
        />
      </Grid>
    );
  };

  const HandleError = (): any => {
    return (
      <Grid>
        <Typography variant="h6">Error</Typography>

        <Typography sx={{ mt: 2, mb: 1 }}>Main</Typography>
        <MuiColorInput
          value={themeOptions.palette?.error?.main ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                error: {
                  ...themeOptions.palette?.error,
                  main: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Light</Typography>
        <MuiColorInput
          value={themeOptions.palette?.error?.light ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                error: {
                  ...themeOptions.palette?.error,
                  light: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Dark</Typography>
        <MuiColorInput
          value={themeOptions.palette?.error?.dark ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                error: {
                  ...themeOptions.palette?.error,
                  dark: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>ContrastText</Typography>
        <MuiColorInput
          value={themeOptions.palette?.error?.contrastText ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                error: {
                  ...themeOptions.palette?.error,
                  contrastText: color
                }
              }
            })
          }
        />
      </Grid>
    );
  };

  const HandleWarning = (): any => {
    return (
      <Grid>
        <Typography variant="h6">Warning</Typography>

        <Typography sx={{ mt: 2, mb: 1 }}>Main</Typography>
        <MuiColorInput
          value={themeOptions.palette?.warning?.main ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                warning: {
                  ...themeOptions.palette?.warning,
                  main: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Light</Typography>
        <MuiColorInput
          value={themeOptions.palette?.warning?.light ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                warning: {
                  ...themeOptions.palette?.warning,
                  light: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Dark</Typography>
        <MuiColorInput
          value={themeOptions.palette?.warning?.dark ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                warning: {
                  ...themeOptions.palette?.warning,
                  dark: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>ContrastText</Typography>
        <MuiColorInput
          value={themeOptions.palette?.warning?.contrastText ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                warning: {
                  ...themeOptions.palette?.warning,
                  contrastText: color
                }
              }
            })
          }
        />
      </Grid>
    );
  };

  const HandleInfo = (): any => {
    return (
      <Grid>
        <Typography variant="h6">Info</Typography>

        <Typography sx={{ mt: 2, mb: 1 }}>Main</Typography>
        <MuiColorInput
          value={themeOptions.palette?.info?.main ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                info: {
                  ...themeOptions.palette?.info,
                  main: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Light</Typography>
        <MuiColorInput
          value={themeOptions.palette?.info?.light ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                info: {
                  ...themeOptions.palette?.info,
                  light: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Dark</Typography>
        <MuiColorInput
          value={themeOptions.palette?.info?.dark ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                info: {
                  ...themeOptions.palette?.info,
                  dark: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>ContrastText</Typography>
        <MuiColorInput
          value={themeOptions.palette?.info?.contrastText ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                info: {
                  ...themeOptions.palette?.info,
                  contrastText: color
                }
              }
            })
          }
        />
      </Grid>
    );
  };

  const HandleSuccess = (): any => {
    return (
      <Grid>
        <Typography variant="h6">Success</Typography>

        <Typography sx={{ mt: 2, mb: 1 }}>Main</Typography>
        <MuiColorInput
          value={themeOptions.palette?.success?.main ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                success: {
                  ...themeOptions.palette?.success,
                  main: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Light</Typography>
        <MuiColorInput
          value={themeOptions.palette?.success?.light ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                success: {
                  ...themeOptions.palette?.success,
                  light: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>Dark</Typography>
        <MuiColorInput
          value={themeOptions.palette?.success?.dark ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                success: {
                  ...themeOptions.palette?.success,
                  dark: color
                }
              }
            })
          }
        />

        <Typography sx={{ mt: 2, mb: 1 }}>ContrastText</Typography>
        <MuiColorInput
          value={themeOptions.palette?.success?.contrastText ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                success: {
                  ...themeOptions.palette?.success,
                  contrastText: color
                }
              }
            })
          }
        />
      </Grid>
    );
  };

  const HandleDivider = (): any => {
    return (
      <Grid>
        <Typography variant="h6">Divider</Typography>
        <MuiColorInput
          value={themeOptions.palette?.divider ?? ''}
          onChange={(color: string) =>
            setThemeOptions({
              ...themeOptions,
              palette: {
                ...themeOptions.palette,
                divider: color
              }
            })
          }
        />
      </Grid>
    );
  };

  return (
    <Box>
      <ThemeProvider theme={createTheme(themeOptions)}>
        <CssBaseline />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Modo" value="1" />
                    <Tab label="Fondo" value="2" />
                    <Tab label="Texto" value="3" />
                    <Tab label="Estilo Primario" value="4" />
                    <Tab label="Estilo Secundario" value="5" />
                    <Tab label="Errores" value="6" />
                    <Tab label="Advertencias" value="7" />
                    <Tab label="Información" value="8" />
                    <Tab label="Éxito" value="9" />
                    <Tab label="Diviciones" value="10" />
                  </TabList>
                </Box>
                <TabPanel value="1">{HandleMode()}</TabPanel>
                <TabPanel value="2">{HandleBackground()}</TabPanel>
                <TabPanel value="3">{HandleText()}</TabPanel>
                <TabPanel value="4">{HandlePrimary()}</TabPanel>
                <TabPanel value="5">{HandleSecondary()}</TabPanel>
                <TabPanel value="6">{HandleError()}</TabPanel>
                <TabPanel value="7">{HandleWarning()}</TabPanel>
                <TabPanel value="8">{HandleInfo()}</TabPanel>
                <TabPanel value="9">{HandleSuccess()}</TabPanel>
                <TabPanel value="10">{HandleDivider()}</TabPanel>
              </TabContext>
            </Box>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                dispatch(setCustomTheme(themeOptions));
                navigate(0);
              }}
            >
              Guardar
            </Button>
            <>&nbsp;&nbsp;</>
            <Button
              variant="contained"
              disableElevation
              onClick={() => {
                dispatch(setCustomTheme(theme));
                navigate(0);
              }}
            >
              Reiniciar
            </Button>
          </Grid>
          {/* <Grid item xs={12}>
            <Company />
          </Grid> */}
        </Grid>
      </ThemeProvider>
    </Box>
  );
};

export default CustomTheme;
