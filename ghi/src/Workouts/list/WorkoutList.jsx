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
import { formatDate } from "../../utils/dateutils";

function UserWorkouts() {
  const [userid, setUserid] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const viteUrl = import.meta.env.VITE_REACT_APP_API_HOST
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
        const response = await fetch(
          `${viteUrl}/${userid}/workouts`
        );
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

  return (
    <div className="workoutListMainDiv">
      <table>
        <thead className="workoutListTHead">
          <tr>
            <th>Workouts</th>
            <th>Intensity</th>
            <th>Favorite</th>
            <th>Delete</th>
            <th></th>
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
                <td
                  onClick={(event) =>
                    (window.location.href = `/users/workoutdetails?workoutid=${workout.workoutid}`)
                  }
                >
                  {formatDate(workout.workout_datetime)}
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

export default UserWorkouts;
