import { experimentalStyled as styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Background from 'static/img/Background';
import Grid from '@mui/material/Grid';
import Logo from 'static/img/logo';
import Paper from '@mui/material/Paper';

export const LoginScreenBox = styled(Box)({
  height: '100%',
  width: '100%'
});

export const LoginScreenGrid = styled(Grid)({
  alignItems: 'center',
  position: 'absolute'
});

export const BackgroundOEStyled = styled(Background)({
  width: '100%',
  height: '100%',
  position: 'absolute'
});

export const LogoStyled = styled(Logo)({
  width: '100%',
  height: '25%',
  position: 'absolute'
});

export const LoginScreenPaper = styled(Paper)({
  padding: '3%',
  height: '50vh',
  width: 480,
  margin: '20px auto',
  mixBlendMode: 'normal',
  borderRadius: '4%'
});
