from pydantic import BaseModel
from queries.pool import pool


class DuplicateUserError(ValueError):
    pass


class UserIn(BaseModel):
    email: str
    username: str
    password: str


class UserOut(BaseModel):
    userid: int
    username: str
    email: str


class UserOutWithPassword(UserOut):
    hashed_password: str


class ChangePassword(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str

class UserQueries:
    def get(
          self, username: str
    ) -> UserOutWithPassword:
        print("here in get): " +username)
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                     SELECT *
                     FROM users
                     WHERE username = %s;
                    """,
                    [username],
                )
                try:
                    record = None
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return UserOutWithPassword(**record)
                except Exception:
                    print("exception")
                    return {
                        "message": "Could not get user record for this user email"
                    }


    def get_user(self, user_id: int) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                     SELECT *
                     FROM users
                     WHERE userid = %s;
                    """,
                    [user_id],
                )
                try:
                    record = None
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                    return UserOutWithPassword(**record)
                except Exception:
                    print("exception")
                    return {
                        "message": "Could not get user record for this user_id"
                    }

    # Insert: INSERT INTO users (password, username, first_name, last_name, email, date_joined) VALUES (:password, :username, :email, NOW()) RETURNING id;
    def create_user(self, data, hashed_password) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.username,
                    data.email,
                    hashed_password
                ]
                cur.execute(
                    """
                    INSERT INTO users (username, email,
                    hashed_password)
                    VALUES (%s, %s, %s)
                    RETURNING userid, username,email,
                    hashed_password
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                print(record)
                return UserOutWithPassword(**record)

    # def change_password(
    #     hashed_password,
    #     current_user: UserIn
    # ):
    #     with conn.cursor() as cur:
    #             params = [
    #                 hashed_password,
    #                 UserIn.username,
    #             ]
    #             cur.execute(
    #                 """
    #                 UPDATE users
    #                 SET hashed_password = %s
    #                 WHERE username = %s;
    #                 """,
    #                 params,
    #             )
