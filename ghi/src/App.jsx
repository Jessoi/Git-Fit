import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import Nav from "./Nav";
import SignupForm from "./Profiles/SignupForm";
import LoginForm from "./Profiles/LoginForm";
import ProfileView from "./Profiles/TraineeProfile";
import CreateWorkout from "./Workouts/create/CreateWorkout";
import UserWorkouts from "./Workouts/list/WorkoutList";
import EditWorkout from "./Workouts/edit/EditWorkout";
import WorkoutDetail from "./Workouts/detail/WorkoutDetail";
import LogoutButton from "./Profiles/LogoutButton";
import ChangePasswordForm from "./Profiles/ChangePasswordForm";
import EditProfileForm from "./Profiles/EditProfileForm";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import ProtectedRoute from "./protectedRoute";

const tokenUrl = import.meta.env.VITE_REACT_APP_API_HOST;
if (!tokenUrl) {
  throw new Error("VITE_REACT_APP_API_HOST was undefined.");
}

function App() {
  const domain = /https?:\/\/[^/]+/;
  const basename = import.meta.env.VITE_PUBLIC_URL.replace(domain, "");

 return (
    <>
      <BrowserRouter basename={basename}>
        <AuthProvider baseUrl={tokenUrl}>
          <Nav />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="trainee/login" element={<LoginForm />} />
            <Route path="trainee/signup" element={<SignupForm />} />
            <Route
                path="trainee/workoutdetails"
                element={<WorkoutDetail />}
              />
            {/* Private Routes wrapped in ProtectedRoute */}
            <Route path="/trainee" element={<ProtectedRoute />}>
              <Route path="" element={<ProfileView />} />
              <Route
                path="change-password"
                element={<ChangePasswordForm />}
              />
              <Route
                path="edit-profile"
                element={<EditProfileForm />}
              />
              <Route path="logout" element={<LogoutButton />} />
              <Route path="createworkout" element={<CreateWorkout />} />
              <Route path="workouts" element={<UserWorkouts />} />
              <Route path="editworkout" element={<EditWorkout />} />

            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
