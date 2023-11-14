DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS exerciseinstances;

-- Users table (representing Django's auth_user)
CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    password VARCHAR(128) NOT NULL,
    username VARCHAR(150) UNIQUE NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(320),
    height INT,
    weight INT
);

CREATE TABLE IF NOT EXISTS workouts (
    workoutid SERIAL PRIMARY KEY,
    userid INT,
    FOREIGN KEY (userid) REFERENCES Users(userid) ON DELETE CASCADE,
    name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS exercises (
    exerciseid SERIAL PRIMARY KEY,
    name VARCHAR(100),
    muscle VARCHAR(100),
    difficulty VARCHAR(100),
    instructions TEXT
);

CREATE TABLE IF NOT EXISTS exerciseinstances (
    exerciseinstanceid  SERIAL PRIMARY KEY,
    workoutid INT,
    FOREIGN KEY (workoutid) REFERENCES Workouts(workoutid) ON DELETE CASCADE,
    exerciseid INT,
    FOREIGN KEY (exerciseid) REFERENCES Exercises(exerciseid) ON DELETE CASCADE,
    weight INT,
    sets INT,
    reps INT
);
