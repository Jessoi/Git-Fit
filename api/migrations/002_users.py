steps = [
    [
        # "Up" SQL statement
        """CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    hashed_password VARCHAR(300) NOT NULL,
    username VARCHAR(150) UNIQUE NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(320),
    height INT,
    weight INT
);""",
        # "Down" SQL statement
        """DROP TABLE users;"""
    ]
]
