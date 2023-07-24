import React from 'react';
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid';
// import { IFKCompany, FKState as InitCompany } from '../company';
// import {
//   IFKLedgerAccount,
//   FKState as InitLedgerAccount
// } from '../ledgerAccount';
// import {
//   IFKStandardDistribution,
//   FKState as initStandardDistribution
// } from '../standardDistribution';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { green, red, lightBlue } from '@mui/material/colors';

export interface IBudgetDetails {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}

export default interface IBudget {
  id?: number;
  // company: IFKCompany;
  // ledgerAccount: IFKLedgerAccount;
  // standardDistribution: IFKStandardDistribution;
  folio: string;
  comments: string;
  details: string;
  total: number;
  year: number;
  alive?: boolean;
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
}

export interface ISave {
  id?: number;
  company: number;
  ledgerAccount: number;
  standardDistribution: number;
  folio: string;
  comments: string;
  details: string | IBudgetDetails;
  total: number;
  year: number;
  alive?: boolean;
}

export interface BookIBudget {
  maxPage: number;
  objectList: IBudget[];
  objectsPerPage: number;
  page: number;
  total: number;
}

export const initialState: IBudget = {
  // company: InitCompany,
  // ledgerAccount: InitLedgerAccount,
  // standardDistribution: initStandardDistribution,
  folio: '',
  comments: '',
  details: '',
  total: 0,
  year: 0
};

export const initDetails: IBudgetDetails = {
  January: 0,
  February: 0,
  March: 0,
  April: 0,
  May: 0,
  June: 0,
  July: 0,
  August: 0,
  September: 0,
  October: 0,
  November: 0,
  December: 0
};

export const initBook: BookIBudget = {
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
      field: 'folio',
      headerName: 'Folio',
      type: 'string',
      flex: 1
    },
    {
      field: 'year',
      headerName: 'Año',
      type: 'number',
      flex: 1
    },
    {
      field: 'company',
      headerName: 'Compañía',
      type: 'string',
      flex: 1
    },
    {
      field: 'ledgerAccount',
      headerName: 'Cuenta contable',
      type: 'string',
      flex: 1
    },
    {
      field: 'standardDistribution',
      headerName: 'Estándar de Distribución',
      type: 'string',
      flex: 1
    },
    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
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
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            key={`${id}-1`}
            icon={<VisibilityIcon sx={{ color: lightBlue.A700 }} />}
            label="Ver"
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            onClick={() => navigate(`/entity/budget/view/${id}`)}
          />,
          <GridActionsCellItem
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            key={`${id}-2`}
            icon={<ModeEditOutlinedIcon sx={{ color: lightBlue.A700 }} />}
            label="Editar"
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            onClick={() => navigate(`/entity/budget/edit/${id}`)}
          />
        ];
      }
    }
  ];
  return columns;
};

export const GenerateImportColumns = (): any => {
  const columns: GridColumns = [
    {
      field: 'id',
      headerName: 'Identificador',
      type: 'number'
    },
    {
      field: 'Compañía',
      headerName: 'Compañía',
      type: 'string',
      flex: 1
    },
    {
      field: 'Cuenta contable',
      headerName: 'Cuenta contable',
      type: 'string',
      flex: 1
    },
    {
      field: 'Estándar de distribución',
      headerName: 'Estándar de distribución',
      type: 'string',
      flex: 1
    },
    {
      field: 'Año',
      headerName: 'Año',
      type: 'number',
      flex: 1
    },
    {
      field: 'Comentarios',
      headerName: 'Comentarios',
      type: 'string',
      flex: 1
    },
    {
      field: 'Enero',
      headerName: 'Enero',
      type: 'number',
      flex: 1
    },
    {
      field: 'Febrero',
      headerName: 'Febrero',
      type: 'number',
      flex: 1
    },
    {
      field: 'Marzo',
      headerName: 'Marzo',
      type: 'number',
      flex: 1
    },
    {
      field: 'Abril',
      headerName: 'Abril',
      type: 'number',
      flex: 1
    },
    {
      field: 'Mayo',
      headerName: 'Mayo',
      type: 'number',
      flex: 1
    },
    {
      field: 'Junio',
      headerName: 'Junio',
      type: 'number',
      flex: 1
    },
    {
      field: 'Julio',
      headerName: 'Julio',
      type: 'number',
      flex: 1
    },
    {
      field: 'Agosto',
      headerName: 'Agosto',
      type: 'number',
      flex: 1
    },
    {
      field: 'Septiembre',
      headerName: 'Septiembre',
      type: 'number',
      flex: 1
    },
    {
      field: 'Octubre',
      headerName: 'Octubre',
      type: 'number',
      flex: 1
    },
    {
      field: 'Noviembre',
      headerName: 'Noviembre',
      type: 'number',
      flex: 1
    },
    {
      field: 'Diciembre',
      headerName: 'Diciembre',
      type: 'number',
      flex: 1
    },
    {
      field: 'total',
      headerName: 'total',
      type: 'number',
      flex: 1
    }
  ];
  return columns;
};
