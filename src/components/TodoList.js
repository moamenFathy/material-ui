import { useContext, useEffect, useState } from "react";
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
import { TodosContext } from "../contexts/TodosContext";

const TodoList = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [todoVal, setTodoVal] = useState("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos && storedTodos !== "null" && storedTodos !== "undefined") {
      const parsedTodos = JSON.parse(storedTodos);
      if (Array.isArray(parsedTodos)) {
        setTodos(parsedTodos);
      }
    }
  }, [setTodos]);

  const handleClick = () => {
    if (todoVal === "") return;
    const newTodo = {
      id: uuidv4(),
      title: todoVal,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...(todos || []), newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
          {todos && todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
          <Grid container mt={2} spacing={2}>
            <Grid size={8}>
              <TextField
                label="Add Your Task"
                required
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
