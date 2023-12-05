import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function CreateWorkout() {
  const [userid, setUserid] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState({
    userid: "",
    name: "",
    intensity: "",
    favorite: false,
  });

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
    getlistworkout();
    changeUserid();
  }, [userid]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:8000/workouts`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      const createdWorkout = await response.json();
      const { workoutid } = createdWorkout;

      window.location.href = `/users/editworkout?workoutid=${workoutid}`;

      setFormData({
        userid: userid,
        name: "",
        intensity: "",
        favorite: "",
      });
      event.target.reset();
    }
    console.log(formData);
  };

  const changeUserid = async () => {
    setFormData((prevFormData) => {
      return { ...prevFormData, userid: userid };
    });
  };

  const getlistworkout = async () => {
    const response = await fetch(`http://localhost:8000/${userid}/workouts`);
    if (response.ok) {
      const data = await response.json();
      setWorkouts(data.workouts);
    }
  };

  useEffect(() => {
    getlistworkout();
    getToken();
  }, []);

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <div>
      <h1>Create Workout</h1>
      <form onSubmit={handleSubmit} id="create-workout-form">
        <input
          onChange={handleFormChange}
          value={formData.name}
          placeholder="Workout name"
          required
          type="text"
          id="name"
          name="name"
        />
        <input
          onChange={handleFormChange}
          value={formData.intensity}
          placeholder="Intensity"
          required
          type="text"
          id="intensity"
          name="intensity"
        />
        <button type="submit">Create workout</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Existing Workouts</th>
            <th>Intensity</th>
          </tr>
        </thead>
        <tbody>
          {workouts ? (
            workouts.map((workout) => {
              return (
                <tr key={workout.workoutid}>
                  <td>{workout.name}</td>
                  <td>{workout.intensity}</td>
                  <td>{workout.favorite}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No Workouts</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CreateWorkout;
