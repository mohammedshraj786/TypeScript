import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Box, Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./card.css";

export interface NoteCardProps {
  _id: string;
  taskData: string;
  color: string;
  stickynotes: string;
  onAddNote: (stickynotes: string) => void;
  onDeleteTask: () => void;
  isDataFetching: boolean; // Pass the isDataFetching prop
}

const NoteCard: React.FC<NoteCardProps> = ({
  stickynotes,
  color,
  onAddNote,
  onDeleteTask,
  isDataFetching,
}) => {
  const [description, setDescription] = useState(stickynotes);
  const [deleteSnackbarOpen, setDeleteSnackbarOpen] = useState<boolean>(false);

  useEffect(() => {
    setDescription(stickynotes);
  }, [stickynotes]);

  const handleAddNoteClick = () => {
    onAddNote(description);
  };

  const handleDeleteClick = () => {
    setDeleteSnackbarOpen(true);
  };

  const handleDeleteConfirmed = () => {
    onDeleteTask();
    setDeleteSnackbarOpen(false);
  };

  const maxRows = 3;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Limit the number of rows to maxRows
    const lines = e.target.value.split("\n");
    if (lines.length <= maxRows) {
      setDescription(e.target.value);
    } else {
      // Trim the input to maxRows lines
      setDescription(lines.slice(0, maxRows).join("\n"));
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: color,
        height: "200px",
        margin: "20px",
        borderRadius: "10px",
      }}
    >
      <CardContent>
        <Box>
          <TextField
            inputProps={{
              style: {
                color: "#000000",
                fontSize: "20px",
                fontFamily: "system-ui",
                textOverflow: "auto",
                overflow: "auto",
              },
            }}
            multiline
            value={description}
            placeholder="stickynote"
            onChange={handleChange}
            rows={maxRows}
            variant="standard"
            color="info"
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end" }}>
          {/* Conditionally render the "Add" icon */}
          {!isDataFetching && !stickynotes && (
            <Tooltip title="Add Notes" placement="top">
              <IconButton
                sx={{ color: "#003300", marginTop: "70px" }}
                onClick={handleAddNoteClick}
              >
                <AddCircleOutlineOutlinedIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Edit" placement="top">
            <IconButton sx={{ color: "blue", marginTop: "70px" }}>
              <EditNoteOutlinedIcon fontSize="medium" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" placement="top">
            <IconButton
              sx={{ color: "red", marginTop: "70px" }}
              onClick={handleDeleteClick}
            >
              <DeleteOutlinedIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>

      <Snackbar
        open={deleteSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setDeleteSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setDeleteSnackbarOpen(false)}
          severity="warning"
        >
          Are you sure you want to delete this task?
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button color="inherit" size="small" onClick={handleDeleteConfirmed}>
              Yes
            </Button>
            <Button
              color="inherit"
              size="small"
              onClick={() => setDeleteSnackbarOpen(false)}
            >
              No
            </Button>
          </Box>
        </MuiAlert>
      </Snackbar>
    </Card>
  );
};

export default NoteCard;

