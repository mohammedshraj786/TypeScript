import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import './button.css';

interface ButtonsProps {
  addCard: () => void; 
}

const Buttons: React.FC<ButtonsProps> = ({ addCard }) => {
  const handleAddClick = () => {
    
    addCard();
  };

  return (
    <div className='Button-Area'>
      <Tooltip title="Create New Task" placement='right'>
      <Button
        className='Button'
        variant="contained"
        sx={{
          fontFamily:"system-ui"  ,
          color: "black",
          fontSize: "15px",
          backgroundColor: "#4d8bff",
          "&:hover": {
            backgroundColor: "  #1a6aff ",
            
          }
        }}
        endIcon={<AddIcon className='AddIconButton' />}
        onClick={handleAddClick} 
      >
        Add Notes
      </Button>
      </Tooltip>
      
    </div>
  );
};

export default Buttons;




