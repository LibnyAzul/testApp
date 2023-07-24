export default interface IPermission {
    id: number;
    name: string;
    content_type_id: number;
    codename: string;
  }
  
  export const initialState = {
    id: 0,
    name: '',
    content_type_id: 0,
    codename: ''
  };
  