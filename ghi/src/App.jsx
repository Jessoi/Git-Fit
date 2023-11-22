import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './HomePage'
import Nav from './Nav'
import TraineeForm from './Profiles/TraineeForm'
import LoginForm from './Profiles/LoginForm'
import ProfileView from './Profiles/TraineeProfile'
import CreateWorkout from './Workouts/CreateWorkout'
import UserWorkouts from './Workouts/WorkoutList'
import EditWorkout from './Workouts/EditWorkout'

function App() {
  return (
    <>
      <BrowserRouter>
      <Nav />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="trainee">
              <Route path="" element={<ProfileView/>} />
              <Route path="signup" element={<TraineeForm/>} />
              <Route path="login" element={<LoginForm/>} />
              <Route path="createworkout" element={<CreateWorkout/>} />
              <Route path="userworkouts" element={<UserWorkouts/>} />
              <Route path="editworkout" element={<EditWorkout/>} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
