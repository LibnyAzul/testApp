import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { FC, Fragment, useEffect, useState } from 'react';
import { ErrorCodes } from 'shared/dictionary/errors';
import { customDispatch } from 'hooks/redux';
import { handleCustomAlert } from 'shared/redux/slices/alerts';
import _ from 'lodash';
import { List as ListOfVehicles } from 'shared/redux/slices/vehicle/vehicle';
import { BookIVehicle } from 'shared/dictionary/vehicle';

/**
 *
 * @param props This is an object with multiple values, which are cleared below:
 *
 * @void setAlertObject useState @Required
 * @object alertObject @Required
 *
 * @var filters This is an array of objects, which is attached to the "Body" of the request, the objects and their properties are:
 * @object {
 *          "column": "id",
 *          "filter": "orderBy",
 *          "value": "desc"
 * }, Object used to order the records by the identifier in descending order
 * @object {
 *          "column": "plates",
 *          "filter": "exact",
 *          "value": 'ASB-CD-312'
 * }, Object used to filter the records using the company identifier
 *
 * Taking into account the possibility of attaching filters to the request,
 * it is important to identify that there are other types of filters, such as those described below:
 * @var type Describes and delimits the entity that is used in the component. Example: "Company" to display all companies.
 * @var id Main component identifier.
 * @var sx parent component layout properties.
 * @var value Default value that the main component will have.
 * @var required Property indicating whether or not the parent component is required.
 * @var title Title that the main component will have
 * @var len Variable that helps identify if the label should be displayed in Spanish (esLabel) or English (enLabel)
 *
 * @var filterBy Attach the property by which it is filtered, it is worth mentioning that until now it is only used to filter all the records that do not match that property;
 *      @property id Show all records that do not match the identifier
 * @var filterValue Property used to complement the filter that uses the "filterBy" property. This property contains the value to filter by.
 * @returns
 */
export interface IProps {
  filters: any;
  type: string;
  id: string;
  sx: any;
  value: any;
  required: boolean;
  title: string;
  len: string;
  filterBy: string;
  filterValue: string;
}

const CustomComponentToSelect: FC<IProps | any> = (props: IProps | any) => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<any>([]);
  const body: any = {
    filters:
      props.filters !== undefined && props.filters.length > 0
        ? props.filters
        : [],
    objectsPerPage: -1
  };
  const dispatch = customDispatch();
  const loading = open && list.length === 0;
  const notItems: any = { id: 0, name: 'No se encontraron registros.' };

  const FilterActive = (): void => {
    const aliveExist = body.filters.filter(
      (item: any) => item.column === 'alive'
    );
    if (aliveExist.length === 0) {
      body.filters.push({
        column: 'alive',
        filter: 'exact',
        value: true
      });
    }
  };

  const handleZeroDivisionError = (response: any): any => {
    let res: any = response;
    if (JSON.stringify(response).includes('ZeroDivisionError')) {
      void dispatch(
        handleCustomAlert(
          props.filters.length > 0
            ? // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              `No se encontraron registros relacionados a: ${props.filters[0].value}`
            : 'No se encontraron registros',
          'warning'
        )
      );
      res = null;
    }
    return res;
  };

  const VechicleList = async (): Promise<any> => {
    await ListOfVehicles(body).then((data: BookIVehicle | any) => {
      const zero: any = handleZeroDivisionError(data);
      if (!_.isNil(zero) && 'Error' in data) {
        void dispatch(handleCustomAlert(ErrorCodes(data.Error, data.Message)));
      } else {
        const book = data;
        if (book.objectList.length <= 0) {
          book.objectList[0] = notItems;
        }
        setList(book.objectList);
      }
    });
  };

  const ChargeList = (): void => {
    FilterActive();
    switch (props.type) {
      case 'Vehicle':
        void VechicleList();
        break;
      default:
        setList([]);
        break;
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let active = true;

    if (!loading) {
      return undefined;
    }

    void (async () => {
      ChargeList();
    })();

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const CustomReturn = () => {
    // eslint-disable-next-line react/prop-types
    switch (props.type) {
      case 'Vehicle':
        return (
          <Autocomplete
            // eslint-disable-next-line react/prop-types
            id={props.id}
            // eslint-disable-next-line react/prop-types
            sx={props.sx}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            clearText={'Eliminar'}
            noOptionsText={'No se encontraron registros'}
            isOptionEqualToValue={(option: any, value: any) =>
              option?.plates === value?.plates
            }
            // eslint-disable-next-line react/prop-types
            value={props.value}
            getOptionLabel={(option: any) => option?.plates}
            onChange={(_: any, obj: any) => {
              // eslint-disable-next-line react/prop-types
              props.setObject(obj);
            }}
            options={list}
            loading={loading}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/prop-types
                required={props.required}
                {...params}
                // eslint-disable-next-line react/prop-types
                label={props.title}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  )
                }}
              />
            )}
          />
        );
      default:
        return <></>;
    }
  };

  return CustomReturn();
};
export default CustomComponentToSelect;
