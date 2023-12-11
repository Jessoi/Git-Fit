# Data models

### Users

| name             | type   | unique | optional |
| ---------------- | ------ | ------ | -------- |
| userid           | int pk | yes    | no       |
| hashed_password  | varchar| no     | no       |
| username         | varchar| yes    | no       |
| first_name       | varchar| no     | no       |
| last_name        | varchar| no     | no       |
| email            | varchar| no     | no       |
| height           | int    | no     | no       |
| weight           | int    | no     | no       |

### workouts

| name             | type                     | unique | optional |
| ---------------- | ------------------------ | ------ | -------- |
| workoutid        | int pk                   | yes    | no       |
| userid           | reference to user entity | no     | no       |
| name             | varchar                  | no     | no       |
| intensity        | varchar                  | no     | no       |
| favorite         | boolean                  | no     | yes      |
| workout_datetime | timestamp                | no     | yes      |

### exercises

| name             | type    | unique | optional |
| ---------------- | ------- | ------ | -------- |
| exerciseid       | int pk  | yes    | no       |
| name             | varchar | no     | no       |
| muscle           | varchar | no     | no       |
| difficulty       | varchar | no     | no       |
| instructions     | text    | no     | no       |

### exerciseinstances

| name               | type                        | unique | optional |
| ------------------ | --------------------------- | ------ | -------- |
| exerciseinstanceid | int pk                      | yes    | no       |
| workoutid          | reference to workout entity | no     | no       |
| exerciseid         | reference to exercise entity| no     | no       |
| weight             | int                         | no     | yes      |
| sets               | int                         | no     | yes      |
| reps               | int                         | no     | yes      |
