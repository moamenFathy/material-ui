import { Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Todo = ({ id, title, details }) => {
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
                  color: "#8bc34a",
                  backgroundColor: "white",
                  border: "solid #8bc34a 3px",
                }}
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
