import { createTheme } from '@mui/material/styles';

const MuiTheme = createTheme({
  palette: {
    white: {
      main: '#FFF',
    },
    grey: {
      main: '#868686',
    },
  },
  typography: {
    fontFamily: ['Pretendard'].join(','),
  },
});

export default MuiTheme;
