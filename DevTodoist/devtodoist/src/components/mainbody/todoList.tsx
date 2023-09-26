import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  tasks: Task[];
  onTaskDelete: (id: number) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TodoList: React.FC<TodoListProps> = ({
  tasks,
  onTaskDelete,
  setTasks,
}) => {
  const handleTaskToggle = (taskId: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <Checkbox
            checked={task.completed}
            onChange={() => handleTaskToggle(task.id)}
          />
          <ListItemText
            primary={task.text}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          />
          <Button variant="contained" onClick={() => onTaskDelete(task.id)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;