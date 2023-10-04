import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/header";
import Theme from "./components/theme/customTheme";
import { ThemeProvider } from "@mui/material/styles";
import Buttons from "./components/button&Icon/button";
import NoteCard, { NoteCardProps } from "./components/card/card";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { ReactQueryDevtools } from "react-query/devtools";
import { useQueryClient } from 'react-query'
import { useQuery } from "react-query";
import { QueryClientProvider } from "react-query";


function App() {
  const staticColors = ["#C8FFF2", "#C8DBFF", "#FFC8C8"];
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [currentColorIndex, setCurrentColorIndex] = useState<number>(0);
  const initialCards: NoteCardProps[] = [];

  const [isDataFetching, setIsDataFetching] = useState<boolean>(true);

  // Define your query function, fetchData
  const fetchData = async () => {
    setIsDataFetching(true);
    const response = await fetch("https://93cb-103-156-100-11.ngrok-free.app/dataGet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  // Set isDataFetching to false when data is fetched successfully
    const data = await response.json();
    console.log(data);
    console.log("Response data:", response);
    setIsDataFetching(false); 
    if(data.length===0)
    {
      return <div><h1>NO DATA IS THERE....</h1></div>
    }
    else
    return data.taskDatas || [];
  };

  // Use useQuery to fetch and manage data
  const { data: cards = initialCards, isLoading, isError } = useQuery("fetchData", fetchData);

  const showSnackbar = (message: string, duration: number = 3000) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);

    setTimeout(() => {
      setSnackbarOpen(false);
      setSnackbarMessage("");
    }, duration);
  };

  const queryClient = useQueryClient();
  const addCard = () => {
    const newCardColor = staticColors[currentColorIndex];
    setCurrentColorIndex((prevIndex) => (prevIndex + 1) % staticColors.length);

    const newCard: NoteCardProps = {
      _id: "",
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
      onDeleteTask: () => { },
      isDataFetching: isLoading, // Pass isDataFetching prop based on isLoading
    };

    queryClient.setQueryData("fetchData", (prevData: NoteCardProps[] = initialCards) => [
      ...prevData,
      newCard,
    ]);
  };

  const handleAddNote = (stickynotes: string) => {
    if (stickynotes.trim() !== "") {
      fetch("https://93cb-103-156-100-11.ngrok-free.app/dataInsert", {
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
          queryClient.invalidateQueries("fetchData");
        
        
        })
        .catch((error) => {
          console.error("Error adding note:", error);
          showSnackbar("Failed to add note. Please try again.", 5000);
        });
    } else {
      showSnackbar("Please enter some notes.");
    }
  };

  const handleTaskDelete = async (_id: string) => {
    console.log(_id);

    try {
      const response = await fetch("https://93cb-103-156-100-11.ngrok-free.app/dataDelete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: _id }),
      });

      if (response.ok) {
        showSnackbar("Task deleted successfully");
        console.log("Response data:", response);
        queryClient.invalidateQueries("fetchData");
      } else {
        console.error("Failed to delete the task");
        showSnackbar("Failed to delete the task. Please try again.");
      }
    } catch (error) {
      console.error("Error in deleting task:", error);
      showSnackbar("Error in deleting task. Please try again.");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
  
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
                <img src="https://img.freepik.com/free-vector/503-error-service-unavailable-concept-illustration_114360-1886.jpg?size=626&ext=jpg&uid=R118550984&ga=GA1.2.1025367759.1690434160&semt=ais" alt="Error" />
              </div>
            ) : (
              <div className="Card">
                {cards.map((card: NoteCardProps, index: number) => (
                  <NoteCard
                    key={index}
                    _id={card._id}
                    stickynotes={card.taskData}
                    color={staticColors[index % staticColors.length]}
                    onAddNote={handleAddNote}
                    onDeleteTask={() => handleTaskDelete(card._id)}
                    taskData={card.taskData}
                    isDataFetching={isDataFetching}
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
        <ReactQueryDevtools />
      </ThemeProvider>
     
    </QueryClientProvider>
  );
}

export default App;

