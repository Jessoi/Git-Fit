from pydantic import BaseModel
from queries.pool import pool
from typing import Optional
from datetime import datetime


class WorkoutIn(BaseModel):
    userid: int
    name: str
    workout_datetime: datetime


class WorkoutOut(BaseModel):
    workoutid: int
    userid: int
    name: str
    workout_datetime: datetime


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
                        (userid, name, workout_datetime)
                    VALUES
                        (%s, %s, %s)
                    RETURNING workoutid, userid, name, workout_datetime
                    """,
                    [workout.userid, workout.name, workout.workout_datetime],
                )

                workout_response = cur.fetchone()
                workout_data = {
                    "workoutid": workout_response[0],
                    "userid": workout_response[1],
                    "name": workout_response[2],
                    "workout_datetime": workout_response[3],
                }
                return WorkoutOut(**workout_data)

    def update_workout(self, workoutid: int, workout: WorkoutIn):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE workouts
                    SET name = %s,
                        workout_datetime = %s
                    WHERE workoutid = %s
                    """,
                    [workout.name, workout.workout_datetime, workoutid],
                    # userid in request body, doesn't change upon put request
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
                        , workout_datetime
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
                    "workout_datetime": response[3]
                }
                return WorkoutOut(**data)
