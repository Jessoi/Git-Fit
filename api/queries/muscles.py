import replicate
import requests  # Import the necessary module for requests.exceptions.RequestException

from fastapi import Query
from queries.pool import pool
from queries.muscle_schema import MuscleInfo

def fetch_muscle(muscle):
    generated_summary = ""
    for event in replicate.stream(
        "meta/llama-2-7b-chat:13c3cdee13ee059ab779f0291d29054dab00a47dad8261375654de5540165fb0",
        input={
            "debug": False,
            "top_k": -1,
            "top_p": 1,
            "prompt": f"Tell me about {muscle}",
            "temperature": 0.75,
            "system_prompt": f"Summarize the {muscle} muscle in 300 characters or less. Provide only the summary, without any introductory phrases or extra text.",
            "max_new_tokens": 100,
            "min_new_tokens": -1,
            "repetition_penalty": 1
        }
    ):
        generated_summary += str(event)

    generated_summary = generated_summary.replace("\n", "")

    return generated_summary
class MuscleQueries:
    def get_muscles(self) -> list[MuscleInfo]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute("SELECT * FROM muscles;")
                    records = cur.fetchall()
                    return [
                        {
                            column.name: row[i]
                            for i, column in enumerate(cur.description)
                        }
                        for row in records
                    ]
                except Exception as e:
                    return {"message": f"Could not find muscles: {str(e)}"}

    def search_muscle(
        self,
        name: str = Query(...),
    ) -> list[MuscleInfo]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        SELECT * FROM muscles
                        WHERE name = %s;
                        """, [name]
                    )
                    records = cur.fetchall()
                    return [
                        {
                            column.name: row[i]
                            for i, column in enumerate(cur.description)
                        }
                        for row in records
                    ]
                except Exception as e:
                    return {"message": f"Could not find muscles: {str(e)}"}

    def create_muscle(self, muscle_in: MuscleInfo) -> MuscleInfo:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO muscles
                    (
                        name,
                        description
                    )
                    VALUES (%s, %s)
                    RETURNING
                        muscleid,
                        name,
                        description;
                    """,
                    (
                        muscle_in.name,
                        muscle_in.description,
                    )
                )
                exercise = cur.fetchone()
                exercise_data = {
                    "muscleid": exercise[0],
                    "name": exercise[1],
                    "description": exercise[2]
                }
                return MuscleInfo(**exercise_data)

    def fetch_third_party_data(self, muscle):
        try:
            description = fetch_muscle(muscle)
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        "SELECT EXISTS(SELECT 1 FROM muscles WHERE name = %s)",
                        (muscle,)
                    )
                    muscle_exists = cur.fetchone()[0]
                    if not muscle_exists:
                        cur.execute("""
                        INSERT INTO muscles (
                            name,
                            description
                        )
                        VALUES (%s, %s)
                        """, (
                            muscle,
                            description
                        ))
            return description
        except requests.exceptions.RequestException as e:
            return {"message": f"Error making API call: {str(e)}"}
