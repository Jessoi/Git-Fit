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
