import {
  Button,
  CardActions,
  Chip,
  CircularProgress,
  Fab,
  Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { LoadingButton } from '@mui/lab';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import VerifiedIcon from '@mui/icons-material/Verified';
import DoNotDisturbOnTotalSilenceIcon from '@mui/icons-material/DoNotDisturbOnTotalSilence';
import React, { FC, forwardRef } from 'react';
import NumberFormat, { InputAttributes } from 'react-number-format';
import { IMaskInput } from 'react-imask';
import { grey, red } from '@mui/material/colors';
import moment from 'moment';
// import IValueList from 'shared/dictionary/valueList';
import { IBudgetDetails } from 'shared/dictionary/budget';
import * as _ from 'lodash';
import { MapTwoTone } from '@mui/icons-material';

export const FormatCurrency = function (amount: any): string {
  return (
    '$' +
    parseFloat(amount)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  );
};

export const FormatDate = (date: any): any => {
  return moment(date).format('YYYY-MM-DDTkk:mm:ss');
  // let response =
  //   date !== undefined
  //     ? String(date.substr(0, date.indexOf('.')))
  //     : String(new Date());
  // if (response === null || response === undefined || response === '') {
  //   response =
  //     date !== undefined
  //       ? String(date.substr(0, date.indexOf('T')))
  //       : String(new Date());
  // }
  // return response;
};

export const GenerateFolio = (text: string): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890';
  let folio = text;
  for (let index = 0; index < 10; index++) {
    folio += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return folio;
};

export const GeneratePassword = (): string => {
  const characters =
    'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz01234567890.!@#$%^&*()';
  let password = '';
  for (let index = 0; index < 10; index++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
};

export const DefaultErrorObject = (): any => {
  const error: any = {
    Error: 'Sesión',
    Message: 'Los datos de la sesión no son válidos.'
  };
  return error;
};

export const LoadingCustomComponent: FC<any> = (props: any) => {
  return (
    <Stack alignItems="center" {...props}>
      <CircularProgress disableShrink variant="indeterminate" size={'10%'} />
    </Stack>
  );
};

export const CardActionsCustomView: FC<any> = (props: any) => {
  const showEdit: boolean =
    props.showEdit !== undefined && props.showEdit !== null
      ? props.showEdit
      : true;
  return (
    <CardActions className="actions">
      <Button
        size="small"
        variant="contained"
        onClick={() => props.navigate(-1)}
      >
        <ArrowBackIcon /> &nbsp; {'Regresar'}
      </Button>
      {showEdit ? (
        <Button
          size="small"
          variant="contained"
          onClick={() => props.navigate(props.path)}
        >
          <ModeEditOutlinedIcon /> &nbsp; {'Editar'}
        </Button>
      ) : null}
    </CardActions>
  );
};

export const ApprovedActionsCard: FC<any> = (props: any) => {
  const isVerify: boolean =
    props.isVerify !== undefined && props.isVerify !== null
      ? props.isVerify
      : false;
  return (
    <CardActions className="actions">
      <Button
        size="small"
        variant="contained"
        onClick={() => props.navigate(-1)}
      >
        <ArrowBackIcon /> &nbsp; {'Regresar'}
      </Button>
      {isVerify ? (
        <>
          <Button size="small" variant="contained" onClick={props.NotAuthorize}>
            <DoNotDisturbOnTotalSilenceIcon sx={{ color: red['700'] }} /> &nbsp;{' '}
            {'No autorizar'}
          </Button>
          <Button size="small" variant="contained" onClick={props.Authorized}>
            <VerifiedIcon sx={{ color: grey.A100 }} /> &nbsp; {'Autorizar'}
          </Button>
        </>
      ) : null}
    </CardActions>
  );
};

export const CardActionsCustomAddOrEdit: FC<any> = (props: any) => {
  const isUpdate: boolean = props.isUpdate;
  return (
    <CardActions className="actions">
      <LoadingButton
        size="small"
        color="primary"
        loadingPosition="start"
        variant="contained"
        onClick={() => props.navigate(-1)}
        startIcon={<ArrowBackIcon />}
      >
        {'Regresar'}
      </LoadingButton>
      <LoadingButton
        size="small"
        color="primary"
        loading={props.loading}
        loadingPosition="start"
        variant="contained"
        onClick={props.Save}
        startIcon={isUpdate ? <UpgradeIcon /> : <SaveAltIcon />}
        disabled={props.disabled}
      >
        {isUpdate ? 'Actualizar' : 'Guardar'}
      </LoadingButton>
    </CardActions>
  );
};

export const CustomButton: FC<any> = (props: any) => {
  return (
    <Fab
      color="primary"
      size="small"
      aria-label={props.type}
      onClick={() => props.navigate(props.path)}
    >
      {props.type === 'add' ? (
        <AddIcon />
      ) : props.type === 'map' ? (
        <MapTwoTone />
      ) : (
        <ListIcon />
      )}
    </Fab>
  );
};

interface CustomProps {
  onChange: (event: { name: string; value: string }) => void;
  name: string;
}
export const MoneyFormatCustom = forwardRef<
  NumberFormat<InputAttributes>,
  CustomProps
>(function MoneyFormatCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values: any) => {
        onChange({
          name: props.name,
          value: values.value
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

export const NumberFormatCustom = forwardRef<
  NumberFormat<InputAttributes>,
  CustomProps | any
>(function NumberFormatCustom(props, ref) {
  const { onChange, min, max, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      thousandSeparator
      isNumericString
      isAllowed={(e: any) => {
        const { value } = e;
        if (value >= min && value <= max) return true;

        return false;
      }}
      onValueChange={(values: any) => {
        onChange({
          name: props.name,
          value: values.value
        });
      }}
    />
  );
});

export const PhoneFormatCustom = (): any => {
  const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
    function TextMaskCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          mask="(#00) 0000-0000"
          definitions={{
            '#': /[1-9]/
          }}
          onAccept={(values: any) => {
            onChange({
              name: props.name,
              value: values.value
            });
          }}
          overwrite
        />
      );
    }
  );
  return TextMaskCustom;
};

export const DetailsList: FC<any> = (props: any) => {
  if (!_.isNil(props.details) && props.details !== '') {
    const item: IBudgetDetails = JSON.parse(props.details);
    return (
      <Stack>
        <Stack direction="row" spacing={1} sx={{ pb: 1 }}>
          <Chip
            label={`Enero: ${FormatCurrency(item.January)}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`Febrero: ${FormatCurrency(item.February)}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`Marzo: ${FormatCurrency(item.March)}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`Abril: ${FormatCurrency(item.April)}`}
            color="primary"
            variant="outlined"
          />
        </Stack>
        <Stack direction="row" spacing={1} sx={{ pb: 1 }}>
          <Chip
            label={`Mayo: ${FormatCurrency(item.May)}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`Junio: ${FormatCurrency(item.June)}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`Julio: ${FormatCurrency(item.July)}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`Agosto: ${FormatCurrency(item.August)}`}
            color="primary"
            variant="outlined"
          />
        </Stack>
        <Stack direction="row" spacing={1} sx={{ pb: 1 }}>
          <Chip
            label={`Septiembre: ${FormatCurrency(item.September)}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`Octubre: ${FormatCurrency(item.October)}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`Noviembre: ${FormatCurrency(item.November)}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`Diciembre: ${FormatCurrency(item.December)}`}
            color="primary"
            variant="outlined"
          />
        </Stack>
      </Stack>
    );
  } else {
    return <></>;
  }
};

// export const TranslateValueList = (
//   // list: IValueList[] | any,
//   type: String = '',
//   name: String = '',
//   len: String = 'esLabel'
// ): any => {
//   if (list.length > 0) {
//     const valueList: IValueList = list.filter(
//       (item: IValueList) => item.type === type && item.name === name
//     )[0];
//     return valueList !== undefined
//       ? valueList.id !== undefined && valueList.id > 0
//         ? len === 'esLabel'
//           ? valueList.esLabel
//           : valueList.enLabel
//         : name
//       : name;
//   }
//   return name;
// };

export const ProcessOrder = (status: string): string => {
  switch (status) {
    case 'open':
      return 'authorized';
    case 'open (higher amount)':
      return 'pending manager (greater amount)';
    case 'pending manager (greater amount)':
      return 'authorized manager (greater amount)';
    case 'open (no budget)':
      return 'pending manager (no budget)';
    case 'pending manager (no budget)':
      return 'authorized manager (no budget)';
    case 'ti slope':
      return 'authorized';
    default:
      return '';
  }
};
