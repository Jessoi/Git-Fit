steps = [
    [
        # "Up" SQL statement
        """CREATE TABLE IF NOT EXISTS exerciseinstances (
    exerciseinstanceid  SERIAL PRIMARY KEY,
    workoutid INT,
    FOREIGN KEY (workoutid) REFERENCES Workouts(workoutid) ON DELETE CASCADE,
    exerciseid INT,
    FOREIGN KEY (exerciseid)
    REFERENCES Exercises(exerciseid) ON DELETE CASCADE,
    weight INT,
    sets INT,
    reps INT
);
""",
        # "Down" SQL statement
        """DROP TABLE exerciseinstances;"""
    ]
]
