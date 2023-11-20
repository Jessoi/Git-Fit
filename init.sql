DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS workouts CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS exerciseinstances CASCADE;

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

-- Add some users
INSERT INTO users (username, password, first_name, last_name, email, height, weight)
VALUES
  ('john123', 'password123', 'John', 'Doe', 'john@example.com', 180, 80),
  ('jane456', 'password456', 'Jane', 'Doe', 'jane@example.com', 165, 60),
  ('bob789', 'password789', 'Bob', 'Smith', 'bob@example.com', 175, 75);

-- Add some workouts
INSERT INTO workouts (userid, name)
VALUES
  (1, 'Leg Day'),
  (1, 'Arm Day'),
  (2, 'Yoga Flow'),
  (3, 'Full Body');

-- Add some exercises
INSERT INTO exercises (name, muscle, difficulty, instructions)
VALUES
  ('Squats', 'Legs', 'Beginner', 'Stand with feet shoulder-width apart. Send hips back and bend knees to lower into a squat. Return to starting position.'),
  ('Bicep Curls', 'Arms', 'Beginner', 'Hold dumbbells with palms facing forward. Bend elbows and curl weights up towards shoulders. Lower back down.'),
  ('Downward Dog', 'Full body', 'Beginner', 'From tabletop position, tuck toes under and lift knees off floor. Push hips up and back, straightening legs to inverted V position.'),
  ('Burpees', 'Full body', 'Advanced', 'From standing, squat down and place hands on floor. Kick feet back into plank. Do a push-up, jump feet in, and stand up with a jump.'),
  ('test', 'test', 'test', 'From test, test down and test hands on floor. Kick feet back into plank. Do a push-up, jump feet in, and stand up with a jump.');

-- Add some exercise instances
INSERT INTO exerciseinstances (workoutid, exerciseid, weight, sets, reps)
VALUES
  (1, 1, 0, 3, 10), -- squats x3
  (1, 4, 0, 4, 10), -- burpees x4
  (2, 2, 15, 3, 10), -- 15lb bicep curls x3
  (3, 3, 0, 5, 1), -- downward dog x5
  (4, 1, 25, 4, 8), -- 25lb goblet squats x4
  (4, 2, 10, 3, 12); -- 10lb bicep curls x3
