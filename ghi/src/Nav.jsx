import { NavLink } from 'react-router-dom';

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
            <li className="nava">
              <NavLink className="nava" to="/trainee/createworkout">Create Workout</NavLink>
            </li>
            <li className="nava">
              <NavLink className="nava" to="/trainee/userworkouts">User Workouts</NavLink>
            </li>
            <li className="nava">
              <NavLink className="nava" to="/trainee/editworkout">Edit Workouts</NavLink>
            </li>
            <li className="nava">
              <NavLink className="nava" to="/trainee/workouts">Workouts</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
