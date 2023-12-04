import React, {useState, useEffect} from 'react';
import './WorkoutDetail.css'
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



function WorkoutDetail() {
    const [userid, setUserid] = useState(1)
    // const [workout, setWorkout] = useState(1)
    const [workout, setWorkout] = useState({
    userid: userid,
    name: '',
    intensity: '',
    favorite: false
    })

    const [exercises, setExercises] = useState([])


    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())
    const workoutid = params.workoutid

  async function loadWorkout () {
    const response = await fetch(`http://localhost:8000/workouts/${workoutid}`)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      setWorkout(data)
      setFormData(data)
    }
  }
  console.log("workoutid", workoutid)
  console.log("workout", workout)
  async function loadExercises () {
    const response = await fetch(
      `http://localhost:8000/api/${workoutid}/exerciseinstances/`
    )
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      setExercises(data.instances)
    }
  }

  console.log("exercises", exercises)
    useEffect(() => {
    loadWorkout()
    loadExercises()
  }, [])


    console.log("workoutid after useEffect", workoutid)
    console.log("workout after useEffect", workout)
    console.log("exercises after useEffect", exercises)

    return (
        <div>
            <h1 className='title'>{workout.name}</h1>
            <h3>Exercises</h3>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                    <tbody>
                        {exercises.map(exercise => {
                            return(
                            <tr key={exercise.exerciseinstanceid}>
                            <td>{exercise.name}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default WorkoutDetail;
