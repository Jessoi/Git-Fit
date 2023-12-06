from fastapi.testclient import TestClient
from main import app
from queries.users import UserQueries
from queries.schema import UserOut


client = TestClient(app)


class MockUserQueries:
    def get_user(self, user_id):
        # Create a mock user object for testing
        if user_id == 1:
            return UserOut(
                userid=1,
                username="testuser",
                email="test@example.com"
                )
        else:
            return None


def test_get_user_by_id():
    # Override the dependency with the mock class
    app.dependency_overrides[UserQueries] = MockUserQueries

    # Test user with user_id 1
    response = client.get("/api/users/1/")
    assert response.status_code == 200
    assert response.json() == {
        "userid": 1, "username": "testuser", "email": "test@example.com"
        }

    # Test user with user_id 2 (not found)
    response = client.get("/api/users/2/")
    assert response.status_code == 404

    # Reset the dependency override
    app.dependency_overrides[UserQueries] = None
