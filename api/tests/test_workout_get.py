from unittest import TestCase
from pydantic import BaseModel
from queries.workouts import WorkoutOut


class WorkoutIn(BaseModel):
    userid: int
    name: str
    intensity: str
    favorite: bool


# class WorkoutOut(BaseModel):
#     workoutid: int
#     userid: int
#     name: str
#     intensity: str
#     favorite: bool


class ListWorkoutOut(BaseModel):
    workouts: list[WorkoutOut]


class FavoriteIn(BaseModel):
    favorite: bool


def fake_get_userworkouts():
    return WorkoutOut(
        workoutid=1,
        userid=1,
        name="legs and glutes",
        intensity="High",
        favorite=False,
    )

def test_get_userworkouts():
    #Arrange


    #act

    #cleanup

    #assert
