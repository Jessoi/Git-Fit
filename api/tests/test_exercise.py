import pytest
from fastapi.testclient import TestClient
from pydantic import BaseModel
from main import app
from queries.exercises import ExerciseQueries

client = TestClient(app)

class MockExerciseOut(BaseModel):
    exerciseid: int
    name: str
    muscle: str
    difficulty: str
    instructions: str

class MockExercise():
    def get_all_exercises(self):
        return [MockExerciseOut(
                exerciseid= 1,
                name= "curls",
                muscle= "bicep",
                difficulty= "easy",
                instructions= "test"
            )]


def test_get_exercise():
    app.dependency_overrides[ExerciseQueries] = MockExercise
    response = client.get("/api/exercises")

    assert response.status_code == 200
    response_data = [{
                "exerciseid": 1,
                "name": "curls",
                "muscle": "bicep",
                "difficulty": "easy",
                "instructions": "test"
            }]
    assert response.json() == response_data

    app.dependency_overrides = {}
