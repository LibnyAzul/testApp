import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  ListItemButton,
  Paper,
  TextField
} from '@mui/material';
import { partition } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import IUser, { IFKUser } from 'shared/dictionary/user';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import styled from '@emotion/styled';

export interface IProps {
  users: IUser[];
  usSelected: IFKUser[];
  usersSelected: IUser[];
  setUsersSelected: () => void;
}

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center'
}));

const MultiUsersSelect: FC<IProps | any> = (props: IProps | any) => {
  // Estado para las listas de objetos y el filtro
  const [availableItems, setAvailableItems] = useState<IUser[]>(props.users);
  const [filter, setFilter] = useState<string>('');

  // Función para manejar la selección de un objeto
  const handleSelectItem = (item: IUser): void => {
    // Eliminamos el objeto seleccionado de la lista de disponibles
    const updatedAvailableItems = availableItems.filter(
      (i) => i.id !== item.id
    );
    setAvailableItems(updatedAvailableItems);

    // Agregamos el objeto seleccionado a la lista de seleccionados
    props.setUsersSelected([...props.usersSelected, item]);
  };

  // Función para filtrar los objetos disponibles
  const handleFilterItems = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.toLowerCase();
    setFilter(value);

    const remainingUsers = props.users.filter(
      (user: IUser) =>
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        !props.usersSelected
          .map((selected: IUser) => selected.id)
          .includes(user.id)
    );

    const filteredItems = remainingUsers.filter(
      (item: IUser) =>
        (item.id ?? '').toString().includes(value) ||
        item.email.toLowerCase().includes(value) ||
        item.name.toLowerCase().includes(value)
    );
    setAvailableItems(filteredItems);
  };

  // Function to handle removing an item from usersSelected list
  const handleRemoveItem = (item: IUser): void => {
    const updatedUsersSelected = props.usersSelected.filter(
      (i: IUser) => i.id !== item.id
    );
    props.setUsersSelected(updatedUsersSelected);

    setAvailableItems([...availableItems, item]);
  };

  useEffect(() => {
    if (Array.isArray(props.usSelected) && props.usSelected.length > 0) {
      const [selectedUsers, remainingUsers] = partition(
        availableItems,
        (item) =>
          props.usSelected.some((selected: IUser) => selected.id === item.id)
      );

      setAvailableItems(remainingUsers);
      props.setUsersSelected(selectedUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.usSelected]);

  return (
    <Card>
      <CardHeader title="Lista de usuarios" />
      <CardContent sx={{ width: '100%' }}>
        <TextField
          id="search-basic"
          label="Buscar usuario"
          variant="standard"
          type="text"
          placeholder="Filtrar por ID, email o nombre"
          value={filter}
          sx={{ width: '30%' }}
          onChange={handleFilterItems}
        />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item>
              <h3>{'Usuarios disponibles'}</h3>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 460,
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 300,
                  '& ul': { padding: 0 }
                }}
                subheader={<li />}
              >
                {availableItems.map((user: IUser, index: number) => (
                  <ListItemButton
                    key={user.id}
                    onClick={() => handleSelectItem(user)}
                    sx={{
                      '&:hover': { backgroundColor: 'rgb(0 83 155 / 50%)' }
                    }}
                  >
                    <ListItemText
                      primary={`[${user.id ?? ''}] ${user.name} - ${
                        user.email ?? ''
                      }`}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <h3>{'Usuarios seleccionados'}</h3>
              <List
                sx={{
                  width: '100%',
                  maxWidth: 460,
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 300,
                  '& ul': { padding: 0 }
                }}
                subheader={<li />}
              >
                {props.usersSelected.map((user: IUser, index: number) => (
                  <ListItemButton
                    key={user.id}
                    onClick={() => handleRemoveItem(user)}
                    sx={{
                      '&:hover': { backgroundColor: 'rgb(79 58 58 / 50%)' }
                    }}
                  >
                    <ListItemText
                      primary={`[${user.id ?? ''}] ${user.name} - ${
                        user.email ?? ''
                      }`}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Item>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MultiUsersSelect;
