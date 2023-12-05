import React, { useState, useEffect } from 'react'
import './EditWorkout.css'
function EditWorkout () {
  const MUSCLES = [
    'abdominals',
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'traps',
    'triceps'
  ]
  const [selectedMuscle, setSelectedMuscle] = useState('abdominals')
  const handleMuscleChange = event => {
    setSelectedMuscle(event.target.value)
  }
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const handleCheckboxChange = event => {
    setSelectedDifficulty(event.target.value)
  }

  const [userid, setUserid] = useState(1)
  const [workout, setWorkout] = useState({
    userid: userid,
    name: '',
    intensity: '',
    favorite: false
  })
  const [exercises, setExercises] = useState([])
  const [newexercises, setNewExercises] = useState([])
  const [selectedExercise, setSelectedExercise] = useState()
  const handleRadioChange = event => {
    setSelectedExercise(event.target.value)
  }

  const [formData, setFormData] = useState({
    userid: userid,
    name: '',
    intensity: '',
    favorite: false
  })

  const urlSearchParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(urlSearchParams.entries())
  const workoutid = params.workoutid

  const [exerciseForm, setExerciseForm] = useState({
    workoutid: workoutid,
    exerciseid: 0,
    weight: 0,
    reps: 0,
    sets: 0
  })


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
      const data = await response.json()
      loadWorkout()
      setFormData({
        userid: userid,
        name: '',
        intensity: '',
        favorite: ''
      })
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

  const [editModeExerciseId, setEditModeExerciseId] = useState(null)
  const handleEditButtonClick = (exerciseInstanceId, exerciseId) => {
    setEditModeExerciseId(exerciseInstanceId)
    setExerciseForm(prevExerciseForm => ({
    ...prevExerciseForm,
    exerciseid: exerciseId
  }))
  }
  const handleExerciseFormChange = e => {
    const value = e.target.value
    const inputName = e.target.name

    setExerciseForm({
      ...exerciseForm,
      [inputName]: value
    })
  }

  const handleSaveButtonClick = async () => {
    const url = `http://localhost:8000/api/${workoutid}/exerciseinstance/?exerciseinstanceid=${editModeExerciseId}`
    const fetchConfig = {
      method: 'put',
      body: JSON.stringify(exerciseForm),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    console.log(exerciseForm)
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      const data = await response.json()
      loadExercises()
    }
    setEditModeExerciseId(null)
  }

  const handleSearch = async () => {
    const apiUrl = 'http://localhost:8000/api/exercises/search'
    const queryParams = new URLSearchParams({
      muscle: selectedMuscle,
      difficulty: selectedDifficulty
    })
    const urlWithParams = `${apiUrl}?${queryParams.toString()}`

    console.log(
      'Searching with difficulty:',
      selectedDifficulty,
      'and muscle:',
      selectedMuscle
    )
    const response = await fetch(urlWithParams)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      setNewExercises(data)
    }
  }

  const handleAddExercise = async event => {
    event.preventDefault()
    const url = `http://localhost:8000/api/${workoutid}/exerciseinstance/`
    const data = {}
    data.workoutid = workoutid
    data.exerciseid = selectedExercise
    data.weight = 0
    data.sets = 0
    data.reps = 0
    console.log(data)
    console.log(url)
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      loadExercises()
    }
  }

  return (
    <div className='EditWorkoutMainDiv'>
      <h1>Edit Workout</h1>
      <h2>{workout.name}</h2>
      <div className='container'>
        <div className='column'>
          <h3>Update Name & Intensity</h3>
          <div>
            <form onSubmit={handleSubmit} id='edit-workout-form'>
              <div>
                Workout Name
                <input
                  onChange={handleFormChange}
                  value={formData.name}
                  placeholder='Workout name'
                  required
                  type='text'
                  id='name'
                  name='name'
                />
              </div>
              <div>
                Intensity
                <input
                  onChange={handleFormChange}
                  value={formData.intensity}
                  placeholder='Intensity'
                  required
                  type='text'
                  id='intensity'
                  name='intensity'
                />
              </div>
              <button onClick={handleSubmit}>Save Changes</button>
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
                    {exercises.map(exercise => (
                      <tr key={exercise.exerciseinstanceid}>
                        <td>{exercise.name}</td>
                        <td>{exercise.muscle}</td>
                        <td>{exercise.difficulty}</td>
                        {editModeExerciseId === exercise.exerciseinstanceid ? (
                          <>
                            <td>
                              <input
                                onChange={handleExerciseFormChange}
                                value={exerciseForm.weight}
                                placeholder='weight'
                                type='int'
                                id='weight'
                                name='weight'
                                style={{ width: '50px' }}
                              />
                            </td>
                            <td>
                              <input
                                onChange={handleExerciseFormChange}
                                value={exerciseForm.sets}
                                placeholder='sets'
                                type='int'
                                id='sets'
                                name='sets'
                                style={{ width: '50px' }}
                              />
                            </td>
                            <td>
                              <input
                                onChange={handleExerciseFormChange}
                                value={exerciseForm.reps}
                                placeholder='reps'
                                type='int'
                                id='reps'
                                name='reps'
                                style={{ width: '50px' }}
                              />
                            </td>
                            <td>
                              <button onClick={handleSaveButtonClick}>
                                Save
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{exercise.weight}</td>
                            <td>{exercise.reps}</td>
                            <td>{exercise.sets}</td>
                            <td>
                              <button
                                onClick={() =>
                                  handleEditButtonClick(
                                    exercise.exerciseinstanceid,
                                    exercise.exerciseid
                                  )
                                }
                              >
                                Edit
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
        <div className='column'>
          <h3>Add Exercise</h3>
          <div className='container'>
            <div className='column'>
              <h4>Choose a muscle</h4>
              <select
                name='muscle'
                value={selectedMuscle}
                onChange={handleMuscleChange}
              >
                {MUSCLES.map(muscle => (
                  <option key={muscle} value={muscle}>
                    {muscle}
                  </option>
                ))}
              </select>
            </div>
            <div className='column'>
              <h4>Choose a difficulty</h4>
              <div>
                <div>
                  <label>
                    <input
                      type='checkbox'
                      name='difficulty'
                      value='beginner'
                      checked={selectedDifficulty === 'beginner'}
                      onChange={handleCheckboxChange}
                    />
                    Beginner
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type='checkbox'
                      name='difficulty'
                      value='intermediate'
                      checked={selectedDifficulty === 'intermediate'}
                      onChange={handleCheckboxChange}
                    />
                    Intermediate
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type='checkbox'
                      name='difficulty'
                      value='advanced'
                      checked={selectedDifficulty === 'advanced'}
                      onChange={handleCheckboxChange}
                    />
                    Advanced
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button onClick={handleSearch}>Search</button>
          <div>
            <h2>List of Exercises</h2>
            <ul>
              {newexercises.map(exercise => (
                <li
                  key={exercise.name}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px'
                  }}
                >
                  <label style={{ textAlign: 'left' }}>
                    <input
                      type='radio'
                      name='exercise'
                      value={exercise.exerciseid}
                      onChange={handleRadioChange}
                    />
                    {exercise.name}
                  </label>
                </li>
              ))}
            </ul>
            <button onClick={handleAddExercise}>Add Exercise</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditWorkout
