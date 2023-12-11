from main import app
from queries.exercise_instance import ExerciseInstanceQueries
from fastapi.testclient import TestClient
from fastapi import HTTPException
from pydantic import BaseModel

client = TestClient(app)


class ExerciseInstanceOut(BaseModel):
    exerciseinstanceid: int
    workoutid: int
    exerciseid: int
    weight: int
    sets: int
    reps: int


class ExerciseInstanceTestQueries():
    def get_one_exercise_instance(self, exerciseinstanceid: int):
        if exerciseinstanceid == 1:
            return ExerciseInstanceOut(
                exerciseinstanceid=1,
                workoutid=2,
                exerciseid=3,
                weight=100,
                sets=3,
                reps=10
            )
        else:
            raise HTTPException(status_code=500)

    def delete_exercise_instance(self, exerciseinstanceid: int):
        if exerciseinstanceid == 1:
            return True
        else:
            raise HTTPException(status_code=404)


def test_get_all_exercise_instances():
    app.dependency_overrides[ExerciseInstanceQueries] = ExerciseInstanceTestQueries # noqa

    response = client.get("/api/{workoutid}/exerciseinstances/1/")

    assert response.status_code == 200
    responce_data = {
                "exerciseinstanceid": 1,
                "workoutid": 2,
                "exerciseid": 3,
                "weight": 100,
                "sets": 3,
                "reps": 10
            }

    assert response.json() == responce_data

    response = client.get("/api/3/exerciseinstances/2/")
    assert response.status_code == 500

    app.dependency_overrides[ExerciseInstanceQueries] = None


def test_delete_exercise_instance():
    app.dependency_overrides[ExerciseInstanceQueries] = ExerciseInstanceTestQueries # noqa

    response = client.delete(
        "/api/{workoutid}/exerciseinstance/?exerciseinstanceid=1"
    )

    assert response.status_code == 200
    response_data = {"ok": True}

    assert response.json() == response_data

    response = client.delete("/api/3/exerciseinstances/2/")
    assert response.status_code == 405

    app.dependency_overrides[ExerciseInstanceQueries] = None
