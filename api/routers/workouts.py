from fastapi import APIRouter, Depends
from typing import Optional
from queries.workouts import (
    WorkoutIn,
    WorkoutOut,
    WorkoutRepository,
    ListWorkoutOut,
    FavoriteIn,
)

router = APIRouter()


@router.get("/workouts/{userid}", response_model=ListWorkoutOut)
async def get_all_workouts(
    userid: int,
    repo: WorkoutRepository = Depends(),
):
    return repo.list_user_workouts(userid)


@router.post("/workouts", response_model=WorkoutOut)
def create_workout(workout: WorkoutIn, repo: WorkoutRepository = Depends()):
    result = repo.create_workout(workout)
    return result


@router.put("/workouts/{workoutid}", response_model=WorkoutOut)
async def update_workout(
    workoutid: int,
    workout: WorkoutIn,
    repo: WorkoutRepository = Depends(),
):
    return repo.update_workout(workoutid, workout)


@router.delete("/workouts/{workoutid}", response_model=bool)
def delete_workout(
    workoutid: int,
    repo: WorkoutRepository = Depends(),
) -> bool:
    return repo.delete_workout(workoutid)


@router.get("/workouts/{workoutid}", response_model=WorkoutOut)
async def get_one_workout(
    workoutid: int,
    repo: WorkoutRepository = Depends(),
) -> WorkoutOut:
    return repo.get_one_workout(workoutid)


@router.put("/workouts/{workoutid}/updatefavorite", response_model=WorkoutOut)
async def update_favorite(
    workoutid: int,
    favorite: FavoriteIn,
    repo: WorkoutRepository = Depends(),
):
    return repo.update_favorite(workoutid, favorite)
