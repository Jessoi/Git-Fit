-- Add some users
INSERT INTO users (username, hashed_password, first_name, last_name, email, height, weight)
VALUES
  ('Guest', 'new_password123', 'ideal', 'plantsim', 'john@example.com', 180, 80);



-- Add some workouts
INSERT INTO workouts (userid, name, intensity, favorite, workout_datetime)
VALUES
  (1, 'Arms', 'Beginner', FALSE, '2023-12-06 08:00:00'),
  (1, 'Chest', 'Beginner', FALSE, '2023-12-06 08:00:00'),
  (1, 'Legs & Glutes', 'Beginner', FALSE, '2023-12-06 08:00:00'),
  (1, 'Back & Shoulders', 'Beginner', FALSE, '2023-12-06 08:00:00');

-- Add some exercises
INSERT INTO exercises (name, muscle, difficulty, instructions)
VALUES
  ('Wide-grip barbell curl', 'biceps', 'Beginner'),
  ('Decline Dumbell Triceps Extension', 'triceps', 'Beginner'),
  ('Machine Bicep Curl', 'biceps', 'Beginner'),
  ('Low Cable Triceps Extension', 'triceps', 'Beginner'),
  ('Wide-grip bench press', 'Chest', 'Beginner'),
  ('Wide-Grip Decline Barbell Bench Press', 'Chest', 'Beginner'),
  ('Incline cable chest press', 'Chest', 'Beginner'),
  ('Hands-elevated push-up', 'Chest', 'Beginner'),
  ('Barbell Deadlift', 'hamstrings', 'intermediate'),
  ('Glute Ham Raise', 'hamstrings', 'intermediate'),
  ('Standing Calf Raises', 'calves', 'Beginner'),
  ('Glute Kickback', 'glutes', 'Beginner'),
  ('Barbell deficit deadlift', 'lower_back', 'Beginner'),
  ('Straight bar bench mid rows', 'middle_back', 'Beginner'),
  ('Seated Back Extension', 'lower_back', 'Beginner'),
  ('Standing dumbbell shrug', 'traps', 'intermediate');
-- Add some exercise instances
INSERT INTO exerciseinstances (workoutid, exerciseid, weight, sets, reps)
VALUES
  (1, 31, 0, 4, 10), -- wide grip barbell curl
  (1, 41, 0, 4, 10), -- decline dumbell triceps extension
  (1, 34, 0, 4, 10), -- Machine Bicep Curl
  (1, 48, 0, 4, 10), -- Low Cable Triceps Extension
  (2, 17, 0, 4, 10), -- Wide-grip bench press
  (2, 18, 0, 4, 10), -- Wide-Grip Decline Barbell Bench Press
  (2, 22, 0, 4, 10), -- Incline cable chest press
  (2, 24, 0, 4, 10), -- Hands-elevated push-up
  (3, 60, 0, 4, 10), -- Barbell Deadlift
  (3, 67, 0, 4, 10), -- Glute Ham Raise
  (3, 68, 0, 4, 10), -- Standing Calf Raises
  (3, 79, 0, 4, 10), -- Glute Kickback
  (4, 88, 0, 4, 10), -- Barbell deficit deadlift
  (4, 102, 0, 4, 10), -- Straight bar bench mid rows
  (4, 95, 0, 4, 10), -- Seated Back Extension
  (4, 108, 0, 4, 10); -- Standing dumbbell shrug
