import { useContext, useState } from "react";
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

  const handleCheck = (todoId) => {
    // alert("Alert from parent (todo List)" + todoId);
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
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} handleCheck={handleCheck} />
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
