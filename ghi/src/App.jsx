import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './HomePage'
import Nav from './Nav'
import SignupForm from './Profiles/SignupForm'
import LoginForm from './Profiles/LoginForm'
import ProfileView from './Profiles/TraineeProfile'
import CreateWorkout from './Workouts/CreateWorkout'
import UserWorkouts from './Workouts/WorkoutList'
import EditWorkout from './Workouts/EditWorkout'
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react'


const tokenUrl = import.meta.env.VITE_REACT_APP_API_HOST;
if (!tokenUrl) {
  throw new Error("VITE_REACT_APP_API_HOST was undefined.");
}


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider baseUrl={tokenUrl}>
          <Nav />
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="trainee">
                <Route path="" element={<ProfileView/>} />
                <Route path="signup" element={<SignupForm/>} />
                <Route path="login" element={<LoginForm/>} />
                <Route path="trainee" element={<ProfileView/>} />
                <Route path="createworkout" element={<CreateWorkout/>} />
                <Route path="userworkouts" element={<UserWorkouts/>} />
                <Route path="editworkout" element={<EditWorkout/>} />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
