import React from 'react';
import { NavLink } from 'react-router-dom';

import LogoutButton from './Profiles/LogoutButton';

function Nav() {


  return (
    <nav>
      <div className="nav">
        <NavLink className="site-title" to="/">Git Fit</NavLink>
        <div className="nav">
          <ul className="navul">
             <li className="nava">
              <NavLink className="nava" to="/">Home</NavLink>
            </li>
            <li className="nava">
              <NavLink className="nava" to="/trainee/signup">Sign Up</NavLink>
            </li>
            <li className="nava">
              <NavLink className="nava" to="/trainee/login">Log In</NavLink>
            </li>
            <li className="nava">
              <NavLink className="nava" to="/trainee">Profile</NavLink>
            </li>
            <li className="nav-item">
              <LogoutButton />
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" aria-current="page" to="/trainee/change-password">Change Password</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" aria-current="page" to="/trainee/edit-profile">Edit Profile</NavLink>
            </li>
            <li className="nava">
              <NavLink className="nava" to="/users/createworkout">Create Workout</NavLink>
            </li>
            <li className="nava">
              <NavLink className="nava" to="/users/workouts">User Workouts</NavLink>
            </li>
            <li className="nava">
              <NavLink className="nava" to="/users/editworkout">Edit Workouts</NavLink>
            </li>
            <li className="nava">
              <NavLink className="nava" to="/users/workoutdetails">Workouts</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
