import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Switch,
  TextField
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import IVehicle, { initialState } from 'shared/dictionary/vehicle';
import {
  GetVehicleById,
  SaveVehicle
} from 'shared/redux/slices/vehicle/vehicle';
import { handleCustomAlert } from 'shared/redux/slices/alerts';
import { ErrorCodes } from 'shared/dictionary/errors';
import {
  CardActionsCustomAddOrEdit,
  CustomButton,
  LoadingCustomComponent
} from 'shared/utils/components/general';
import { customDispatch, customSelector } from 'hooks/redux';
import IUser from 'shared/dictionary/user';
import IPagination, {
  IFilter,
  initPagination
} from 'shared/dictionary/pagination';
import { List } from 'shared/redux/slices/auth/user';
import _ from 'lodash';
import MultiUsersSelect from 'shared/utils/components/users/multiUsersSelect';

interface IBooleans {
  loading: boolean;
  entity: boolean;
}

const initBoooleans: IBooleans = {
  loading: false,
  entity: false
};

const AddOrEdit: FC = () => {
  const params = useParams();
  const dispatch = customDispatch();
  const [vehicle, setVehicle] = useState<IVehicle>(initialState);
  const [booleans, setBooleans] = useState<IBooleans>(initBoooleans);
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersSelected, setUsersSelected] = useState<IUser[]>([]);
  const { user } = customSelector((state) => state);

  const navigate = useNavigate();
  const isUpdate = 'id' in params;

  const loadEntity = async (): Promise<any> => {
    setBooleans({ ...initBoooleans, entity: true });
    await GetVehicleById(Number(params.id)).then((data: IVehicle | any) => {
      if (data !== undefined) {
        if ('Error' in data) {
          void dispatch(
            handleCustomAlert(ErrorCodes(data.Error, data.Message))
          );
        } else {
          setVehicle({
            ...data
          });
        }
      }
    });

    if (user.is_superuser !== undefined && user.is_superuser) {
      const pageFilter: IPagination = initPagination;
      const filter: IFilter = {
        column: 'alive',
        filter: 'exact',
        value: true
      };
      pageFilter.filters.push(filter);
      pageFilter.objectsPerPage = -1;

      await List(pageFilter).then((data: any) => {
        if ('Error' in data) {
          void dispatch(
            handleCustomAlert(ErrorCodes(data.Error, data.Message))
          );
        } else {
          const book = data;
          const list: IUser[] | any = [];
          if (book.objectList.length > 0) {
            list.push(...book.objectList);
          }
          setUsers(list);
        }
      });
    }

    setBooleans({ ...initBoooleans, entity: false });
  };

  useEffect(() => {
    // Utiliza void para ignorar el valor de retorno de la promesa
    if (isUpdate) {
      void loadEntity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Save = async (): Promise<any> => {
    setBooleans({ ...booleans, loading: true });
    let isSave = true;
    if (
      vehicle.plates !== '' &&
      vehicle.brand !== '' &&
      vehicle.colour !== ''
    ) {
      const object: any = vehicle;
      if (isSave) {
        if (usersSelected.length > 0) {
          object.users = _.map(usersSelected, 'id');
        } else {
          if (
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            (user.is_superuser !== undefined || !user.is_superuser) &&
            user.is_staff !== undefined &&
            user.is_staff
          ) {
            object.users.push(user.id);
          }
        }

        await SaveVehicle(object).then((data: any) => {
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
      if (vehicle.plates !== '') {
        void dispatch(
          handleCustomAlert(
            'Error - El campo de placas es requerido',
            'warning'
          )
        );
      } else {
        if (vehicle.brand === '') {
          void dispatch(
            handleCustomAlert(
              'Campos requeridos. - La marca es requerida.',
              'warning'
            )
          );
        }
        if (vehicle.colour === '') {
          void dispatch(
            handleCustomAlert(
              'Campos requeridos. - El color es requerido..',
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
            <CustomButton
              navigate={navigate}
              path="/entity/vehicle"
              type="list"
            />
          }
          id="title"
          title={(isUpdate ? 'Editar' : 'Agregar') + ' Vehìculo'}
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
            className="plates"
            id="plates"
            label="Placas"
            type="text"
            sx={{ pb: 2 }}
            autoComplete="vehicle-plates"
            variant="standard"
            value={vehicle.plates}
            required
            onChange={(e) => {
              setVehicle({ ...vehicle, plates: e.target.value });
            }}
          />
          <TextField
            className="brand"
            id="brand"
            label="Marca"
            type="text"
            sx={{ pb: 2 }}
            autoComplete="vehicle-brand"
            variant="standard"
            value={vehicle.brand}
            required
            onChange={(e) => {
              setVehicle({ ...vehicle, brand: e.target.value });
            }}
          />
          <TextField
            className="colour"
            id="colour"
            label="Color"
            type="text"
            sx={{ pb: 2 }}
            autoComplete="vehicle-colour"
            variant="standard"
            value={vehicle.colour}
            required
            onChange={(e) => {
              setVehicle({ ...vehicle, colour: e.target.value });
            }}
          />
          <TextField
            className="model"
            id="model"
            label="Modelo"
            type="text"
            sx={{ pb: 2 }}
            autoComplete="vehicle-model"
            variant="standard"
            value={vehicle.model}
            required
            onChange={(e) => {
              setVehicle({ ...vehicle, model: e.target.value });
            }}
          />
          <TextField
            className="serialNumber"
            id="serialNumber"
            label="Número de Serie"
            type="text"
            sx={{ pb: 2 }}
            autoComplete="vehicle-serialNumber"
            variant="standard"
            value={vehicle.serialNumber}
            required
            onChange={(e) => {
              setVehicle({ ...vehicle, serialNumber: e.target.value });
            }}
          />
          {isUpdate ? (
            <>
              <FormControlLabel
                value="start"
                control={
                  <Switch
                    color="primary"
                    checked={vehicle.alive}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setVehicle({ ...vehicle, alive: e.target.checked })
                    }
                  />
                }
                label="Estatus: "
                labelPlacement="start"
              />
            </>
          ) : null}
        </CardContent>
        {user.is_superuser !== undefined &&
        user.is_superuser &&
        users.length > 0 ? (
          <MultiUsersSelect
            users={users}
            usSelected={vehicle.users}
            usersSelected={usersSelected}
            setUsersSelected={setUsersSelected}
          />
        ) : null}
        <CardActionsCustomAddOrEdit
          navigate={navigate}
          Save={Save}
          loading={booleans.loading}
          isUpdate={isUpdate}
          disabled={
            vehicle.plates === '' ||
            vehicle.brand === '' ||
            vehicle.colour === ''
          }
        />
      </Card>
    </Box>
  );
};

export default AddOrEdit;
