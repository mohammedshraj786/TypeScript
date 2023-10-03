import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/header";
import Theme from "./components/theme/customTheme";
import { ThemeProvider } from "@mui/material/styles";
import Buttons from "./components/button&Icon/button";
import NoteCard, { NoteCardProps } from "./components/card/card";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


interface TaskData {
  id: number;
  taskData: string;
  stickynotes: string;
}

function App() {
  const staticColors = ["#C8FFF2", "#C8DBFF", "#FFC8C8"];
  const [cards, setCards] = useState<NoteCardProps[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);


  const staticDisplayColors = ["#F2C8FF", "#FFC8DB", "#C8FFC8"];

  const showSnackbar = (message: string, duration: number = 3000) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
      setSnackbarMessage("");
    }, duration);
  };

  const addCard = () => {
    const newCardColor = staticColors[currentColorIndex];
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % staticColors.length);

    const newCard: NoteCardProps = {
      stickynotes: "",
      color: newCardColor,
      onAddNote: (stickynotes) => {
        if (stickynotes.trim() !== "") {
          handleAddNote(stickynotes);
        } else {
          showSnackbar("Please enter some notes.");
        }
      },
      taskData: "",
      onDeleteTask: () => {}
    };

    setCards([...cards, newCard]);
  };

  const handleAddNote = (stickynotes: string) => {
    if (stickynotes.trim() !== "") {
      fetch("https://f59d-103-156-100-11.ngrok-free.app/dataInsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stickynotes }),
      })
        .then((response) => response.json())
        .then((createdNote) => {
          console.log("Note posted:", createdNote);
          showSnackbar("Note added successfully!");
          fetchData(); 
        })
        .catch((error) => {
          console.error("Error adding note:", error);
          showSnackbar("Failed to add note. Please try again.", 5000);
        });
    } else {
      showSnackbar("Please enter some notes.");
    }
  };

  const handleTaskDelete = async (id: number) => {
    const trimmedId = String(id).trim();

    try {
      const response = await fetch("https://f59d-103-156-100-11.ngrok-free.app/dataDelete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: trimmedId }),
      });

      if (response.ok) {
        showSnackbar("Task deleted successfully");
        fetchData(); 
      } else {
        console.error("Failed to delete the task");
        showSnackbar("Failed to delete the task. Please try again.");
      }
    } catch (error) {
      console.error("Error in deleting task:", error);
      showSnackbar("Error in deleting task. Please try again.");
    }
  };

  const fetchData = () => {
    fetch("https://f59d-103-156-100-11.ngrok-free.app/dataGet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: { taskDatas: TaskData[] }) => {
        let dataArray: TaskData[] = data.taskDatas || [];

        setCards(
          dataArray.map((item, index) => ({
            taskData: item.taskData,
            color: staticDisplayColors[index % staticDisplayColors.length],
            stickynotes: item.stickynotes,
            onAddNote: handleAddNote,
            onDeleteTask: () => handleTaskDelete(item.id), 
          }))
        );

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={Theme}>
    <div className="App">
      <div className="Header">
        <Header />
      </div>
      <div>
        <Buttons addCard={addCard} />
        {isLoading ? ( 
          <div className="LoadingMessage">Loading Your Sticky Notes</div>
        ) : isError ? ( 
          <div className="ErrorMessage">
            <h4 style={{}}>External server error so please try again later</h4>
            <img src="https://img.freepik.com/free-vector/503-error-service-unavailable-concept-illustration_114360-1886.jpg?size=626&ext=jpg&uid=R118550984&ga=GA1.2.1025367759.1690434160&semt=ais"/>
            </div>
        ) : (
          <div className="Card">
            {cards.map((card, index) => (
                 <NoteCard
                 key={index}
                 stickynotes={card.taskData}
                 color={card.color}
                 onAddNote={card.onAddNote}
                 onDeleteTask={card.onDeleteTask} 
                 taskData={card.taskData} 
               />
            ))}
          </div>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={
            snackbarMessage.includes("successfully") ? "success" : "error"
          }
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  </ThemeProvider>
);
}


export default App;