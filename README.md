# Baby Boys - Git Fit
Team:
  - Jesse Zhang
  - Boris Veits
  - Preston Ford
  - Daniel Glasgow
  - Matt Verbit

## Design

- [API design](docs/api_endpoints.MD)
- [Data model](docs/data_model.md)
- [GHI](https://excalidraw.com/#room=b1e6acc6189e988c043c,CLWdsG9Y6lfsYJqUkt0BWQ)
- [Integrations](docs/integrations.md)


## Intended market

This app serves as a platform for individuals needing a platform to create and schedule workout plans, as well as discover new exercises while building their own personal workout.

## Functionality

- If a user is not logged in, they will see a coupld of prebuilt exercises that they can view the details of.
- If the user is inclined, they may create an account, which will lead them to a profile view where they can see any scheduled workouts.
- If the user is logged in, they can edit their profile information, change their user information.
- If the user is logged in, they will be able to create a workout and schedule it. This will then be viewable under their personal workout list.
- From ther workout list view, a user will be able to favorite, edit, delete, or view more detailed information about their workout.
- When a user edits their workout, they will be able to search a list of exercises by muscle name and exercise difficulty. They will then be able to select, and add them to their workout plan. After an exercise is added to the workout plan, they will be able to edit weight, sets, and reps of an exercise.

# Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Git clone into your local repository: git clone (repo)
2. Change directory: cd git-fit
3. Create volumes: docker volume create pg-admin & docker volume create postrgres-data
4. Create a .env file at the root directory of the project then copy and paste the lines below into the file

```
VITE_REACT_APP_API_HOST=http://localhost:8000
VITE_PUBLIC_URL=http://localhost:5173
API_KEY=topsecret
```

5. [Get an api key here](https://rapidapi.com/apininjas/api/exercises-by-api-ninjas) and replace the ```topsecret``` with the your personal key
6. Run the containers: docker compose up
7. Open browser to localhost:5173
