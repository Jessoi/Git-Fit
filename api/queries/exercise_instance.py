from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class ExerciseInstanceIn(BaseModel):
    workoutid: int
    exerciseid: int
    weight: int
    sets: int
    reps: int


class ExerciseInstanceOut(BaseModel):
    exerciseinstanceid: int
    workoutid: int
    exerciseid: int
    weight: int
    sets: int
    reps: int


class ExerciseOutCombined(BaseModel):
    exerciseinstanceid: int
    workoutid: int
    exerciseid: int
    name: str
    muscle: str
    difficulty: str
    instructions: str
    weight: int
    sets: int
    reps: int


class ListExerciseInstance(BaseModel):
    instances: list[ExerciseOutCombined]


class ExerciseInstanceQueries:
    def get_exercise_instance_list(self, workoutid: int):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                        ei.exerciseinstanceid,
                        ei.workoutid,
                        ei.exerciseid,
                        e.name AS name,
                        e.muscle AS muscle,
                        e.difficulty AS difficulty,
                        e.instructions AS instructions,
                        ei.weight,
                        ei.sets,
                        ei.reps
                    FROM
                        exerciseinstances AS ei
                    JOIN
                        exercises AS e ON ei.exerciseid = e.exerciseid
                    WHERE
                        ei.workoutid = %s;
                    """,
                    [workoutid],
                )
                try:
                    results = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        results.append(record)
                    return ListExerciseInstance(instances=results)
                except Exception as e:
                    print(e)
                    return {
                        "message":
                            "Could not get list of the exercise instances"
                        }

    def get_one_exercise_instance(
        self, exerciseinstanceid: int
    ) -> ExerciseInstanceOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        SELECT *
                        FROM exerciseinstances
                        WHERE exerciseinstanceid = %s;
                        """,
                        [exerciseinstanceid],
                    )
                    response = cur.fetchone()
                    data = {
                        "exerciseinstanceid": response[0],
                        "workoutid": response[1],
                        "exerciseid": response[2],
                        "weight": response[3],
                        "sets": response[4],
                        "reps": response[5],
                    }
                    return ExerciseInstanceOut(**data)
                except Exception as e:
                    return {
                        "message":
                            f"Could not find exercise instance: {str(e)}"
                        }

    def create_exercise_instance(
        self, data: ExerciseInstanceIn
    ) -> ExerciseInstanceOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO exerciseinstances (workoutid, exerciseid,
                    weight, sets, reps)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING exerciseinstanceid, workoutid, exerciseid,
                    weight, sets, reps
                    """,
                    (
                        data.workoutid,
                        data.exerciseid,
                        data.weight,
                        data.sets,
                        data.reps
                    ),
                )
                exercise_instance = cur.fetchone()
                exercise_instance_data = {
                    "exerciseinstanceid": exercise_instance[0],
                    "workoutid": exercise_instance[1],
                    "exerciseid": exercise_instance[2],
                    "weight": exercise_instance[3],
                    "sets": exercise_instance[4],
                    "reps": exercise_instance[5],
                }
                return ExerciseInstanceOut(**exercise_instance_data)

    def update_exercise_instance(
        self,
        exerciseinstanceid: int,
        exerciseinstance_update: ExerciseInstanceIn
    ) -> ExerciseInstanceOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE exerciseinstances
                    SET workoutid = %s,
                        exerciseid = %s,
                        weight = %s,
                        reps = %s,
                        sets = %s
                    WHERE exerciseinstanceid = %s
                    RETURNING
                        exerciseinstanceid,
                        workoutid,
                        exerciseid,
                        weight,
                        reps,
                        sets;
                    """,
                    (
                        exerciseinstance_update.workoutid,
                        exerciseinstance_update.exerciseid,
                        exerciseinstance_update.weight,
                        exerciseinstance_update.sets,
                        exerciseinstance_update.reps,
                        exerciseinstanceid
                    )
                )
                exerciseinstance = cur.fetchone()
                if exerciseinstance:
                    exerciseinstance_data = {
                        "exerciseinstanceid": exerciseinstance[0],
                        "workoutid": exerciseinstance[1],
                        "exerciseid": exerciseinstance[2],
                        "weight": exerciseinstance[3],
                        "sets": exerciseinstance[4],
                        "reps": exerciseinstance[5],
                    }
                    return ExerciseInstanceOut(**exerciseinstance_data)
                return None

    def delete_exercise_instance(self, exerciseinstanceid: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM exerciseinstances
                    WHERE exerciseinstanceid = %s
                    """,
                    [exerciseinstanceid],
                )
                return True
