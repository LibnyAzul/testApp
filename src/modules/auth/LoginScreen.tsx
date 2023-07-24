import React, { FC, useEffect, useState } from 'react';
import {
  BackgroundOEStyled,
  LoginScreenBox,
  LoginScreenGrid,
  LoginScreenPaper
} from 'styles/LoginScreen';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Typography, Switch, TextField, createTheme } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { validateEmail } from 'shared/utils/validate';
import { customDispatch, customSelector } from 'hooks/redux';
import { Login, Logout } from 'shared/redux/slices/auth';
import { useNavigate } from 'react-router-dom';
import { setCustomTheme } from 'shared/redux/slices/settings';
import CustomAlerts, {
  ICustomAlerts,
  initialState as startAlert
} from 'shared/utils/components/alerts';
import { ErrorCodes } from 'shared/dictionary/errors';
// import { GetCollaboratorByUser } from 'shared/redux/slices/collaborator';
// import { setCollaborator } from 'shared/redux/slices/auth/user';

interface IState {
  email: string;
  password: string;
}

const LoginScreen: FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IState>({
    email: '',
    password: ''
  });
  const [alertObject, setAlertObject] = useState<ICustomAlerts>(startAlert);
  const [error, setError] = useState<any>({ email: false, password: false });
  const [loading, setLoading] = useState<boolean>(false);
  const {
    auth: { isAuthenticated },
    settings: { customTheme }
  } = customSelector((state) => state);
  const [theme, setTheme] = useState<string>(customTheme.palette.mode);
  const dispatch = customDispatch();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  });

  useEffect(() => {
    isAuthenticated && navigate('/');
  }, [isAuthenticated, navigate]);

  const send = (e: any): void => {
    setLoading(true);
    console.log(customTheme);
    dispatch(setCustomTheme(theme === 'light' ? customTheme : darkTheme));
    if (
      data.email !== '' &&
      data.password !== '' &&
      validateEmail.test(data.email)
    ) {
      void dispatch(Login(data)).then(async (response: any) => {
        if ('Error' in response) {
          void dispatch(Logout());
          setAlertObject({
            ...alertObject,
            open: true,
            alert: {
              ...alertObject.alert,
              message: ErrorCodes(response.Error, response.Message)
            }
          });
        } else {
          console.log('response: ', response);
        }
      });
    } else {
      (data.email === '' || !validateEmail.test(data.email)) &&
        setError({ ...error, email: true });
      data.password === '' && setError({ ...error, password: true });
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const closeAlert = (): void => setAlertObject(startAlert);
  const labelColor = theme === 'light' ? 'black' : 'white';

  return (
    <LoginScreenBox>
      <BackgroundOEStyled />
      <LoginScreenGrid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <LoginScreenPaper
          elevation={10}
          sx={
            theme === 'light'
              ? {
                  background:
                    'linear-gradient(156.18deg, rgba(255, 255, 255, 0.6693) 46.35%, rgba(180, 180, 180, 0.5382) 100%)'
                }
              : {
                  background:
                    'linear-gradient(156.18deg, rgba(0, 0, 0, 0.6693) 46.35%, rgba(180, 180, 180, 0.5382) 100%)'
                }
          }
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar alt="test" sx={{ width: 100, height: 100 }}>
              <Typography variant="h2">T</Typography>
            </Avatar>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              id="email"
              label="Email"
              type="email"
              autoComplete="session-email"
              variant="standard"
              margin="normal"
              fullWidth
              required
              onChange={(e) => setData({ ...data, email: e.target.value })}
              error={error.email}
              InputLabelProps={{
                style: { color: labelColor }
              }}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="session-password"
              variant="standard"
              margin="normal"
              fullWidth
              required
              onChange={(e) => setData({ ...data, password: e.target.value })}
              error={error.password}
              InputLabelProps={{
                style: { color: labelColor }
              }}
            />
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <LoadingButton
              endIcon={<LoginIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
              loadingIndicator="Loading…"
              onClick={send}
            >
              Iniciar
            </LoadingButton>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="right"
            alignItems="right"
            style={{
              padding: '3%',
              margin: '40px auto'
            }}
          >
            <Typography style={{ color: labelColor }}>
              {`Entorno: ${theme === 'light' ? 'Claro!' : 'Oscuro!'}`}
              <Switch
                onChange={(e) => setTheme(theme === 'light' ? 'dark' : 'light')}
                defaultChecked={customTheme.palette.mode === 'light'}
              />
            </Typography>
          </Grid>
        </LoginScreenPaper>
      </LoginScreenGrid>
      <CustomAlerts params={alertObject} closeAlert={closeAlert} />
    </LoginScreenBox>
  );
};

export default LoginScreen;
