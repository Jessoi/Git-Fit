import React, { useState, useEffect } from 'react'
import './EditWorkout.css'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Input,
  Box,
  InputLabel,
  Checkbox,
  Select,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress
} from '@mui/material'
import {
  DarkBackgroundBox,
  DarkBackgroundSelect,
  DarkInput,
  DarkInputLabel,
  StyledTableCell,
  StyledTableRow,
  OrangeTextButton
} from '../../styles.jsx'

const viteUrl = import.meta.env.VITE_REACT_APP_API_HOST

function EditWorkout () {
  const [userid, setUserid] = useState(0)
  const getToken = async () => {
    try {
      const loginUrl = `${viteUrl}/token/`
      const fetchConfig = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include'
      }

      const response = await fetch(loginUrl, fetchConfig)
      const data = await response.json()
      setUserid(data.user.userid)
    } catch (error) {
      console.error(error)
      return null
    }
  }
  //Used for Search/Add Exercise Functions
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
  const [exercises, setExercises] = useState([])
  const [newexercises, setNewExercises] = useState([])
  const [selectedExercise, setSelectedExercise] = useState()
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)

  const handleMuscleChange = event => {
    setSelectedMuscle(event.target.value)
  }

  const handleCheckboxChange = event => {
    setSelectedDifficulty(event.target.value)
  }

  const handleRadioChange = event => {
    setSelectedExercise(event.target.value)
  }

  const handleSearch = async () => {
    const apiUrl = `${viteUrl}/api/exercises/search`
    const queryParams = new URLSearchParams({
      muscle: selectedMuscle,
      difficulty: selectedDifficulty
    })
    const urlWithParams = `${apiUrl}?${queryParams.toString()}`

    const response = await fetch(urlWithParams)
    if (response.ok) {
      const data = await response.json()
      setNewExercises(data)
    }
  }

  const handleAddExercise = async event => {
    event.preventDefault()
    const url = `${viteUrl}/api/${workoutid}/exerciseinstance/`
    const data = {}
    data.workoutid = workoutid
    data.exerciseid = selectedExercise
    data.weight = 0
    data.sets = 0
    data.reps = 0
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
      loadExercises()
    }
  }

  const [workout, setWorkout] = useState({
    userid: '',
    name: '',
    intensity: '',
    favorite: false,
    workout_datetime: ''
  })

  //Used for Muscle Information LLM
  const [muscleInfo, setMuscleInfo] = useState()
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getMuscleInfo = async () => {
    const apiUrl = `${viteUrl}/api/muscles/search`
    const queryParams = new URLSearchParams({
      muscle: selectedMuscle
    })
    const urlWithParams = `${apiUrl}?${queryParams.toString()}`

    try {
      const response = await fetch(urlWithParams)
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setMuscleInfo(data)
      } else {
        console.error('Failed to fetch muscle information')
      }
    } catch (error) {
      console.error(
        'An error occurred while fetching muscle information',
        error
      )
    }
  }

  const handleInfoButtonClick = async () => {
    setIsLoading(true)
    console.log('Before fetching muscle information')

    try {
      await getMuscleInfo()
    } catch (error) {
      console.error('Error fetching muscle information', error)
    }

    console.log('After fetching muscle information')
    setIsLoading(false)
    setIsInfoDialogOpen(true)
  }

  const [formData, setFormData] = useState({
    userid: '',
    name: '',
    intensity: '',
    favorite: false,
    workout_datetime: ''
  })

  //Pulls workoutid from URL determined on prior list view
  const urlSearchParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(urlSearchParams.entries())
  const workoutid = params.workoutid

  async function loadWorkout () {
    const response = await fetch(`${viteUrl}/workouts/${workoutid}`)
    if (response.ok) {
      const data = await response.json()
      setWorkout(data)
      setFormData(data)
    }
  }

  async function loadExercises () {
    const response = await fetch(
      `${viteUrl}/api/${workoutid}/exerciseinstances/`
    )
    if (response.ok) {
      const data = await response.json()
      setExercises(data.instances)
    }
  }

  //For editing/saving existing exercises in a workout
  const [exerciseForm, setExerciseForm] = useState({
    workoutid: workoutid,
    exerciseid: 0,
    weight: 0,
    reps: 0,
    sets: 0
  })
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
    const url = `${viteUrl}/api/${workoutid}/exerciseinstance/?exerciseinstanceid=${editModeExerciseId}`
    const fetchConfig = {
      method: 'put',
      body: JSON.stringify(exerciseForm),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(url, fetchConfig)
    if (response.ok) {
      const data = await response.json()
      loadExercises()
    }
    setEditModeExerciseId(undefined)
  }

  //Used for workout detail change
  const handleFormChange = e => {
    const value = e.target.value
    const inputName = e.target.name

    setFormData({
      ...formData,
      [inputName]: value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const url = `${viteUrl}/workouts/${workoutid}`
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
        userid: '',
        name: '',
        intensity: '',
        favorite: '',
        workout_datetime: ''
      })
    }
  }

  useEffect(() => {
    getToken()
    loadWorkout()
    loadExercises()
  }, [])

  return (
    <div className='EditWorkoutMainDiv'>
      <h1>Edit Workout</h1>
      <h2>{workout.name}</h2>
      <div className='container'>
        <div className='column'>
          <h3>Update Name & Intensity</h3>
          <div>
            <form onSubmit={handleSubmit} id='edit-workout-form'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <DarkInputLabel style={{ marginRight: '10px' }}>
                  Workout Name
                </DarkInputLabel>
                <DarkInput
                  onChange={handleFormChange}
                  value={formData.name}
                  placeholder='Workout name'
                  required
                  type='text'
                  id='name'
                  name='name'
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <DarkInputLabel style={{ marginRight: '10px' }}>
                  Intensity
                </DarkInputLabel>
                <DarkInput
                  onChange={handleFormChange}
                  value={formData.intensity}
                  placeholder='Intensity'
                  required
                  type='text'
                  id='intensity'
                  name='intensity'
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <DarkInputLabel style={{ marginRight: '10px' }}>
                  Scheduled Date
                </DarkInputLabel>
                <DarkInput
                  onChange={handleFormChange}
                  value={formData.workout_datetime}
                  placeholder='Date'
                  required
                  type='datetime-local'
                  id='workout_datetime'
                  name='workout_datetime'
                />
              </div>
              <OrangeTextButton onClick={handleSubmit}>
                Save Changes
              </OrangeTextButton>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Muscle</StyledTableCell>
                      <StyledTableCell>Difficulty</StyledTableCell>
                      <StyledTableCell>Weight</StyledTableCell>
                      <StyledTableCell>Reps</StyledTableCell>
                      <StyledTableCell>Sets</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {exercises.map(exercise => (
                      <StyledTableRow key={exercise.exerciseinstanceid}>
                        <StyledTableCell>{exercise.name}</StyledTableCell>
                        <StyledTableCell>{exercise.muscle}</StyledTableCell>
                        <StyledTableCell>{exercise.difficulty}</StyledTableCell>
                        {editModeExerciseId === exercise.exerciseinstanceid ? (
                          <>
                            <StyledTableCell>
                              <Input
                                onChange={handleExerciseFormChange}
                                value={exerciseForm.weight}
                                placeholder='weight'
                                type='int'
                                id='weight'
                                name='weight'
                                style={{ width: '50px' }}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <Input
                                onChange={handleExerciseFormChange}
                                value={exerciseForm.sets}
                                placeholder='sets'
                                type='int'
                                id='sets'
                                name='sets'
                                style={{ width: '50px' }}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <Input
                                onChange={handleExerciseFormChange}
                                value={exerciseForm.reps}
                                placeholder='reps'
                                type='int'
                                id='reps'
                                name='reps'
                                style={{ width: '50px' }}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <OrangeTextButton onClick={handleSaveButtonClick}>
                                Save
                              </OrangeTextButton>
                            </StyledTableCell>
                          </>
                        ) : (
                          <>
                            <StyledTableCell>{exercise.weight}</StyledTableCell>
                            <StyledTableCell>{exercise.reps}</StyledTableCell>
                            <StyledTableCell>{exercise.sets}</StyledTableCell>
                            <StyledTableCell>
                              <OrangeTextButton
                                onClick={() =>
                                  handleEditButtonClick(
                                    exercise.exerciseinstanceid,
                                    exercise.exerciseid
                                  )
                                }
                              >
                                Edit
                              </OrangeTextButton>
                            </StyledTableCell>
                          </>
                        )}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </form>
          </div>
        </div>
        <div className='column'>
          <h2>Add Exercise</h2>
          <DarkBackgroundBox className='container'>
            <DarkBackgroundBox
              component={Paper}
              className='column'
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <h3>Pick a muscle</h3>
              <DarkBackgroundSelect
                name='muscle'
                value={selectedMuscle}
                onChange={handleMuscleChange}
                style={{ width: '80%' }}
              >
                {MUSCLES.map(muscle => (
                  <MenuItem key={muscle} value={muscle}>
                    {muscle}
                  </MenuItem>
                ))}
              </DarkBackgroundSelect>
              <OrangeTextButton onClick={handleInfoButtonClick}>
                Info
              </OrangeTextButton>

              {/* Render the loading icon */}
              {isLoading && (
                <CircularProgress
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    color: 'orange'
                  }}
                />
              )}

              {/* Render the dialog */}
              <Dialog
                open={isInfoDialogOpen}
                onClose={() => setIsInfoDialogOpen(false)}
                fullWidth
                maxWidth='sm'
              >
                <DialogTitle>Muscle Info</DialogTitle>
                <DialogContent>
                  {muscleInfo ? (
                    <div>
                      <p>Name: {muscleInfo[0].name}</p>
                      <p>Description: {muscleInfo[0].description}</p>
                      {/* You can add other information about the muscle here */}
                    </div>
                  ) : (
                    <p>Loading muscle information...</p>
                  )}
                </DialogContent>
              </Dialog>
            </DarkBackgroundBox>
            <DarkBackgroundBox component={Paper} className='column'>
              <h3>Choose a difficulty</h3>
              <div>
                <div>
                  <DarkInputLabel>
                    <Checkbox
                      name='difficulty'
                      value='beginner'
                      checked={selectedDifficulty === 'beginner'}
                      onChange={handleCheckboxChange}
                    />
                    Beginner
                  </DarkInputLabel>
                </div>
                <div>
                  <DarkInputLabel style={{ marginBottom: '0px' }}>
                    <Checkbox
                      name='difficulty'
                      value='intermediate'
                      checked={selectedDifficulty === 'intermediate'}
                      onChange={handleCheckboxChange}
                    />
                    Intermediate
                  </DarkInputLabel>
                </div>
                <div>
                  <DarkInputLabel>
                    <Checkbox
                      name='difficulty'
                      value='advanced'
                      checked={selectedDifficulty === 'advanced'}
                      onChange={handleCheckboxChange}
                    />
                    Advanced
                  </DarkInputLabel>
                </div>
              </div>
            </DarkBackgroundBox>
          </DarkBackgroundBox>
          <OrangeTextButton onClick={handleSearch}>Search</OrangeTextButton>
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
                    padding: '6px'
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
            <OrangeTextButton onClick={handleAddExercise}>
              Add Exercise
            </OrangeTextButton>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditWorkout
