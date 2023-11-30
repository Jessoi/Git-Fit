import React, { useState, useEffect } from 'react'

function EditWorkout () {
  const [userid, setUserid] = useState(1)
  const [workout, setWorkout] = useState({
    userid: userid,
    name: '',
    intensity: '',
    favorite: false
  })
  const [exercises, setExercises] = useState([])
  const [formData, setFormData] = useState({
    userid: userid,
    name: '',
    intensity: '',
    favorite: false
  })
  const [exerciseForm, setExerciseForm] = useState({
  })

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

  const handleSubmit = async event => {
    event.preventDefault()
    const url = `http://localhost:8000/workouts/${workoutid}`
    const fetchConfig = {
      method: 'put',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(url, fetchConfig)

    if (response.ok) {
      setFormData({
        userid: userid,
        name: '',
        intensity: '',
        favorite: ''
      })
      event.target.reset()
    }
  }

  useEffect(() => {
    loadWorkout()
    loadExercises()
  }, [])

  const handleFormChange = e => {
    const value = e.target.value
    const inputName = e.target.name

    setFormData({
      ...formData,
      [inputName]: value
    })
  }

  return (
    <div className='EditWorkoutMainDiv'>
      <h1>Update Workout</h1>
      <h3>Update Name & Intensity</h3>
      <form onSubmit={handleSubmit} id='edit-workout-form'>
        <input
          onChange={handleFormChange}
          value={formData.name}
          placeholder='Workout name'
          required
          type='text'
          id='name'
          name='name'
        ></input>
        <input
          onChange={handleFormChange}
          value={formData.intensity}
          placeholder='Intensity'
          required
          type='text'
          id='intensity'
          name='intensity'
        />
        <button>Update fields</button>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Muscle</th>
                <th>Difficulty</th>
                <th>Weight</th>
                <th>Reps</th>
                <th>Sets</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map(exercise => {
                return (
                  <tr key={exercise.exerciseinstanceid}>
                    <td>{exercise.name}</td>
                    <td>{exercise.muscle}</td>
                    <td>{exercise.difficulty}</td>
                    <td>{exercise.weight}</td>
                    <td>{exercise.reps}</td>
                    <td>{exercise.sets}</td>
                    {/* <td>
                      <input
                        onChange={handleFormChange}
                        value={exercise.weight}
                        placeholder='weight'
                        type='int'
                        id='weight'
                        name='weight'
                      />
                    </td>
                    <td>
                      <input
                        onChange={handleFormChange}
                        value={exercise.sets}
                        placeholder='sets'
                        type='int'
                        id='sets'
                        name='sets'
                      />
                    </td>
                    <td>
                      <input
                        onChange={handleFormChange}
                        value={exercise.reps}
                        placeholder='reps'
                        type='int'
                        id='reps'
                        name='reps'
                      />
                    </td> */}
                    <td>
                      <button>Edit</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  )
}
export default EditWorkout
