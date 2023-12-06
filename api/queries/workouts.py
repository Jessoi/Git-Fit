from pydantic import BaseModel
from queries.pool import pool
from typing import Optional
from datetime import datetime


class WorkoutIn(BaseModel):
    userid: int
    name: str
    workout_datetime: datetime
    intensity: str
    favorite: bool


class WorkoutOut(BaseModel):
    workoutid: int
    userid: int
    name: str
    workout_datetime: datetime
    intensity: str
    favorite: bool


class ListWorkoutOut(BaseModel):
    workouts: list[WorkoutOut]


class FavoriteIn(BaseModel):
    favorite: bool


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
                        (userid, name, workout_datetime, intensity, favorite)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING
                        workoutid,
                        userid,
                        name,
                        workout_datetime,
                        intensity,
                        favorite
                    """,
                    [
                        workout.userid,
                        workout.name,
                        workout.workout_datetime,
                        workout.intensity,
                        workout.favorite,
                    ],
                )

                workout_response = cur.fetchone()
                workout_data = {
                    "workoutid": workout_response[0],
                    "userid": workout_response[1],
                    "name": workout_response[2],
                    "workout_datetime": workout_response[3],
                    "intensity": workout_response[3],
                    "favorite": workout_response[4],
                }
                return WorkoutOut(**workout_data)

    def update_workout(self, workoutid: int, workout: WorkoutIn):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE workouts
                    SET name = %s,
                        workout_datetime = %s, intensity = %s, favorite = %s
                    WHERE workoutid = %s
                    """,
                    [
                        workout.name,
                        workout.workout_datetime,
                        workout.intensity,
                        workout.favorite,
                        workoutid,
                    ],
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
                        , intensity
                        , favorite
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
                    "workout_datetime": response[3],
                    "intensity": response[3],
                    "favorite": response[4],
                }
                return WorkoutOut(**data)

    def update_favorite(self, workoutid: int, favorite_data: FavoriteIn):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE workouts
                    SET favorite = %s
                    WHERE workoutid = %s
                    RETURNING *
                    """,
                    [favorite_data.favorite, workoutid],
                )
                response = cur.fetchone()
                if not response:
                    raise Exception("Couldn't update favorite")

                data = {
                    "workoutid": response[0],
                    "userid": response[1],
                    "name": response[2],
                    "intensity": response[3],
                    "favorite": response[4],
                }
                return WorkoutOut(**data)
