steps = [
    [
        # "Up" SQL statement
        """CREATE TABLE IF NOT EXISTS muscles (
    muscleid SERIAL PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(400)
);
""",
        # "Down" SQL statement
        """DROP TABLE muscles;""",
    ]
]
