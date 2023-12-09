import React from "react";
import { NavLink } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

const publicUrl = import.meta.env.VITE_PUBLIC_URL;

function HomePage() {
  return (
    <div>
      <h1 className="page-header">Git Fit</h1>
      <div className="background">
        <Box>
          <nav>
            <List
              subheader={
                <ListSubheader component="div" id="hardcoded-workout-header">
                  Quick start workouts
                </ListSubheader>
              }
            >
              <Divider />
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={`${publicUrl}users/workoutdetails?workoutid=1`}
                >
                  <ListItemText primary="Arms" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={`${publicUrl}users/workoutdetails?workoutid=2`}
                >
                  <ListItemText primary="Chest" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={`${publicUrl}users/workoutdetails?workoutid=3`}
                >
                  <ListItemText primary="Legs & Glutes" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={`${publicUrl}users/workoutdetails?workoutid=4`}
                >
                  <ListItemText primary="Back & Shoulders" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
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
