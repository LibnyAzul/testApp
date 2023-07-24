import React from 'react';
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { green, red, lightBlue } from '@mui/material/colors';
import { IFKUser } from './user';

export default interface IVehicle {
  id?: number;
  plates?: string;
  brand?: string;
  colour?: string;
  model: string;
  serialNumber: string;
  alive?: boolean;
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  users?: IFKUser | number[];
}

export interface IFKVehicle {
  id?: number;
  plates: string;
}

export interface BookIVehicle {
  maxPage: number;
  objectList: IVehicle[];
  objectsPerPage: number;
  page: number;
  total: number;
}

export const initialState: IVehicle = {
  plates: '',
  brand: '',
  model: '',
  colour: '',
  serialNumber: '',
  users: []
};

export const FKState: IFKVehicle = {
  plates: ''
};

export const initBook: BookIVehicle = {
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
      field: 'plates',
      headerName: 'Placas',
      type: 'string',
      flex: 1
    },
    {
      field: 'brand',
      headerName: 'Marca',
      type: 'string',
      flex: 1
    },
    {
      field: 'colour',
      headerName: 'Color',
      type: 'string',
      flex: 1
    },
    {
      field: 'model',
      headerName: 'Modelo',
      type: 'string',
      flex: 1
    },
    {
      field: 'serialNumber',
      headerName: 'Número de Serie',
      type: 'string',
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
            onClick={() => navigate(`/entity/vehicle/details/${id}`)}
          />,
          <GridActionsCellItem
            key={`${id}-2`}
            icon={<ModeEditOutlinedIcon sx={{ color: lightBlue.A700 }} />}
            label="Editar"
            onClick={() => navigate(`/entity/vehicle/edit/${id}`)}
          />
        ];
      }
    }
  ];
  return columns;
};
