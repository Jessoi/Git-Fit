import { useState, useEffect } from 'react'
import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { StyledTextField } from '../../styles.jsx'

function CreateWorkout () {
  const [userid, setUserid] = useState(0)
  const [workouts, setWorkouts] = useState([])
  const [formData, setFormData] = useState({
    userid: '',
    name: '',
    intensity: '',
    favorite: false,
    workout_datetime: undefined
  })
  const viteUrl = import.meta.env.VITE_REACT_APP_API_HOST
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

  useEffect(() => {
    getToken()
  }, [])

  useEffect(() => {
    if (userid != 0) {
      const getlistworkout = async () => {
        const response = await fetch(`${viteUrl}/${userid}/workouts`)
        if (response.ok) {
          const data = await response.json()
          setWorkouts(data.workouts)
        }
      }
      getlistworkout()
      changeUserid()
    }
  }, [userid])

  const handleSubmit = async event => {
    event.preventDefault()
    const url = `${viteUrl}/workouts`
    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch(url, fetchConfig)

    if (response.ok) {
      const createdWorkout = await response.json()
      const { workoutid } = createdWorkout

      window.location.href = `/trainee/editworkout?workoutid=${workoutid}`

      setFormData({
        userid: userid,
        name: '',
        intensity: '',
        favorite: '',
        workout_datetime: ''
      })
      event.target.reset()
    }
  }

  const changeUserid = async () => {
    setFormData(prevFormData => {
      return { ...prevFormData, userid: userid }
    })
  }

  const handleFormChange = e => {
    const value = e.target.value
    const inputName = e.target.name

    setFormData({
      ...formData,
      [inputName]: value
    })
  }

  return (
    <div>
      <h1>Create Workout</h1>
      <Box
        component='form'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <StyledTextField
          onChange={handleFormChange}
          value={formData.name}
          label='Workout name'
          required
          type='text'
          id='name'
          name='name'
        />
        <StyledTextField
          className='inputForDark'
          onChange={handleFormChange}
          value={formData.intensity}
          label='Intensity'
          required
          type='text'
          id='intensity'
          name='intensity'
        />
        <StyledTextField
          onChange={handleFormChange}
          value={formData.workout_datetime}
          placeholder='Date'
          type='datetime-local'
          id='workout_datetime'
          name='workout_datetime'
        />
        <Button
          style={{ backgroundColor: 'orange', color: 'white', width: '28ch' }}
          variant='contained'
          type='submit'
        >
          Create workout
        </Button>
      </Box>
    </div>
  )
}

export default CreateWorkout
