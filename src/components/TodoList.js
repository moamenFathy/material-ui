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
  const [displayTodos, setDisplayTodos] = useState("all");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storedTodos);
  }, []);

  const handleClick = () => {
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

  const changeDisplayType = (e) => {
    setDisplayTodos(e.target.value);
    console.log(e.target.value);
  };

  let rendedTodos = todos;
  const completedTodos = todos.filter((t) => t.isCompleted);
  const notCompletedTodos = todos.filter((t) => !t.isCompleted);

  if (displayTodos === "done") rendedTodos = completedTodos;
  else if (displayTodos === "unfinished") rendedTodos = notCompletedTodos;

  return (
    <Container align="center" maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent sx={{ maxHeight: "60vh", overflow: "auto" }}>
          <Typography variant="h2">
            Tasks
            <Divider />
          </Typography>
          <ToggleButtonGroup
            sx={{ my: "30px" }}
            value={displayTodos}
            onChange={changeDisplayType}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="done">Done</ToggleButton>
            <ToggleButton value="unfinished">Unfinished</ToggleButton>
          </ToggleButtonGroup>
          {rendedTodos &&
            rendedTodos.map((todo) => <Todo key={todo.id} todo={todo} />)}
        </CardContent>
        <CardContent>
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
                disabled={!todoVal}
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
