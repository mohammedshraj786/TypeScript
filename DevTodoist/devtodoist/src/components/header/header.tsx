import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness2Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function Header() {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!isDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div" sx={{ fontSize: "30px", fontWeight: "bolder" }}>
              ToDo-List
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
          <Button onClick={toggleTheme} color="inherit" sx={{ ml: 2 }}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness2Icon />}
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        
          </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
