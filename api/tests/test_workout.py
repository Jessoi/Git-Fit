from fastapi.testclient import TestClient
from main import app
from queries.workouts import WorkoutRepository, WorkoutOut


client = TestClient(app)


class WorkoutTestQueries:
    def get_one_workout(self, workoutid: int):
        if workoutid == 1:
            return WorkoutOut(
                workoutid=1,
                userid=1,
                name="legs and glutes",
                intensity="High",
                favorite=False,
                workout_datetime=None,
            )
        return None



def test_get_one_workout():
    app.dependency_overrides[WorkoutRepository] = WorkoutTestQueries

    response = client.get("/workouts/1")
    assert response.status_code == 200
    response_data = {
        "workoutid": 1,
        "userid": 1,
        "name": "legs and glutes",
        "intensity": "High",
        "favorite": False,
        "workout_datetime": None,
    }

    assert response.json() == response_data

    response = client.get("/workouts/2")
    assert response.status_code == 404

    app.dependency_overrides[WorkoutRepository] = None
