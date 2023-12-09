steps = [
    [
        # "Up" SQL statement
        """CREATE TABLE dummy (
    id SERIAL PRIMARY KEY NOT NULL,
    required_limited_text VARCHAR(1000) NOT NULL,
    required_unlimited_text TEXT NOT NULL,
    required_date_time TIMESTAMP NOT NULL,
    automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    required_integer INTEGER NOT NULL,
    required_money MONEY NOT NULL
);""",
        # "Down" SQL statement
        """DROP TABLE dummy;"""
    ],
    [
        # "Up" SQL statement
        """CREATE TABLE big_dummy (
    id SERIAL PRIMARY KEY NOT NULL,
    required_limited_text VARCHAR(1000) NOT NULL,
    required_unlimited_text TEXT NOT NULL,
    required_date_time TIMESTAMP NOT NULL,
    automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    required_integer INTEGER NOT NULL,
    required_money MONEY NOT NULL
);""",
        # "Down" SQL statement
        """DROP TABLE big_dummy;"""
    ],
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
        """DROP TABLE users;""",
    ],
    [
        # "Up" SQL statement
        """CREATE TABLE IF NOT EXISTS workouts (
    workoutid SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(userid) ON DELETE CASCADE,
    name VARCHAR(50),
    intensity VARCHAR(50),
    favorite BOOLEAN DEFAULT FALSE,
    workout_datetime TIMESTAMP
);""",
        # "Down" SQL statement
        """DROP TABLE workouts;""",
    ],
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
        """DROP TABLE exercises;""",
    ],
    [
        # "Up" SQL statement
        """CREATE TABLE IF NOT EXISTS exerciseinstances (
    exerciseinstanceid  SERIAL PRIMARY KEY,
    workoutid INT,
    FOREIGN KEY (workoutid) REFERENCES workouts(workoutid) ON DELETE CASCADE,
    exerciseid INT,
    FOREIGN KEY (exerciseid)
    REFERENCES Exercises(exerciseid) ON DELETE CASCADE,
    weight INT,
    sets INT,
    reps INT
);
""",
        # "Down" SQL statement
        """DROP TABLE exerciseinstances;""",
    ]
]
