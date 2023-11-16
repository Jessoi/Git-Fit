'''

Account:

Retrieve: SELECT * FROM account WHERE owner_id = :user_id;
Insert: INSERT INTO account (name, number, owner_id) VALUES (:name, :number, :owner_id) RETURNING id;
'''

from pydantic import BaseModel
from queries.pool import pool

class UserIn(BaseModel):
    name: str
    number: str
    user_id: int


class UserOut(BaseModel):
    id: int
    name: str
    number: str
    user_id: int



class UserQueries:
    def get_all_accounts_for_user(
        self, user_id: int
    ) -> list[UserOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                     SELECT *
                     FROM account
                     WHERE user_id = %s;
                    """,
                    [user_id],
                )
                try:
                    results = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        results.append(record)
                    return results
                except Exception:
                    return {
                        "message": "Could not get account records for this owner id"
                    }
