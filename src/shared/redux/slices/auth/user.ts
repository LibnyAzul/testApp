import UserSession, {
  IGroup,
  initialUserState as initialState
} from 'shared/dictionary/auth/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { Thunk } from 'shared/redux/store';
import { errorFormat } from 'shared/utils/validate';
import { AxiosResponse } from 'axios';
import axios from 'shared/utils/axios';
import URL_CATALOG from 'shared/dictionary';
import IUser from 'shared/dictionary/user';
// import ICollaborator from 'shared/dictionary/collaborator';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setIs_Superuser: (state, action: PayloadAction<boolean>) => {
      state.is_superuser = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setIs_Staff: (state, action: PayloadAction<boolean>) => {
      state.is_staff = action.payload;
    },
    setAlive: (state, action: PayloadAction<boolean>) => {
      state.alive = action.payload;
    },
    setUserPermissions: (state, action: PayloadAction<any>) => {
      state.userPermissions = action.payload;
    },
    setGroups: (state, action: PayloadAction<IGroup[]>) => {
      state.groups = action.payload;
    },
    cleanUserData: (state, action: PayloadAction<void>) => {
      state.id = 0;
      state.is_superuser = false;
      state.email = '';
      state.name = '';
      state.is_staff = false;
      state.alive = false;
      state.userPermissions = undefined;
      state.groups = [];
    }
  }
});

// Configuration made to prepare for storage
export const persistUser = {
  key: 'user',
  storage,
  whiteList: [
    'id',
    'is_superuser',
    'email',
    'name',
    'is_staff',
    'alive',
    'userPermissions',
    'groups'
  ]
};

export const {
  setId,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  setIs_Superuser,
  setEmail,
  setName,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  setIs_Staff,
  setAlive,
  setUserPermissions,
  setGroups,
  cleanUserData
} = userSlice.actions;

export default userSlice.reducer;

export const setUserInSession =
  (data: UserSession): Thunk =>
  async (dispatch): Promise<any> => {
    try {
      dispatch(setId(data.id));
      dispatch(setIs_Superuser(Boolean(data.is_superuser)));
      dispatch(setEmail(data.email));
      dispatch(setName(data.name));
      dispatch(setIs_Staff(Boolean(data.is_staff)));
      dispatch(setAlive(data.alive));
      dispatch(setUserPermissions(data.userPermissions));
      dispatch(setGroups(data.groups));
    } catch (e) {
      console.error(e);
    }
  };

export const List = async (data: any = {}): Promise<AxiosResponse | any> => {
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!axios?.defaults?.headers?.common.Authorization) {
      throw new Error('Bearer token no configurado');
    }
    const response: AxiosResponse = await axios.post(
      URL_CATALOG.USER.INDEX,
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
    const response: AxiosResponse = await axios.put(URL_CATALOG.USER.ALIVE, {
      id,
      alive: !alive
    });
    return response.data;
  } catch (err) {
    return errorFormat(err);
  }
};

export const GetUserById = async (id: number): Promise<AxiosResponse | any> => {
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!axios?.defaults?.headers?.common.Authorization) {
      throw new Error('Bearer token no configurado');
    }
    const response: AxiosResponse = await axios.get(
      `${URL_CATALOG.USER.SEARCH}?id=${id}`
    );
    return response.data;
  } catch (err) {
    return errorFormat(err);
  }
};

export const SaveUser = async (user: IUser): Promise<AxiosResponse | any> => {
  const URL: string =
    user.id !== undefined && user.id > 0
      ? URL_CATALOG.USER.EDIT
      : URL_CATALOG.USER.ADD;
  const method: 'post' | 'put' =
    user.id !== undefined && user.id > 0 ? 'put' : 'post';
  try {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!axios?.defaults?.headers?.common.Authorization) {
      throw new Error('Bearer token no configurado');
    }
    const response: AxiosResponse = await axios[method](URL, user);
    return response.data;
  } catch (err) {
    return errorFormat(err);
  }
};
