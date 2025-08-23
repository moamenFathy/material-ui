import { Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";

const Todo = ({
  todo: { title, description, isCompleted, id },
  showDelete,
  showUpdate,
}) => {
  const { dispatch } = useContext(TodosContext);

  const handleCheckClick = () => {
    dispatch({ type: "toggled", payload: { id } });
  };

  const handleUpdateClick = () => {
    showUpdate(id);
  };

  return (
    <>
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
                {description}
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
                onClick={() => {
                  showDelete(id);
                }}
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
