import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './HomePage'
import Nav from './Nav'
import TraineeForm from './Profiles/TraineeForm'
import LoginForm from './Profiles/LoginForm'
import ProfileView from './Profiles/TraineeProfile'
import CreateWorkout from './Workouts/create/CreateWorkout'
import UserWorkouts from './Workouts/list/WorkoutList'
import EditWorkout from './Workouts/edit/EditWorkout'
import WorkoutDetail from './Workouts/detail/WorkoutDetail'

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
              </Route>
            <Route path="users">
              <Route path="createworkout" element={<CreateWorkout/>} />
              <Route path="workouts" element={<UserWorkouts/>} />
              <Route path="editworkout" element={<EditWorkout/>} />
              <Route path="workoutdetails" element={<WorkoutDetail/>} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
