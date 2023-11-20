from fastapi import APIRouter, Depends
from typing import Optional
from queries.workouts import (
    WorkoutIn,
    WorkoutOut,
    WorkoutRepository,
    ListWorkoutOut,
)

router = APIRouter()


@router.get("/{userid}/workouts", response_model=ListWorkoutOut)
async def get_all_workouts(
    userid: int,
    repo: WorkoutRepository = Depends(),
):
    return repo.list_user_workouts(userid)


@router.post("/{userid}/workouts", response_model=WorkoutOut)
def create_workout(workout: WorkoutIn, repo: WorkoutRepository = Depends()):
    result = repo.create_workout(workout)
    return result


@router.put("/{userid}/workouts/{workoutid}", response_model=WorkoutOut)
async def update_workout(
    workoutid: int,
    workout: WorkoutIn,
    repo: WorkoutRepository = Depends(),
):
    return repo.update_workout(workoutid, workout)


@router.delete("/{userid}/workouts/{workoutid}", response_model=bool)
def delete_workout(
    workoutid: int,
    repo: WorkoutRepository = Depends(),
) -> bool:
    return repo.delete_workout(workoutid)


@router.get("/{userid}/workouts/{workoutid}")
async def get_one_workout(
    workoutid: int,
    repo: WorkoutRepository = Depends(),
) -> WorkoutOut:
    return repo.get_one_workout(workoutid)
