import React, { FC, useState, MouseEvent, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Switch,
  TextField,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
  Button
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import { yellow } from '@mui/material/colors';
import RotateLeftRoundedIcon from '@mui/icons-material/RotateLeftRounded';
import { useNavigate, useParams } from 'react-router-dom';
import IUser, { initialState } from 'shared/dictionary/user';
import { GetUserById, SaveUser } from 'shared/redux/slices/auth/user';
import { handleCustomAlert } from 'shared/redux/slices/alerts';
import { ErrorCodes } from 'shared/dictionary/errors';
import {
  CardActionsCustomAddOrEdit,
  CustomButton,
  GeneratePassword,
  LoadingCustomComponent
} from 'shared/utils/components/general';
import { validateEmail } from 'shared/utils/validate';
import { customDispatch } from 'hooks/redux';

interface IBooleans {
  loading: boolean;
  entity: boolean;
  resetPass: boolean;
  pass: boolean;
}

const initBoooleans: IBooleans = {
  loading: false,
  entity: false,
  resetPass: false,
  pass: false
};

const AddOrEdit: FC = () => {
  const params = useParams();
  const dispatch = customDispatch();
  const [user, setUser] = useState<IUser>(initialState);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [booleans, setBooleans] = useState<IBooleans>(initBoooleans);

  const navigate = useNavigate();
  const isUpdate = 'id' in params;

  const loadEntity = async (): Promise<any> => {
    setBooleans({ ...initBoooleans, entity: true });
    await GetUserById(Number(params.id)).then((data: IUser | any) => {
      if ('Error' in data) {
        void dispatch(handleCustomAlert(ErrorCodes(data.Error, data.Message)));
      } else {
        setUser({
          ...data
        });
      }
    });
    setBooleans({ ...initBoooleans, entity: false });
  };

  useEffect(() => {
    // Utiliza void para ignorar el valor de retorno de la promesa
    if (isUpdate) {
      void loadEntity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseDownPassword = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  const Save = async (): Promise<any> => {
    setBooleans({ ...booleans, loading: true });
    let isSave = true;
    if (
      user.name !== '' &&
      user.email !== '' &&
      validateEmail.test(user.email)
    ) {
      if (!isUpdate || booleans.resetPass) {
        if (user.password === '' || confirmPassword === '') {
          isSave = false;
          void dispatch(
            handleCustomAlert(
              'Campos requeridos - La contraseña y su confirmación son requeridos.',
              'warning'
            )
          );
        } else {
          if (user.password !== confirmPassword) {
            isSave = false;
            void dispatch(
              handleCustomAlert(
                'Error en la contraseña - Las contraseñas no coinciden.',
                'warning'
              )
            );
          } else {
            if (user.password.length <= 9) {
              isSave = false;
              void dispatch(
                handleCustomAlert(
                  'Error en la contraseña - La contraseña debe contar con al menos 10 caracteres.',
                  'warning'
                )
              );
            }
          }
        }
      }

      if (isSave) {
        await SaveUser(user).then((data: any) => {
          if ('Error' in data) {
            void dispatch(
              handleCustomAlert(ErrorCodes(data.Error, data.Message))
            );
          } else {
            navigate(-1);
          }
        });
      }
    } else {
      isSave = false;
      if (user.email !== '' && !validateEmail.test(user.email)) {
        void dispatch(
          handleCustomAlert(
            'Error en el correo - El correo electrónico no cuenta con un formato válido',
            'warning'
          )
        );
      } else {
        if (user.name === '') {
          void dispatch(
            handleCustomAlert(
              'Campos requeridos. - El nombre es requerido.',
              'warning'
            )
          );
        }
        if (user.email === '') {
          void dispatch(
            handleCustomAlert(
              'Campos requeridos. - El correo electrónico es requerido..',
              'warning'
            )
          );
        }
      }
    }
    setBooleans({ ...booleans, loading: false });
  };

  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <CustomButton navigate={navigate} path="/entity/user" type="list" />
          }
          id="title"
          title={(isUpdate ? 'Editar' : 'Agregar') + ' Usuario'}
        />
        <LoadingCustomComponent
          style={booleans.entity ?? false ? {} : { display: 'none' }}
        />
        <CardContent
          style={booleans.entity ? { display: 'none' } : {}}
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            className="name"
            id="name"
            label="Nombre"
            type="text"
            sx={{ pb: 2 }}
            autoComplete="user-name"
            variant="standard"
            value={user.name}
            required
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />

          <TextField
            className="email"
            id="email"
            label="Correo electrónico"
            type="text"
            sx={{ pb: 2 }}
            autoComplete="user-email"
            variant="standard"
            value={user.email}
            required
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          {!isUpdate || booleans.resetPass ? (
            <Box>
              <FormControl
                sx={{ pb: 2, m: 1, width: '100%' }}
                variant="standard"
                required
              >
                <InputLabel htmlFor="user-password">Contraseña</InputLabel>
                <Input
                  id="user-password"
                  type={booleans.pass ? 'text' : 'password'}
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setBooleans({
                            ...booleans,
                            pass: !booleans.pass
                          })
                        }
                        onMouseDown={handleMouseDownPassword}
                      >
                        {booleans.pass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setUser({ ...user, password: GeneratePassword() })
                        }
                        onMouseDown={handleMouseDownPassword}
                      >
                        <RotateLeftRoundedIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl
                sx={{ pb: 2, m: 1, width: '100%' }}
                variant="standard"
                required
              >
                <InputLabel htmlFor="user-password">
                  Confirmar contraseña
                </InputLabel>
                <Input
                  id="user-password"
                  type={booleans.pass ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setBooleans({
                            ...booleans,
                            pass: !booleans.pass
                          })
                        }
                        onMouseDown={handleMouseDownPassword}
                      >
                        {booleans.pass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {user.password !== confirmPassword ? (
                <Typography variant="body1" color="Red">
                  {'Las contraseñas no coinciden'}
                </Typography>
              ) : null}
            </Box>
          ) : null}

          <FormControlLabel
            value="start"
            control={
              <Switch
                color="primary"
                checked={user.is_staff}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUser({ ...user, is_staff: e.target.checked })
                }
              />
            }
            label="Personal (U): "
            labelPlacement="start"
          />
          <br />
          <FormControlLabel
            value="start"
            control={
              <Switch
                color="primary"
                checked={user.is_superuser}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUser({ ...user, is_superuser: e.target.checked })
                }
              />
            }
            label="Administrativo (SU): "
            labelPlacement="start"
          />
          <br />
          {isUpdate ? (
            <>
              <FormControlLabel
                value="start"
                control={
                  <Switch
                    color="primary"
                    checked={user.alive}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUser({ ...user, alive: e.target.checked })
                    }
                  />
                }
                label="Estatus: "
                labelPlacement="start"
              />
              <br />
              {!booleans.resetPass ? (
                <Button
                  size="small"
                  variant="text"
                  onClick={() => {
                    setBooleans({ ...booleans, resetPass: true });
                    setUser({ ...user, password: '' });
                  }}
                >
                  {'Restablecer contraseña '}{' '}
                  <LockResetRoundedIcon sx={{ color: yellow['900'] }} />
                </Button>
              ) : null}
            </>
          ) : null}
        </CardContent>
        <CardActionsCustomAddOrEdit
          navigate={navigate}
          Save={Save}
          loading={booleans.loading}
          isUpdate={isUpdate}
          disabled={user.name === '' || user.email === ''}
        />
      </Card>
    </Box>
  );
};

export default AddOrEdit;
