//Form Todo....

import React, { useState, useEffect } from "react";
import TodoList from "./todoList";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

function TodoForm() 
{
  const apiUrl = "https://ce59-103-156-100-11.ngrok-free.app";
  const [taskText, setTaskText] = useState("");
  const [message, setMessage] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskList, setShowTaskList] = useState(false);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };
// creating the task ....
  const addTask = async () => {
    if (!taskText.trim()) {
      setMessage("Enter any task to store in the list");
    } else {
      try {
        const requestBody = JSON.stringify({ text: taskText });
        const response = await fetch(`${apiUrl}/dataInsert`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
        });

        if (response.ok) {
          setMessage("Your Task Is Stored Successfully");
          setTaskText("");
          fetchTasksFromAPI();
        } else {
          setMessage("Failed to add the task");
        }
      } catch (error) {
        console.error("Error in adding task:", error);
        setMessage("Error in adding task.");
      }
    }

    setTimeout(() => {
      setMessage("");
    }, 1000);
  };
// getting the task....
  const fetchTasksFromAPI = async () => {
    try {
      const response = await fetch(`${apiUrl}/dataGet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData && Array.isArray(responseData.taskDatas)) {
          const tasksArray = responseData.taskDatas.map((taskDataObj: any) => ({
            id: taskDataObj._id,
            text: taskDataObj.taskData,
            completed: false,
          }));

          setTasks(tasksArray);
          setShowTaskList(true);
        } else {
          console.error(
            "Invalid API response format or missing taskDatas array."
          );
        }
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasksFromAPI();
  }, []);

// deleting the task............
  const handleTaskDelete = async (id: number) => {
    const trimmedId = String(id).trim();

    try {
      const response = await fetch(`${apiUrl}/dataDelete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: trimmedId }),
      });

      if (response.ok) {
        setMessage("Your task Is deleted Successfully");
        fetchTasksFromAPI();
      } else {
        console.error("Failed to delete the task");
      }
    } catch (error) {
      console.error("Error in deleting task:", error);
    }

    setTimeout(() => {
      setMessage("");
    }, 1000);
  };

  return (
    <div id="container">
      <h3>Do It Today It's To-Do</h3>

      <div id="task-input">
        <TextField
          id="task"
          label="Create New Task"
          placeholder="Create New Task"
          value={taskText}
          onChange={handleTaskChange}
          multiline
          rows={1}
          variant="outlined"
        />
      </div>

      {message && <div className="message">{message}</div>}

      <Button variant="contained" onClick={addTask}>
        Add Task
      </Button>

      {showTaskList && (
        <div id="task-list">
          <TodoList
            tasks={tasks}
            onTaskDelete={handleTaskDelete}
            setTasks={setTasks}
          />
        </div>
      )}
    </div>
  );
}

export default TodoForm;