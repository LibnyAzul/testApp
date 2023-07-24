import React from 'react';
import IGroup from 'shared/dictionary/group';
import IPermission from 'shared/dictionary/permissions';
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { green, red, lightBlue } from '@mui/material/colors';

export default interface IUser {
  id?: number;
  password?: string;
  last_login?: string;
  is_superuser: boolean;
  email: string;
  name: string;
  is_staff: boolean;
  alive?: boolean;
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  groups?: IGroup[];
  user_permissions?: IPermission[];
}

export interface IFKUser {
  id?: number;
  name: string;
}

export interface BookIUser {
  maxPage: number;
  objectList: IUser[];
  objectsPerPage: number;
  page: number;
  total: number;
}

export const initialState: IUser = {
  email: '',
  name: '',
  is_staff: false,
  is_superuser: false
};

export const FKState: IFKUser = {
  name: ''
};

export const initBook: BookIUser = {
  maxPage: 0,
  objectList: [],
  objectsPerPage: 0,
  page: 0,
  total: 0
};

export const GenerateColumns = (navigate: any, ChangeAlive: any): any => {
  const columns: GridColumns = [
    {
      field: 'id',
      headerName: 'Identificador',
      type: 'number'
    },
    {
      field: 'name',
      headerName: 'Nombre',
      type: 'string',
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Correo electrónico',
      type: 'string',
      flex: 1
    },
    {
      field: 'is_staff',
      headerName: 'Personal (U)',
      type: 'boolean',
      flex: 1
    },
    {
      field: 'is_superuser',
      headerName: 'Administrativo (SU)',
      type: 'boolean',
      flex: 1
    },
    {
      field: 'alive',
      headerName: 'Estatus',
      type: 'actions',
      flex: 1,
      renderCell: (params: any) => {
        const isAlive: boolean = params.row.alive;
        return [
          <GridActionsCellItem
            key={params.id}
            icon={
              isAlive ? (
                <CheckCircleIcon sx={{ color: green.A700 }} />
              ) : (
                <HighlightOffIcon sx={{ color: red.A700 }} />
              )
            }
            label={isAlive ? 'Activo' : 'Inactivo'}
            onClick={() => ChangeAlive(params.row.id, isAlive)}
          />
        ];
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      cellClassName: 'actions',
      flex: 1,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={`${id}-1`}
            icon={<VisibilityIcon sx={{ color: lightBlue.A700 }} />}
            label="Ver"
            onClick={() => navigate(`/entity/user/details/${id}`)}
          />,
          <GridActionsCellItem
            key={`${id}-2`}
            icon={<ModeEditOutlinedIcon sx={{ color: lightBlue.A700 }} />}
            label="Editar"
            onClick={() => navigate(`/entity/user/edit/${id}`)}
          />
        ];
      }
    }
  ];
  return columns;
};
