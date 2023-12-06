import React from "react";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1 className="page-header">Git Fit</h1>
      <div className="background">
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody></tbody>
        </table>
        <NavLink to="http://localhost:5173/trainee/signup">Sign up</NavLink>
        <Navlink to="http://localhost:5173/trainee/login">login</Navlink>
      </div>
      <footer>
        <p className="regtext">
          Welcome to GitFit, your comprehensive fitness companion designed to
          track progress, create customized workouts, and help you maintain a
          consistent schedule. GitFit goes beyond conventional services,
          offering a personalized approach to guide you towards a healthier and
          more resilient version of yourself. Track your fitness journey
          effortlessly with GitFit. From calories burned and distance covered to
          heart rate and sleep patterns, our intuitive platform provides
          meaningful insights, keeping you motivated throughout your
          transformation. Say goodbye to generic workouts. GitFit empowers you
          to craft personalized exercise routines based on your fitness level,
          preferences, and goals. Whether you prefer high-intensity interval
          training, yoga, or strength workouts, GitFit adapts to your unique
          needs. Consistency is key to success, and GitFit ensures you stay on
          track. Use our scheduling feature to plan workouts and set achievable
          milestones, seamlessly integrating your fitness routine into your
          daily life.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
