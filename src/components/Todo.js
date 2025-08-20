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
} from "@mui/material";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";

const Todo = ({ todo: { title, details, isCompleted, id } }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { todos, setTodos } = useContext(TodosContext);

  const handleCheckClick = () => {
    setTodos(
      todos.map((t) => {
        return t.id === id ? { ...t, isCompleted: !t.isCompleted } : t;
      })
    );
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleDeleteTodo = () => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      {/* Dialog */}
      <Dialog
        onClose={handleCloseDialog}
        open={showDeleteDialog}
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
          <Button variant="outlined" onClick={handleCloseDialog}>
            close
          </Button>
          <Button variant="contained" autoFocus onClick={handleDeleteTodo}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/*=== Dialog === */}
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
              <Typography variant="h5" sx={{ textAlign: "left" }}>
                {title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {details}
              </Typography>
            </Grid>
            <Grid container justifyContent="space-around" size={4}>
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
              <IconButton
                sx={{
                  ":hover": {
                    backgroundColor: "#c5c5c5",
                  },
                  color: "#1769aa",
                  backgroundColor: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
