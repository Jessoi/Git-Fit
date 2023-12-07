from fastapi.testclient import TestClient
from main import app
from queries.exercises import ExerciseOut, ExerciseQueries

client = TestClient(app)

class MockExercise:
    def get_exercise():
        return ExerciseOut(
            exerciseid= 1,
            name= "curls",
            muscle= "bicep",
            difficulty= "easy",
            instructions= "lorim"
        )

def get_fake_exercise():
    app.dependency_overrides[ExerciseQueries] = MockExercise
    response = client.get("/api/exercises/")
    assert response.status_code == 200
    assert response.json() == {
        "exerciseid": 1,
        "name": "curls",
        "muscle": "bicep",
        "difficulty": "easy",
        "instructions": "lorim"
    }
    response = client.get("/api/exercises/")
    assert response.status_code == 404
    assert response.json() == {
        "exerciseid": 2,
        "name": "curls",
        "muscle": "bicep",
        "difficulty": "easy",
        "instructions": "lorim"
    }
    app.dependency_overrides[ExerciseQueries] = None
