import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  TextField,
} from "@mui/material";
import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";

const initialTodos = [
  {
    id: uuidv4(),
    title: "First Task",
    details: "First Task Details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Second Task",
    details: "Seconde Task Details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Third Task",
    details: "Third Task Details",
    isCompleted: false,
  },
];

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [todoVal, setTodoVal] = useState("");

  const handleClick = () => {
    const newTodo = {
      id: uuidv4(),
      title: todoVal,
      details: "",
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTodoVal("");
  };

  const handleChange = (e) => {
    setTodoVal(e.target.value);
  };

  return (
    <Container align="center" maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h2">
            Tasks
            <Divider />
          </Typography>
          <ToggleButtonGroup sx={{ my: "30px" }}>
            <ToggleButton>All</ToggleButton>
            <ToggleButton>Done</ToggleButton>
            <ToggleButton>Unfinished</ToggleButton>
          </ToggleButtonGroup>
          {todos.map(({ id, title, details }) => (
            <Todo title={title} details={details} key={id} />
          ))}
          <Grid container mt={2} spacing={2}>
            <Grid size={8}>
              <TextField
                label="Add Your Task"
                variant="outlined"
                value={todoVal}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleClick();
                }}
                fullWidth
              />
            </Grid>
            <Grid size={4} sx={{ Height: 100 }}>
              <Button
                variant="contained"
                fullWidth
                sx={{ height: "100%" }}
                onClick={handleClick}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TodoList;
