import AppRoutes from './routes/AppRoutes'
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function DarkModeButtom() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (

    <Typography>
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Typography>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: deepPurple
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes buttonDark={<DarkModeButtom />} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}