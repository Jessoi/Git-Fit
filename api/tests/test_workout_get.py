from fastapi.testclient import TestClient
from main import app
from queries.workouts import WorkoutRepository, WorkoutOut


client = TestClient(app)


class WorkoutTestQueries:
    def mock_get_userworkouts():
        return WorkoutOut(
            workoutid=1,
            userid=1,
            name="legs and glutes",
            intensity="High",
            favorite=False,
            workout_datetime=None,
        )


def test_get_userworkouts():
    app.dependency_overrides[WorkoutRepository] = WorkoutTestQueries

    response = client.get("/1/workouts")
    assert response.status_code == 200
    assert response.json() == {
        "workoutid": 1,
        "userid": 1,
        "name": "legs and glutes",
        "intensity": "High",
        "favorite": False,
        "workout_datetime": None,
    }

    response = client.get("/8/workouts")
    assert response.status_code == 404

    app.dependency_overrides[WorkoutRepository] = None
