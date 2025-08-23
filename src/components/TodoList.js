import { useContext, useEffect, useMemo, useState } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Todo from "./Todo";
import { TodosContext } from "../contexts/todosContext";

const TodoList = () => {
  const { todos, dispatch } = useContext(TodosContext);
  const [todoVal, setTodoVal] = useState("");
  const [dialogId, setDialogId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: "",
    description: "",
  });
  const [displayTodos, setDisplayTodos] = useState("all");

  useEffect(() => {
    dispatch({ type: "get" });
  }, [dispatch]);

  const handleClick = () => {
    dispatch({ type: "added", payload: { title: todoVal } });
    setTodoVal("");
  };

  const handleChange = (e) => {
    setTodoVal(e.target.value);
  };

  const changeDisplayType = (e) => {
    setDisplayTodos(e.target.value);
    console.log(e.target.value);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const openDeleteDialog = (id) => {
    setDialogId(id);
    setShowDeleteDialog(true);
  };

  const openUpdateDialog = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      setUpdatedTodo({
        title: todoToUpdate.title,
        description: todoToUpdate.description,
      });
    }
    setDialogId(id);
    setShowUpdateDialog(true);
  };

  const handleDeleteTodo = () => {
    dispatch({ type: "deleted", payload: { id: dialogId } });
    setShowDeleteDialog(false);
  };

  let rendedTodos = todos;

  const completedTodos = useMemo(() => {
    return todos.filter((t) => t.isCompleted);
  }, [todos]);
  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => !t.isCompleted);
  }, [todos]);

  if (displayTodos === "done") rendedTodos = completedTodos;
  else if (displayTodos === "unfinished") rendedTodos = notCompletedTodos;

  const handleCloseUpdateDialog = () => {
    setShowUpdateDialog(false);
  };

  const handleUpdateTodo = () => {
    dispatch({ type: "updated", payload: { updatedTodo, id: dialogId } });
    setShowUpdateDialog(false);
    console.log(updatedTodo);
  };

  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        onClose={handleCloseDeleteDialog}
        open={showDeleteDialog}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleDeleteTodo();
          console.log(e.key);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are You Sure To Delete This Task ?
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You Can't Retrieve The Task Back After Deletion
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDeleteDialog}>
            close
          </Button>

          <Button variant="contained" autoFocus onClick={handleDeleteTodo}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== Delete Dialog === */}

      {/* Update Dialog */}
      <Dialog
        onClose={handleCloseUpdateDialog}
        open={showUpdateDialog}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleUpdateTodo();
          console.log(e.key);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update This Task</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Task Title"
            type="email"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdateTodo();
              console.log(e.key);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Task Details"
            type="email"
            fullWidth
            variant="standard"
            value={updatedTodo.description}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, description: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdateTodo();
              console.log(e.key);
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleCloseUpdateDialog}>
            close
          </Button>

          <Button variant="contained" autoFocus onClick={handleUpdateTodo}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== Update Dialog === */}

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
              rendedTodos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  showDelete={openDeleteDialog}
                  showUpdate={openUpdateDialog}
                />
              ))}
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
    </>
  );
};

export default TodoList;
