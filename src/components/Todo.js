import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  TextField,
} from "@mui/material";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";

const Todo = ({ todo: { title, details, isCompleted, id } }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({ title, details });
  const { todos, setTodos } = useContext(TodosContext);

  const handleCheckClick = () => {
    const updatedTodos = (todos || []).map((t) => {
      return t.id === id ? { ...t, isCompleted: !t.isCompleted } : t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleUpdateClick = () => {
    setShowUpdateDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleCloseUpdateDialog = () => {
    setShowUpdateDialog(false);
  };

  const handleDeleteTodo = () => {
    const updatedTodos = (todos || []).filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleUpdateTodo = () => {
    if (updatedTodo.title === "") return;
    const updatedTodos = (todos || []).map((t) => {
      return t.id === id
        ? { ...t, title: updatedTodo.title, details: updatedTodo.details }
        : t;
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
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
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
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

      <Card
        className="card"
        sx={{
          minWidth: 275,
          backgroundColor: "#283593",
          color: "white",
          mb: 2,
        }}
      >
        <CardContent>
          <Grid container alignItems="center">
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "left",
                  textDecoration: isCompleted ? "line-through" : "none",
                }}
              >
                {title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {details}
              </Typography>
            </Grid>

            <Grid container justifyContent="space-around" size={4}>
              {/* Check Task Button */}
              <IconButton
                sx={{
                  ":hover": {
                    backgroundColor: "#c5c5c5",
                  },
                  color: isCompleted ? "white" : "#8bc34a",
                  backgroundColor: isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
                onClick={handleCheckClick}
              >
                <CheckIcon />
              </IconButton>
              {/* ===Check Task Button=== */}

              {/* Edit Task Button */}
              <IconButton
                sx={{
                  ":hover": {
                    backgroundColor: "#c5c5c5",
                  },
                  color: "#1769aa",
                  backgroundColor: "white",
                  border: "solid #1769aa 3px",
                }}
                onClick={handleUpdateClick}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
              {/* ===Edit Task Button=== */}

              {/* Delete Task Button */}
              <IconButton
                sx={{
                  ":hover": {
                    backgroundColor: "#c5c5c5",
                    boxShadow: "0px 7px 7px rgba(0, 0, 0, 0.4)",
                  },
                  color: "#b23c17",
                  backgroundColor: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* ===Delete Task Button=== */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
