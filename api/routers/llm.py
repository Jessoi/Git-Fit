from fastapi import APIRouter, HTTPException, status, Depends
from queries.muscle_schema import MuscleInfo
from queries.muscles import MuscleQueries


router = APIRouter()


@router.get("/api/muscles", response_model=list[MuscleInfo])
async def get_muscles(queries: MuscleQueries = Depends()):
    try:
        return queries.get_muscles()
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
            )


@router.get("/api/muscles/search/")
async def fetch_third_party_data(
    muscle: str,
    queries: MuscleQueries = Depends()
):
    try:
        if not (queries.search_muscle(muscle)):
            queries.fetch_third_party_data(muscle)
            return queries.search_muscle(muscle)
        return queries.search_muscle(muscle)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
            )
