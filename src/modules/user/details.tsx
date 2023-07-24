import { customDispatch } from 'hooks/redux';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorCodes } from 'shared/dictionary/errors';
import IUser, { initialState } from 'shared/dictionary/user';
import { handleCustomAlert } from 'shared/redux/slices/alerts';
import { GetUserById } from 'shared/redux/slices/auth/user';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { green, red } from '@mui/material/colors';
import {
  CardActionsCustomView,
  CustomButton,
  FormatDate,
  LoadingCustomComponent
} from 'shared/utils/components/general';

const Details: FC = () => {
  const params: any = useParams();
  const navigate = useNavigate();
  const dispatch = customDispatch();
  const [user, setUser] = useState<IUser>(initialState);
  const [loading, setLoading] = useState<boolean>(false);

  const loadEntity = async (): Promise<any> => {
    await GetUserById(Number(params.id)).then((data: IUser | any) => {
      if ('Error' in data) {
        void dispatch(handleCustomAlert(ErrorCodes(data.Error, data.Message)));
      } else {
        setLoading(false);
        setUser(data);
      }
    });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    void loadEntity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <CustomButton navigate={navigate} path="/entity/user" type="list" />
          }
          id="View-Department"
          title="Detalles del usuario"
        />
        <LoadingCustomComponent
          style={loading ?? false ? {} : { display: 'none' }}
        />
        <CardContent style={loading ? { display: 'none' } : {}}>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            Identificador
            {`Identificador: ${user.id ?? ''}`}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            {`Nombre: ${user.name}`}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            {`Correo electrónico: ${user.email}`}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            {'Personal (U): '}
            {user.is_staff ?? false ? (
              <CheckCircleIcon sx={{ color: green.A700 }} />
            ) : (
              <HighlightOffIcon sx={{ color: red.A700 }} />
            )}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            {'Administrativo (SU): '}
            {user.is_superuser ?? false ? (
              <CheckCircleIcon sx={{ color: green.A700 }} />
            ) : (
              <HighlightOffIcon sx={{ color: red.A700 }} />
            )}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            {'Estatus: '}
            {user.alive ?? false ? (
              <CheckCircleIcon sx={{ color: green.A700 }} />
            ) : (
              <HighlightOffIcon sx={{ color: red.A700 }} />
            )}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            Creado por:
            {`Creado por: ${user.createdBy ?? ''}`}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            <TextField
              id="createdDate"
              label="Fecha de creación"
              type="datetime-local"
              disabled
              value={FormatDate(user.createdDate)}
              sx={{ width: 255 }}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            modificado por:
            {`Modificado por: ${user.lastModifiedBy ?? ''}`}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            <TextField
              id="createdDate"
              label="Fecha de modificación"
              type="datetime-local"
              disabled
              value={FormatDate(user.lastModifiedDate)}
              sx={{ width: 255 }}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Typography>
          {user.last_login !== null ? (
            <Typography
              gutterBottom
              component="div"
              variant="body1"
              sx={{ pl: 4, pb: 1 }}
            >
              <TextField
                id="lastLogin"
                label="Ultimo inicio de sesión"
                type="datetime-local"
                disabled
                value={FormatDate(user.last_login)}
                sx={{ width: 255 }}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Typography>
          ) : null}
        </CardContent>
        <CardActionsCustomView
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          path={`/entity/user/edit/${params.id}`}
          navigate={navigate}
        />
      </Card>
    </Box>
  );
};

export default Details;
