import { customDispatch } from 'hooks/redux';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorCodes } from 'shared/dictionary/errors';
import IVehicle, { initialState } from 'shared/dictionary/vehicle';
import { handleCustomAlert } from 'shared/redux/slices/alerts';
import { GetVehicleById } from 'shared/redux/slices/vehicle/vehicle';
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
  const [vehicle, setVehicle] = useState<IVehicle>(initialState);
  const [loading, setLoading] = useState<boolean>(false);

  const loadEntity = async (): Promise<any> => {
    await GetVehicleById(Number(params.id)).then((data: IVehicle | any) => {
      if ('Error' in data) {
        void dispatch(handleCustomAlert(ErrorCodes(data.Error, data.Message)));
      } else {
        setLoading(false);
        setVehicle(data);
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
            <CustomButton
              navigate={navigate}
              path="/entity/vehicle"
              type="list"
            />
          }
          id="View-Department"
          title="Detalles del Vehìculo"
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
            {`Identificador: ${vehicle.id ?? ''}`}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            {`Placas: ${vehicle.plates ?? ''}`}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            {`Marca: ${vehicle.brand ?? ''}`}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            {`Modelo: ${vehicle.model ?? ''}`}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            {`Color: ${vehicle.colour ?? ''}`}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            {`Número de Serie: ${vehicle.serialNumber ?? ''}`}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            variant="body1"
            sx={{ pl: 4, pb: 1 }}
          >
            {'Estatus: '}
            {vehicle.alive ?? false ? (
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
            {`Creado por: ${vehicle.createdBy ?? ''}`}
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
              value={FormatDate(vehicle.createdDate)}
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
            {`Modificado por: ${vehicle.lastModifiedBy ?? ''}`}
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
              value={FormatDate(vehicle.lastModifiedDate)}
              sx={{ width: 255 }}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Typography>
        </CardContent>
        <CardActionsCustomView
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          path={`/entity/vehicle/edit/${params.id}`}
          navigate={navigate}
        />
      </Card>
    </Box>
  );
};

export default Details;
