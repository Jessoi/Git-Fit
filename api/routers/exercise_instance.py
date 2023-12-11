from authenticator import authenticator
from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)
from queries.exercise_instance import (
  ExerciseInstanceOut,
  ExerciseInstanceIn,
  ExerciseInstanceQueries,
  ListExerciseInstance
)


router = APIRouter()


@router.get("/api/{workoutid}/exerciseinstances/", response_model=ListExerciseInstance)
async def get_exercise_instance(
    workoutid: int,
    queries: ExerciseInstanceQueries = Depends(),
):
    try:
        return queries.get_exercise_instance_list(workoutid)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error has occurred: {str(e)}")

@router.get("/api/{workoutid}/exerciseinstances/{exerciseinstanceid}/", response_model=ExerciseInstanceOut)
async def get_one_exercise_instance(
    exerciseinstanceid: int,
    queries: ExerciseInstanceQueries = Depends(),
) -> ExerciseInstanceOut:
    try:
        return queries.get_one_exercise_instance(exerciseinstanceid)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error has occurred: {str(e)}")

@router.post("/api/{workoutid}/exerciseinstance/", response_model=ExerciseInstanceOut)
def create_exercise_instance(exerciseinstance: ExerciseInstanceIn, queries: ExerciseInstanceQueries = Depends()):
    try:
        return queries.create_exercise_instance(exerciseinstance)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error has occurred: {str(e)}")

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


@router.delete("/api/{workoutid}/exerciseinstance/")
def delete_exercise_instance(
    exerciseinstanceid: int,
    queries: ExerciseInstanceQueries = Depends(),
) -> bool:
    success = queries.delete_exercise_instance(exerciseinstanceid)
    if not success:
        raise HTTPException(status_code=404, detail="Instance not found")
    return {"ok": True}
