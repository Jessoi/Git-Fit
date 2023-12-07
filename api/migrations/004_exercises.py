steps = [
    [
        # "Up" SQL statement
        """CREATE TABLE IF NOT EXISTS exercises (
    exerciseid SERIAL PRIMARY KEY,
    name VARCHAR(100),
    muscle VARCHAR(100),
    difficulty VARCHAR(100),
    instructions TEXT
);""",
        # "Down" SQL statement
        """DROP TABLE exercises;"""
    ]
]
