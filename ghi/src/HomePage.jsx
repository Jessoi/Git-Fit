import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import "./HomePage.css";

const publicUrl = import.meta.env.VITE_PUBLIC_URL;

function HomePage() {
  return (
    <div>
      <h1 className="page-header">Welcome to Git - Fit</h1>
      <div className="background-container">
        <Grid container spacing={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              minHeight: "100px",
              p: 20,
              m: 1,
            }}
          >
            <Grid item xs={12} sm={6}>
              <Box className="blurb-container">
                <Typography variant="body1" className="blurb-text">
                  <span className="inlineContent">
                    Welcome to Git - Fit, the next push in your fitness journey.
                    Our trainees can quickly create and schedule workouts, no
                    merge conflicts with your busy life. It's time to achieve
                    your fitness goals and Git - Fit!
                  </span>
                </Typography>
              </Box>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                marginLeft: "auto",
              }}
            >
              <nav>
                <List
                  subheader={
                    <ListSubheader component="h2" id="hardcoded-workout-header">
                      <Typography
                        variant="button"
                        display="block"
                        sx={{ fontWeight: "bold", fontSize: "1.0rem" }}
                      >
                        Quick start workouts
                      </Typography>
                    </ListSubheader>
                  }
                  sx={{ maxHeight: "300px", padding: "71px", width: "400px" }}
                >
                  <Divider />
                  <ListItem disablePadding className="list-item-overlay">
                    <ListItemButton
                      component={Link}
                      to={`trainee/workoutdetails?workoutid=1`}
                    >
                      <ListItemText primary="Arms" className="list-item-text" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding className="list-item-overlay">
                    <ListItemButton
                      component={Link}
                      to={`trainee/workoutdetails?workoutid=2`}
                    >
                      <ListItemText primary="Chest" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding className="list-item-overlay">
                    <ListItemButton
                      component={Link}
                      to={`trainee/workoutdetails?workoutid=3`}
                    >
                      <ListItemText primary="Legs & Glutes" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding className="list-item-overlay">
                    <ListItemButton
                      component={Link}
                      to={`trainee/workoutdetails?workoutid=4`}
                    >
                      <ListItemText className="list-item-text">
                        <span className="text-overlay">Back & Shoulders</span>
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </List>
              </nav>
              <Box mt={3}>
                <Button
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: 'orange', color: 'white' }}
                  component={Link}
                  to="/api/users/"
                >
                  Want to make your own? Sign up now!
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </div>
    </div>
  );
}

export default HomePage;