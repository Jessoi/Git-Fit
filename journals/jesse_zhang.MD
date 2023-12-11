12/11/23
Today I handled putting together each person's stylings, as well as styling the MUI components through our application with the help of the team. I also handled merging Boris's front end auth fix and managed to get that working. Unfortunately the deployed version's edit page was no longer working after auth implementation, but the local version still works. A bug I will need to fix in the near future.

12/10/23
Today I merged matt's unit tests and navbar changes to the working main branch so others could work off of it. I also wrote the unit test for the deleting an exercise_instance as well as worked on styling for the edit workout page. As far as styling goes, the edit workout page will change based on window size and now utilizes more mui components. I also handled Daniel's merge errors, for some reason upon building his application, not all of his dependencies in package.json would install, so we had to remove his node_modules folder before we could create a new one.

12/09/23
The frontend auth implementation ended up breaking in the deployed main branch. Preston also had pulled the broken code so we needed to remove those changes from main and his working branch. I ended up force pushing the last working commit up to main, and had preston make a new dev branch off the working main that he could move his changes into.

12/07/23
With the help of kaining and bart I was able to finally deploy our main branch successfully. Both front end and back end features are working as intended. Many of my CORS errors I had were fixed by changing the cors_host when aploying the api. I also had to make sure the gitlab pages url generated was the unique one.

12/06/23
Temporarily stopped working on features and decided to work on deployment given the chance of it taking longer than expected. I amanged to succesfully deploy the backend but the front end pages was not rendering anything. I also encounterd a slew of cors errors that I needed to fix. I identified many places containing hard-coded urls that needed to be changed to an env variable version.

12/04/23
Worked on the styling of the edit workout page by replacing components to mui components. Finished debugging the implementation of search/add exercise features and the edit/save exercise instance features on the edit workout page

12/03/23
Today I implemented a new api endpoint to handle a search of our database using muscle and difficulty. If the search returns an empty list, it makes a new api call to the 3rd party api -> populates our database -> then returns the list of exercises that were found. I also added the ability to add the specific exercise to our workout list and rerender the list.

11/28/23
Today I realized that the calendar implementation would be quite involved and take a lot of time. Given how much time for the project we had left, I opted to abandon that feature for now and take over the workout edit page since I forsee it being a quite involved page featuring the implementation of many endpoints. I first started by handling routing the information in the workout list page to the workout edit page and used it to generate a list of exercise instances within on the page.

11/27/23
I began working on calendar implementation for our workouts. After thinking about how the logic would be handled, I came to the conclusion that a new table would be added to handle multiple instances of the same workout, just assigned on different days on a calendar. Each time a user would schedule a date, I would need to create a new instance of workout, and if a user completed the workout, I would need to delete that instance.

11/22/23
The 3rd party api implementation was completed. After the 3rd party api call was made, if there was no matching data in our database, it would be seeded in, so subsequent calls would not have to be made. The 3rd party api's database of exercises seemed relatively small so this seemed like a reasonable backend solution, rather than storing the searched exercise information on the front end when a search was made.

11/21/23
All the crud endpoints for the exercises tables had been made. I then started working on implementation of our 3rd party api as a way to search for exercises and populate our database.

11/17/23
We used the working fastapi example as a template to intialize the database with an init.sql file rather than migrations. We also opted to convert to Vite to help build out our react application. After this was finished, the project could now be split between the members. We divided up the queries/routers for each of our tables and got to work.

11/16/23
Today I helped lead the group through planning and starting up our local database. We walked through each table we needed and the foreign key relations. We used dbfiddle to make sure each of sequel statements worked properly and also used temporary seeded data to ensure all our tables could be populated with information.