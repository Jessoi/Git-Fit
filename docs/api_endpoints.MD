###Users

GET  /api/users/{userid}/
```json
    response:
        {
        "userid": 0,
        "username": "string",
        "email": "string"
        }
```

POST /api/users/
```json
   request:
        {
        "email": "string",
        "username": "string",
        "password": "string"
        }
```
PATCH /api/users/change-password/
```json
    request:
        {
        "current_password": "string",
        "new_password": "string",
        "confirm_password": "string"
        }
```
PATCH /api/users/{userid}
```json
    request:
        {
        "first_name": "string",
        "last_name": "string",
        "height": "string",
        "weight": "string"
        }
```
POST /token
```json
    request:
        {
            "login": "string",
            "password:" "string"
        }
```
DELETE /token

###Exercises

GET  /api/exercises/
```json
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
```
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

###Workouts

GET /api/{userid}/workouts/

        response:
            {
                "workoutid": 0,
                "userid": 0,
                "name": "string",
                "intensity": "string",
                "favorite": bool,
                "workout_datetime": "datetime"
            }

POST /api/{userid}/workouts/create

        request body:
            {
                "userid": 0,
                "name": "string",
                "intensity": "string",
                "favorite": bool,
                "workout_datetime": "datetime"
            }
        response:
            {
                "workoutid": 0,
                "userid": 0,
                "name": "string",
                "intensity": "string",
                "favorite": bool,
                "workout_datetime": "datetime"
            }

PUT /api/{userid}/workouts/{workoutid}

        request body:
            {
                "userid": 0,
                "name": "string",
                "intensity": "string",
                "favorite": bool,
                "workout_datetime": "datetime"
            }
        response:
            {
                "workoutid": 0,
                "userid": 0,
                "name": "string",
                "intensity": "string",
                "favorite": bool,
                "workout_d
                atetime": "datetime"
            }
DELETE /api/{userid}/workouts/{workoutid}

###ExerciseInstances

GET /api/{workoutid}/exerciseInstances/

        response:
            {
                "exerciseinstanceid": 0,
                "workoutid": 0,
                "exerciseid": 0,
                "name": "string",
                "muscle": "string",
                "difficulty": "string",
                "instructions": "string",
                "weight": 0,
                "sets": 0,
                "reps": 0
            }

POST /api/{workoutid}/exerciseInstances/create

        request body:
            {
                "workoutid": 0,
                "exerciseid": 0,
                "weight": 0,
                "sets": 0,
                "reps": 0
            }
        response:
            {
                "exerciseinstanceid": 0,
                "workoutid": 0,
                "exerciseid": 0,
                "weight": 0,
                "sets": 0,
                "reps": 0
            }

PUT /api/{workoutid}/exerciseInstances/{exerciseInstanceId}

        request body:
            {
                "workoutid": 0,
                "exerciseid": 0,
                "weight": 0,
                "sets": 0,
                "reps": 0
            }
        respose:
            {
                "exerciseinstanceid": 0,
                "workoutid": 0,
                "exerciseid": 0,
                "weight": 0,
                "sets": 0,
                "reps": 0
            }
            
DELETE /api/{workoutid}/exerciseInstances/{exerciseInstanceId}
