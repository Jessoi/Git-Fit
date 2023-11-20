from pydantic import BaseModel
from queries.pool import pool
from typing import List, Optional


class WorkoutIn(BaseModel):
    userid: int
    name: str


class WorkoutOut(BaseModel):
    workoutid: int
    userid: int
    name: str


class ListWorkoutOut(BaseModel):
    workouts: list[WorkoutOut]


class WorkoutRepository:
    def list_user_workouts(self, userid: int):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM workouts
                    WHERE userid = %s;
                    """,
                    [userid],
                )
                try:
                    results = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        results.append(record)
                    return ListWorkoutOut(workouts=results)
                except Exception as e:
                    print(e)
                    return {"message": "Could not get list of workouts"}

    def create_workout(self, workout: WorkoutIn):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO workouts
                        (userid, name)
                    VALUES
                        (%s, %s)
                    RETURNING workoutid, userid, name
                    """,
                    [workout.userid, workout.name],
                )

                workout_response = cur.fetchone()
                workout_data = {
                    "workoutid": workout_response[0],
                    "userid": workout_response[1],
                    "name": workout_response[2],
                }
                return WorkoutOut(**workout_data)

    def update_workout(self, workoutid: int, workout: WorkoutIn):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE workouts
                    SET name = %s
                    WHERE workoutid = %s
                    """,
                    [workout.name, workoutid],
                    #!!! userid in request body, doesn't change upon put request
                    # investigate if SERIAL is reason.
                )
                old_data = workout.dict()
                return WorkoutOut(workoutid=workoutid, **old_data)

    def delete_workout(self, workoutid: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM workouts
                    Where workoutid = %s
                    """,
                    [workoutid],
                )
                return True

    def get_one_workout(self, workoutid: int) -> Optional[WorkoutOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT workoutid
                        , userid
                        , name
                    FROM workouts
                    WHERE workoutid = %s
                    """,
                    [workoutid],
                )
                response = cur.fetchone()
                data = {
                    "workoutid": response[0],
                    "userid": response[1],
                    "name": response[2],
                }
                return WorkoutOut(**data)
