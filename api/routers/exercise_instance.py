from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)

from pydantic import BaseModel
from queries.exercise_instance import (
  ExerciseInstanceOut,
  ExerciseInstanceIn,
  ExerciseInstanceQueries,
  ListExerciseInstance
)
from datetime import date

class ExerciseInstanceForm(BaseModel):
    weight: int
    sets: int
    reps: int


router = APIRouter()


@router.get("/api/{workoutid}/exerciseinstances/", response_model=ListExerciseInstance)
async def get_exercise_instance(
    workoutid: int,
    queries: ExerciseInstanceQueries = Depends(),
):
    return queries.get_exercise_instance_list(workoutid)

@router.get("/api/{workoutid}/exerciseinstances/{exerciseinstanceid}/", response_model=ExerciseInstanceOut)
async def get_one_exercise_instance(
    exerciseinstanceid: int,
    queries: ExerciseInstanceQueries = Depends(),
) -> ExerciseInstanceOut:
    return queries.get_one_exercise_instance(exerciseinstanceid)

@router.post("/api/{workoutid}/exerciseinstance/", response_model=ExerciseInstanceOut)
def create_exercise_instance(exerciseinstance: ExerciseInstanceIn, queries: ExerciseInstanceQueries = Depends()):
    return queries.create_exercise_instance(exerciseinstance)

@router.put("/api/{workoutid}/exerciseinstance/", response_model=ExerciseInstanceOut)
async def update_exercise_instance(
    exerciseinstanceid: int,
    exerciseinstance: ExerciseInstanceIn,
    queries: ExerciseInstanceQueries = Depends(),
):
    try:
        updated_instance = queries.update_exercise_instance(exerciseinstanceid, exerciseinstance)
        if updated_instance is None:
            raise HTTPException(status_code=404, detail="Instance not found")
        return updated_instance
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error has occured: {str(e)}")


@router.delete("/api/{workoutid}/exerciseinstance/", response_model=bool)
def delete_exercise_instance(
    exerciseinstanceid: int,
    queries: ExerciseInstanceQueries = Depends(),
) -> bool:
    return queries.delete_exercise_instance(exerciseinstanceid)
