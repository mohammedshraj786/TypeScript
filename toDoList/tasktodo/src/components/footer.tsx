import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <Box display="flex" justifyContent="center" id="footer">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6">Daily Tasks Daily Improvement</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Footer;
