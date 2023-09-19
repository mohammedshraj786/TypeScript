// TodoList.js

import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  tasks: Task[];
  onTaskDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onTaskDelete }) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          {/* <Checkbox checked={task.completed} /> */}
          <Checkbox style={ {textDecoration:"line-through"}   }></Checkbox>
          <ListItemText primary={task.text} />
          <Button variant="contained" onClick={() => onTaskDelete(task.id)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
