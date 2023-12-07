from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import workouts, exercise_instance
import os
from authenticator import authenticator

from routers import users
from routers import exercises

app = FastAPI()
app.include_router(workouts.router)

url = "https://baby-boys.gitlab.io" # noqa
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", url), "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, tags=["AUTH"])
app.include_router(authenticator.router, tags=["AUTH"])
app.include_router(exercises.router, tags=["Exercises"])
app.include_router(exercise_instance.router, tags=["Exercise_instance"])


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }


@app.get("/")
def root():
    return {"message": "You hit the root path! Jesse"}
