import pytest
from fastapi.testclient import TestClient
from main import app
from queries.exercises import ExerciseOut, ExerciseQueries

client = TestClient(app)

class

class MockExercise:
    def test_add_exercise(self, exerciseid: int):
        if exerciseid != 1:
            raise Exception("Invalid exercieid")

    def test_get_exercise(self, exerciseid: int) -> list:
        if exerciseid != 1:
            return []
        return ({"placeid": "testPlaceId"})

@pytest.fixture(autouse=True)
def setup_tests():
    app.dependency_overrides[ExerciseQueries] = lambda: MockExercise()
    app.dependency_overrides = lambda: fake_exercise_data
    yield

def test_get_fake_exercise():
    response = client.get("/api/exercises")
    assert response.status_code == 200
    assert response.json() == [{"placeid": "testPlaceId"}]

def test_get_fake_exercise_not_found():
    response = client.get("/api/exercises")
    assert response.status_code == 500


# from fastapi.testclient import TestClient
# from unittest.mock import Mock, patch
# from main import app
# from queries.exercises import ExerciseOut, ExerciseQueries

# client = TestClient(app)

# class MockExerciseQueries:
#     def get_all_exercises(self):
#         return [
#             ExerciseOut(
#                 exerciseid=1,
#                 name="curls",
#                 muscle="bicep",
#                 difficulty="easy",
#                 instructions="lorim"
#             )
#         ]

# @patch("exercises.ExerciseQueries", MockExerciseQueries)
# def test_get_fake_exercise():
#     response = client.get("/api/exercises/")
#     assert response.status_code == 200
#     assert response.json() == {
#         "exerciseid": 1,
#         "name": "curls",
#         "muscle": "bicep",
#         "difficulty": "easy",
#         "instructions": "lorim"
#     }

# @patch("exercises.ExerciseQueries", MockExerciseQueries)
# def test_get_fake_exercise_not_found():
#     response = client.get("/api/exercises/")
#     assert response.status_code == 404
#     assert response.json() == {"detail": "Item not found"}
