import { useState, useEffect } from "react";

function CreateWorkout() {
  const [userid, setUserid] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState({
    userid: "",
    name: "",
    intensity: "",
    favorite: false,
    workout_datetime: null,
    workout_datetime: null,
  });
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
    if (userid != 0) {
      const getlistworkout = async () => {
        const response = await fetch(`${viteUrl}/${userid}/workouts`);
        if (response.ok) {
          const data = await response.json();
          setWorkouts(data.workouts);
        }
      };
      getlistworkout();
      changeUserid();
    }
  }, [userid]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${viteUrl}/workouts`;
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
        workout_datetime: "",
        workout_datetime: "",
      });
      event.target.reset();
    }
  };

  const changeUserid = async () => {
    setFormData((prevFormData) => {
      return { ...prevFormData, userid: userid };
    });
  };

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
        <input
          onChange={handleFormChange}
          value={formData.workout_datetime}
          placeholder="Date"
          type="datetime-local"
          id="workout_datetime"
          name="workout_datetime"
        />
        <button type="submit">Create workout</button>
      </form>
    </div>
  );
}

export default CreateWorkout;
