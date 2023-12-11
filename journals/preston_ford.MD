Journals
11/21/2023:
Today I began working on front end jsx files to for the workout endpoints. I hope to have a create workout
page implemented and ready for styling once Daniel pushes some of his CSS files to main.

11/20/2023:
Finished the CRUD functionality for workouts and arduously merged that to main with the help of Jesse.
I started discussing the plan for the front end with Daniel and decided to work on just creating the very rough
pages without styling so as to diminish merge conflicts and allow him to continue his work unbothered.

11/27/2023:
Working on frontend implementation of workout pages, Create Workout was finished on 11/22, today I am working on list workouts and hope to finish that as well as the workout detail page. Note from end of day: The workout detail page is reliant on exercise instance being fully implemented so I will only be able to work on the create, list and edit pages until Matt finishes that.

11/28/2023:
Ended up deciding to refactor the SQL table for workouts from just including "userid" and "name" to also include "intensity" and "favorites". I will be refactoring the queries today to reflect the change. I hope to also implement this on the front end today as well and add some css styling for the table of workout data.

11/29/23:
Finally got the favorite button working on the list view for the project. implemented a delete button instead of the action button temporarily, when I have a bit more time to investigate styling I will do more experimentation.
I am going to try to clean up the edit workout page a bit more before calling it a night. I am worried about our progress.

11/30/23:
The plan for today is to get the edit workoutlist fully functioning with Jesse. hopefully we can get started on add exercise to workout as well.

12/1/23:
Jesse and I worked for hours on the edit workoutlist page and it quickly became evident that it will be one of our most imposing and fully fleshed out pages. We stopped at a point where the we could render the information on the fields but not change it or fill out the fields but not render the information. the union of all the backend information was difficult to wrangle. I am going to finish up at least 2 unit tests today and hopefully get back on track with Jesse at some point.

12/5/23:
I implemented some better styling from Material UI on the workout list page and I fixed a persistent bug on both the workoutlist and createworkout page where the initial render happens before the gettoken implements the userid leaving the list field blank. I started working on the home page but didn't make hardly any progress, hoping to fill that out tomorrow.

12/6/23:
Today I intend to finally create a unit test, unsure on which endpoint, I intend to get the links to the hardcoded workouts fully pathed on the home page with some decent styling, and lastly, to clean up the hardcoded workouts.

12/7/23:
Writing in the middle of the day: I just finished my unit test for get workout_list and it took considerably longer to write/understand than I first estimated. I cleaned up a bit of the hardcoded sql table data so Jesse could work around the issue with serializing exerciseinstanceids. I am now going to work on styling, if I feel very ambitious I might try to get the exercises to display in the list view in accordions.

12/8/23:
Today I finished my unit test and helped Daniel and Matt troubleshoot theirs, though we still needed quite a bit of help from SEIRs to complete each of our tests. I started implementing some of the error handling in my routers and queries and ran into an "error" with my create_workout query / router where I am not able to test it in the Swagger docs because I am not passing in the user id parameter and since it defaults to 0 it was only returning 500 errors. I could not figure it out in a timely manner and - since the implementation on the front end demonstrably hit the back end - I moved on.
