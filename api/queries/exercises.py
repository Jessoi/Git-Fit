from pydantic import BaseModel
from queries.pool import pool
import requests


class Error(BaseModel):
    message: str


class ExerciseIn(BaseModel):
    name: str
    muscle: str
    difficulty: str
    instructions: str


class ExerciseOut(BaseModel):
    exerciseid: int
    name: str
    muscle: str
    difficulty: str
    instructions: str


class ExerciseQueries:
    def get_all_exercises(self) -> list[ExerciseOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute("SELECT * FROM exercises;")
                    records = cur.fetchall()
                    return [
                        {
                            column.name: row[i]
                            for i, column in enumerate(cur.description)
                        }
                        for row in records
                    ]
                except Exception as e:
                    return {"message": f"Could not find exercises: {str(e)}"}

    def search_exercises(self, muscle, difficulty) -> list[ExerciseOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute("SELECT * FROM exercises;")
                    records = cur.fetchall()
                    return [
                        {
                            column.name: row[i]
                            for i, column in enumerate(cur.description)
                        }
                        for row in records]
                except Exception as e:
                    return {"message": f"Could not find exercises: {str(e)}"}

    def create_exercise(self, exercise_in: ExerciseIn) -> ExerciseOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO exercises
                    (
                        name,
                        muscle,
                        difficulty,
                        instructions,
                    )
                    VALUES (%s, %s, %s, %s)
                    RETURNING
                        exerciseid,
                        name,
                        muscle,
                        difficulty,
                        instructions;
                    """,
                    (
                        exercise_in.name,
                        exercise_in.muscle,
                        exercise_in.difficulty,
                        exercise_in.instructions,
                    )
                )
                exercise = cur.fetchone()
                exercise_data = {
                    "exerciseid": exercise[0],
                    "name": exercise[1],
                    "muscle": exercise[2],
                    "difficulty": exercise[3],
                    "instructions": exercise[4]
                }
                return ExerciseOut(**exercise_data)

    def update_exercise(
        self, exerciseid: int, exercise_update: ExerciseIn
    ) -> ExerciseOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE exercises
                    SET
                        name = %s,
                        muscle = %s,
                        difficulty = %s,
                        instructions = %s
                    WHERE exerciseid = %s
                    RETURNING
                        exerciseid,
                        name,
                        muscle,
                        difficulty,
                        instructions;
                    """,
                    (
                        exercise_update.name,
                        exercise_update.muscle,
                        exercise_update.difficulty,
                        exercise_update.instructions,
                        exerciseid
                    )
                )
                exercise = cur.fetchone()
                if exercise:
                    exercise_data = {
                        "exerciseid": exercise[0],
                        "name": exercise[1],
                        "muscle": exercise[2],
                        "difficulty": exercise[3],
                        "instructions": exercise[4]
                    }
                    return ExerciseOut(**exercise_data)
                return None

    def delete_exercise(self, exercise_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM exercises
                    WHERE exerciseid = %s;
                    """,
                    [exercise_id]
                )
                return cur.rowcount > 0

    def fetch_third_party_data(self, muscle, difficulty):
        querystring = {"muscle": muscle, "difficulty": difficulty}
        url = 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises'
        headers = {
            "X-RapidAPI-Key": "your-api-key",
            "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com"
        }
        try:
            response = requests.get(url, headers=headers, params=querystring)
            data = response.json()
            response.raise_for_status()
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    for exercise in data:
                        cur.execute(
                            "SELECT EXISTS("
                            "SELECT 1 FROM exercises WHERE name = %s)",
                            (exercise['name'],)
                        )
                        exercise_exists = cur.fetchone()[0]
                        if not exercise_exists:
                            cur.execute("""
                            INSERT INTO exercises (
                                name,
                                muscle,
                                difficulty,
                                instructions
                                )
                            VALUES (%s, %s, %s, %s)
                            """, (
                                exercise['name'],
                                exercise['muscle'],
                                exercise['difficulty'],
                                exercise['instructions']
                            ))
            return data
        except requests.exceptions.RequestException as e:
            return {"message": f"Error making API call: {str(e)}"}
