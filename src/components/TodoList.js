import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  TextField,
} from "@mui/material";
import Todo from "./Todo";
import { Height } from "@mui/icons-material";

const TodoList = () => {
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
          <Todo />
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
