import React from "react";
import { NavLink, Link } from "react-router-dom";
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
                  component={Link} to={`users/workoutdetails?workoutid=1`}
                >
                  <ListItemText primary="Arms" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link} to={`users/workoutdetails?workoutid=2`}
                >
                  <ListItemText primary="Chest" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link} to={`users/workoutdetails?workoutid=3`}
                >
                  <ListItemText primary="Legs & Glutes" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link} to={`users/workoutdetails?workoutid=4`}
                >
                  <ListItemText primary="Back & Shoulders" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </div>
      <footer>
    placeholder
      </footer>
    </div>
  );
}

export default HomePage;
