import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Box } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';

export interface NoteCardProps {
  initialTitle: string;
  initialDescription: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ }) => {
//   const [title, setTitle] = useState(initialTitle);
//   const [description, setDescription] = useState(initialDescription);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");


  return (
    <Card
      sx={{
        backgroundColor: "#ffff33",
        height: "200px",
        // width: "200px",
        margin: "20px",
        borderRadius: "10px",
      }}
    >
      <CardContent>
 <Box className='Text'>
        <TextField className='textfeild'
          // sx={{ fontSize: "5px", fontFamily: "cursive" , width:"80%" , height:"10%" , margin:"0 0 5px 0" }}
          value={title}
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <br/><br/>
        <TextField 
         
          value={description}
          placeholder='Description'
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        </Box>
       
        <br />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Tooltip title="Add Notes" placement="top">
            <IconButton sx={{ color: "#003300" , marginTop:"85px" }}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" placement="top">
            <IconButton sx={{ color: "blue" , marginTop:"85px" }}>
              <EditNoteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <IconButton sx={{ color: "red" ,marginTop:"85px" }}>
              <DeleteOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteCard;