from pydantic import BaseModel
from queries.pool import pool

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
                    return [{column.name: row[i] for i, column in enumerate(cur.description)} for row in records]
                except Exception as e:
                    return {"message": f"Could not find exercises: {str(e)}"}


    def create_exercise(self, exercise_in: ExerciseIn) -> ExerciseOut:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO exercises (name, muscle, difficulty, instructions)
                        VALUES (%s, %s, %s, %s)
                        RETURNING exerciseid, name, muscle, difficulty, instructions;
                        """,
                        (exercise_in.name, exercise_in.muscle, exercise_in.difficulty, exercise_in.instructions)
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

    def update_exercise(self, exerciseid: int, exercise_update: ExerciseIn) -> ExerciseOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE exercises
                    SET name = %s, muscle = %s, difficulty = %s, instructions = %s
                    WHERE exerciseid = %s
                    RETURNING exerciseid, name, muscle, difficulty, instructions;
                    """,
                    (exercise_update.name, exercise_update.muscle, exercise_update.difficulty, exercise_update.instructions, exerciseid)
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