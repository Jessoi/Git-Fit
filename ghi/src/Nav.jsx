import React from 'react';
import { NavLink } from 'react-router-dom';

import LogoutButton from './Profiles/LogoutButton';

function Nav() {


  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/000/841/041/datas/gallery.jpg" width="30" height="24" alt="Logo" />
        </a>
        <NavLink className="navbar-brand" to="/">Git Fit</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav" style={{ flexWrap: "wrap" }}>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/trainee/signup">Sign Up</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/trainee/login">Log In</NavLink>
            </li>
            <li className="nav-item">
              <LogoutButton />
            </li>
            <li className='nav-item'>
              <NavLink className="nav-link" aria-current="page" to="/trainee/change-password">Change Password</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/trainee">Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/trainee/createworkout">Create Workout</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/trainee/userworkouts">User Workouts</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/trainee/editworkout">Edit Workouts</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
