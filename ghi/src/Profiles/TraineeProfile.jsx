import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "../utils/dateutils";

function ProfileView() {
  const [userid, setUserid] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const getToken = async () => {
    try {
      const loginUrl = `http://localhost:8000/token/`;
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
    if (userid !== 0 || deleted) {
      const getListWorkout = async () => {
        const response = await fetch(
          `http://localhost:8000/${userid}/workouts`
        );
        if (response.ok) {
          const data = await response.json();
          // Sort workouts by date in ascending order
          data.workouts.sort(
            (a, b) =>
              new Date(a.workout_datetime) - new Date(b.workout_datetime)
          );
          // Limit to the first 5 workouts
          const limitedWorkouts = data.workouts.slice(0, 5);
          setWorkouts(limitedWorkouts);
        }
      };
      getListWorkout();
      setDeleted(false);
    }
  }, [userid, deleted]);

  const updateFavorite = async (workoutid, favoriteStatus) => {
    const url = `http://localhost:8000/workouts/${workoutid}/updatefavorite`;
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
    const request = `http://localhost:8000/workouts/${workoutid}`;
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

  return (
    <div className="workoutListMainDiv">
      <h1>Upcoming Workouts</h1>
      <table>
        <thead className="workoutListTHead">
          <tr>
            <th>Workouts</th>
            <th>Intensity</th>
            <th>Delete</th>
            <th>Favorite</th>
            <th>Date</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => {
            return (
              <tr key={workout.workoutid}>
                <td
                  onClick={(event) =>
                    (window.location.href = `/users/workoutdetails?workoutid=${workout.workoutid}`)
                  }
                >
                  {workout.name}
                </td>
                <td
                  onClick={(event) =>
                    (window.location.href = `/users/workoutdetails?workoutid=${workout.workoutid}`)
                  }
                >
                  {workout.intensity}
                </td>
                <td>
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
                </td>
                <td>
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
                </td>
                <td
                  onClick={(event) =>
                    (window.location.href = `/users/workoutdetails?workoutid=${workout.workoutid}`)
                  }
                >
                  {formatDate(workout.workout_datetime)}
                </td>
                <td>
                  <Button
                    onClick={(event) =>
                      (window.location.href = `/users/editworkout?workoutid=${workout.workoutid}`)
                    }
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProfileView;
