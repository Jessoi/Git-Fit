from fastapi import APIRouter, Depends, HTTPException, status
from queries.exercises import (
  ExerciseOut,
  ExerciseIn,
  ExerciseQueries
)

router = APIRouter()
MUSCLES = [
    'abdominals',
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'traps',
    'triceps'
    ]


@router.get("/api/exercises", response_model=list[ExerciseOut])
async def get_exercises(queries: ExerciseQueries = Depends()):
    try:
        return queries.get_all_exercises()
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
            )


@router.get("/api/exercises/search/")
async def fetch_third_party_data(
    muscle: str,
    difficulty: str,
    queries: ExerciseQueries = Depends()
):
    try:
        queries.fetch_third_party_data(muscle, difficulty)
        return queries.fetch_third_party_data(muscle, difficulty)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
            )


@router.post(
    "/api/exercises",
    response_model=ExerciseOut,
    status_code=status.HTTP_201_CREATED
    )
async def create_exercise(
    exercise_in: ExerciseIn,
    queries: ExerciseQueries = Depends()
):
    try:
        return queries.create_exercise(exercise_in)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
            )


@router.delete(
    "/exercises/{exerciseid}",
    status_code=status.HTTP_204_NO_CONTENT
    )
async def delete_exercise(
    exerciseid: int,
    queries: ExerciseQueries = Depends()
):
    success = queries.delete_exercise(exerciseid)
    if not success:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return {"ok": True}


@router.put("/exercises/{exerciseid}", response_model=ExerciseOut)
async def update_exercise(
    exerciseid: int,
    exercise_update: ExerciseIn,
    queries: ExerciseQueries = Depends()
):
    try:
        updated_exercise = queries.update_exercise(exerciseid, exercise_update)
        if updated_exercise is None:
            raise HTTPException(status_code=404, detail="Exercise not found")
        return updated_exercise
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
            )
