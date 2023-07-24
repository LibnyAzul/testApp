import React, { FC, useEffect, useState } from 'react';
import { customDispatch } from 'hooks/redux';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ErrorCodes } from 'shared/dictionary/errors';
import IPagination, { initPagination } from 'shared/dictionary/pagination';
import IUser, { GenerateColumns } from 'shared/dictionary/user';
import {
  handleCustomAlert,
  handleCustomAlertSuccess
} from 'shared/redux/slices/alerts';
import { ChangeStatus, List } from 'shared/redux/slices/auth/user';
import { CustomButton } from 'shared/utils/components/general';
import DataGrid from 'shared/utils/components/dataGrid';

const User: FC = () => {
  const [list, setList] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [objectForPagination, setObjectForPagination] =
    useState<IPagination>(initPagination);
  const dispatch = customDispatch();
  const navigate = useNavigate();

  const getList = async (): Promise<any> => {
    setLoading(true);
    await List(objectForPagination).then((data: any) => {
      if ('Error' in data) {
        void dispatch(handleCustomAlert(ErrorCodes(data.Error, data.Message)));
      } else {
        const book = data;
        const list: IUser[] | any = [];
        if (book.objectList.length > 0) {
          list.push(...book.objectList);
        }
        book.objectList = [];
        book.filters = objectForPagination.filters;
        setObjectForPagination(book);
        setList(list);
      }
    });
    setLoading(false);
  };

  const ChangeAlive = async (id: number, alive: boolean): Promise<any> => {
    await ChangeStatus(id, alive).then((data: any) => {
      if ('Error' in data) {
        void dispatch(handleCustomAlert(ErrorCodes(data.Error, data.Message)));
      } else {
        void dispatch(handleCustomAlertSuccess(data));
        void getList();
      }
    });
  };

  useEffect(() => {
    void getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <CustomButton
              navigate={navigate}
              path="/entity/user/add"
              type="add"
            />
          }
          id="parent-modal-description"
          title="Usuarios"
        />
        <CardContent>
          <DataGrid
            loading={loading}
            list={list}
            columns={GenerateColumns(navigate, ChangeAlive)}
            getList={getList}
            objectForPagination={objectForPagination}
            setObjectForPagination={setObjectForPagination}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default User;
