export const parseJSON = (response: any): void => {
  return response.json();
};

export const errorFormat = (err: any): any => {
  if (err.status === 401 && err.statusText === 'Unauthorized') {
    const rest: any = {
      Error: 'Sesión expirada',
      Message: 'Es necesario que inicie sesión nuevamente.'
    };
    return rest;
  }
  return err?.response?.data;
};

export const ExtractInfoData = (data: string = ''): string => {
  if (typeof data === 'string') {
    if (data.includes(':')) {
      data = data.substr(data.indexOf(':') + 1, data.length);
    }
  }
  return data;
};

export const validateEmail = /[a-z0-9]+@[a-z]+.[a-z]{2,3}/;
