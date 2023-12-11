import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function UserWorkouts() {
  const [userid, setUserid] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const viteUrl = import.meta.env.VITE_REACT_APP_API_HOST;
  const getToken = async () => {
    try {
      const loginUrl = `${viteUrl}/token/`;
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
      };

      const response = await fetch(loginUrl, fetchConfig);
      const data = await response.json();
      setUserid(data.user.userid);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (userid != 0 || deleted) {
      const getListWorkout = async () => {
        const response = await fetch(`${viteUrl}/${userid}/workouts`);
        if (response.ok) {
          const data = await response.json();
          setWorkouts(data.workouts);
        }
      };
      getListWorkout();
      setDeleted(false);
    }
  }, [userid, deleted]);

  const updateFavorite = async (workoutid, favoriteStatus) => {
    const url = `${viteUrl}/workouts/${workoutid}/updatefavorite`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify({ favorite: !favoriteStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newWorkouts = workouts.map((workout) => {
        if (workout.workoutid === workoutid) {
          return { ...workout, favorite: !favoriteStatus };
        } else {
          return workout;
        }
      });
      setWorkouts(newWorkouts);
    }
  };

  const deleteWorkout = async (workoutid) => {
    const request = `${viteUrl}/workouts/${workoutid}`;
    const fetchConfig = {
      method: "delete",
    };

    const response = await fetch(request, fetchConfig);

    if (response.ok) {
      setDeleted(true);
    } else {
      alert("unable to delete");
    }
  };

  const DeleteDialog = ({ open, onClose, onDelete, workoutName }) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Delete {workoutName}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onDelete} autoFocus>
            <DeleteIcon />
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

  return (
    <div className="workoutListMainDiv">
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Workouts</StyledTableCell>
            <StyledTableCell align="left">Intensity</StyledTableCell>
            <StyledTableCell align="center">Favorite</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workouts.map((workout) => {
            return (
              <StyledTableRow key={workout.workoutid}>
                <StyledTableCell component="th" scope="row">
                  <Tooltip title={`View details of ${workout.name}`}>
                    <Button
                      onClick={(event) =>
                        (window.location.href = `/users/workoutdetails?workoutid=${workout.workoutid}`)
                      }
                    >
                      {workout.name}
                    </Button>
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell align="right" style={{textAlign: "left"}}>{workout.intensity}</StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title={`Toggle favorite status`}>
                    <Button
                      onClick={() =>
                        updateFavorite(workout.workoutid, workout.favorite)
                      }
                    >
                      {workout.favorite ? (
                        <StarIcon style={{ color: "gold" }} />
                      ) : (
                        <StarBorderIcon style={{ color: "grey" }} />
                      )}
                    </Button>
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => setDialogOpen(true)}>
                    <DeleteIcon />
                  </Button>
                  <DeleteDialog
                    open={isDialogOpen}
                    onClose={() => setDialogOpen(false)}
                    onDelete={() => {
                      deleteWorkout(workout.workoutid);
                      setDialogOpen(false);
                    }}
                    workoutName={workout.name}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title={`Go to edit page`}>
                    <Button
                      onClick={(event) =>
                        (window.location.href = `/users/editworkout?workoutid=${workout.workoutid}`)
                      }
                    >
                      Edit
                    </Button>
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
}

export default UserWorkouts;
