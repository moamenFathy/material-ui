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
} from "@mui/material";

const TodoList = () => {
  return (
    <Container align="center" maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h2">
            Tasks
            <Divider />
          </Typography>
          <ToggleButtonGroup sx={{ mt: "30px" }}>
            <ToggleButton>All</ToggleButton>
            <ToggleButton>Done</ToggleButton>
            <ToggleButton>Unfinished</ToggleButton>
          </ToggleButtonGroup>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default TodoList;
