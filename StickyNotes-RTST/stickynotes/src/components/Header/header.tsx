import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import SideBar from "../sidebar/sidebar"


const Search = styled('div')(({ theme }) => (
  {
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.5),
  },
  // marginRight: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '20%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color:"black"

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header()
 {

  const [sidebarOpen,setSidebarOpen]=React.useState(false);


  const toggleSidebar=()=>
  {
    setSidebarOpen(!sidebarOpen);
  }
  return (
    <Box sx={{ flexGrow: 1, minHeight:"4px ! important" }}>
      <AppBar position="static" sx={{backgroundColor:" #99bdff"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="info"
            aria-label="open drawer"
            sx={{ mr: 2 , color:"black" ,":&hover":{color:"red"}  }}
            onClick={toggleSidebar} 
          >
            <MenuIcon />
          </IconButton>
          <Typography
          className='vertical-rotate'
            variant="h4"
            noWrap
            component="div"
           color="black"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' , fontFamily:"system-ui" , color:"black" } }}
          >
            Sticky Notes
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
            
              placeholder="Search…"
              // inputProps={{ 'aria-label': 'search' , color:"black"}}
              inputProps={{style:{  color:"	 #000000" , fontSize:"20px" , fontFamily:"cursive"}}}
              // sx={{fontFamily:"cursive"}}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <SideBar open={sidebarOpen} toggleSidebar={toggleSidebar}/>
    </Box>
  );
}