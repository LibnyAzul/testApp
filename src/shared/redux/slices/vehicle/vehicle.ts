import URL_CATALOG from 'shared/dictionary';
import { AxiosResponse } from 'axios';
import axios from 'shared/utils/axios';
import { errorFormat } from 'shared/utils/validate';
import IVehicle from 'shared/dictionary/vehicle';

export const List = async (data: any): Promise<AxiosResponse | any> => {
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!axios?.defaults?.headers?.common.Authorization) {
      throw new Error('Bearer token no configurado');
    }
    const response: AxiosResponse = await axios.post(
      URL_CATALOG.VEHICLE.INDEX,
      data
    );
    return response.data;
  } catch (err) {
    return errorFormat(err);
  }
};

export const ChangeStatus = async (
  id: number,
  alive: boolean
): Promise<AxiosResponse | any> => {
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!axios?.defaults?.headers?.common.Authorization) {
      throw new Error('Bearer token no configurado');
    }
    const response: AxiosResponse = await axios.put(URL_CATALOG.VEHICLE.ALIVE, {
      id,
      alive: !alive
    });
    return response.data;
  } catch (err) {
    return errorFormat(err);
  }
};

export const GetVehicleById = async (
  id: number
): Promise<AxiosResponse | any> => {
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!axios?.defaults?.headers?.common.Authorization) {
      throw new Error('Bearer token no configurado');
    }
    const response: AxiosResponse = await axios.get(
      `${URL_CATALOG.VEHICLE.SEARCH}?id=${id}`
    );
    return response.data;
  } catch (err) {
    return errorFormat(err);
  }
};

export const SaveVehicle = async (
  vehicle: IVehicle | any
): Promise<AxiosResponse | any> => {
  const URL: string =
    vehicle.id !== undefined && vehicle.id > 0
      ? URL_CATALOG.VEHICLE.EDIT
      : URL_CATALOG.VEHICLE.ADD;
  const method: 'post' | 'put' =
    vehicle.id !== undefined && vehicle.id > 0 ? 'put' : 'post';
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!axios?.defaults?.headers?.common.Authorization) {
      throw new Error('Bearer token no configurado');
    }
    const response: AxiosResponse = await axios[method](URL, vehicle);
    return response.data;
  } catch (err) {
    return errorFormat(err);
  }
};

export const GetLatestTrackingByVehicleId = async (
  id: number
): Promise<AxiosResponse | any> => {
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!axios?.defaults?.headers?.common.Authorization) {
      throw new Error('Bearer token no configurado');
    }
    const response: AxiosResponse = await axios.get(
      `${URL_CATALOG.TRACKING.Last_TRACKING}?id=${id}`
    );
    return response.data;
  } catch (err) {
    return errorFormat(err);
  }
};
