export interface Permission {
  id: number;
  codename: string;
  name: string;
}

export interface IGroup {
  id: number;
  name: string;
  permissions: Permission[];
}

export interface UserSession {
  id: number;
  is_superuser?: boolean;
  email: string;
  name: string;
  is_staff?: boolean;
  alive: boolean;
  groups: IGroup[];
  userPermissions: any;
}

export interface Authentication {
  isAuthenticated: boolean;
  token: string | null;
  refresh: string | null;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export const initialState: Authentication = {
  isAuthenticated: false,
  token: null,
  refresh: null
};

export const initialUserState: UserSession = {
  id: 0,
  email: '',
  name: '',
  alive: false,
  userPermissions: undefined,
  groups: []
};

export default UserSession;
