import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
const Footer = () => {
  return (
    <footer className="footer" >
  
    <Typography align='center'>
      All rights reserved &copy; {new Date().getFullYear()}
    </Typography>

    <Typography variant="body2" align="center">
      <Link href="https://simtk-confluence.stanford.edu:8443/display/OpenSim/Documentation+To+Do+List">
                   Todo Document For Learning
      </Link>
    </Typography>

  </footer>
  );
};

export default Footer;




