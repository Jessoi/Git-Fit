
Users

GET  /api/users/

POST /api/users/create

PUT /api/users/{userid}

DELETE /api/users/{userid}

Exercises
    GET  /api/exercises/

        response:
        [
            {
                "exerciseid": 0,
                "name": "string",
                "muscle": "string",
                "difficulty": "string",
                "instructions": "string"
            }
        ]
    POST /api/exercises/create

        request body:
            {
                "name": "string",
                "muscle": "string",
                "difficulty": "string",
                "instructions": "string"
            }
        response:
            {
                "exerciseid": 0,
                "name": "string",
                "muscle": "string",
                "difficulty": "string",
                "instructions": "string"
            }
    PUT /api/exercises/{exerciseid}

            request body:
            {
                "name": "string",
                "muscle": "string",
                "difficulty": "string",
                "instructions": "string"
            }
        response:
            {
                "exerciseid": 0,
                "name": "string",
                "muscle": "string",
                "difficulty": "string",
                "instructions": "string"
            }

    DELETE /api/exercises/{exerciseid}

Workouts

GET  /api/{userid}/workouts/

POST /api/{userid}/workouts/create

PUT /api/{userid}/workouts/{workoutid}

DELETE /api/{userid}/workouts/{workoutid}


ExerciseInstances

GET  /api/{workoutid}/exerciseInstances/

POST /api/{workoutid}/exerciseInstances/create

PUT /api/{workoutid}/exerciseInstances/{exerciseInstanceId}

DELETE /api/{workoutid}/exerciseInstances/{exerciseInstanceId}