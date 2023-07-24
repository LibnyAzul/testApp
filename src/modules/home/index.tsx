import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import { Typography, Box } from '@mui/material';
import { customSelector } from 'hooks/redux';

const Home: FC = () => {
  const {
    user: { name }
  } = customSelector((state) => state);

  return (
    <Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h4"
          gutterBottom
        >{`Hello ${name}, Welcome to "techTest"`}</Typography>
      </Grid>
    </Box>
  );
};

export default Home;
