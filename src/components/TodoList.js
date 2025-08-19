import React from "react";
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

const TodoList = () => {
  const todos = [
    { id: uuidv4(), title: "First Task", details: "First Task Details" },
    { id: uuidv4(), title: "Second Task", details: "Seconde Task Details" },
    { id: uuidv4(), title: "Third Task", details: "Third Task Details" },
  ];
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
              <TextField label="Add Your Task" variant="outlined" fullWidth />
            </Grid>
            <Grid size={4} sx={{ Height: 100 }}>
              <Button variant="contained" fullWidth sx={{ height: "100%" }}>
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
