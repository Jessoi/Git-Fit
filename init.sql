DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS workouts CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS exerciseinstances CASCADE;

-- Users table (representing Django's auth_user)
CREATE TABLE IF NOT EXISTS users (
    userid SERIAL PRIMARY KEY,
    hashed_password VARCHAR(300) NOT NULL,
    username VARCHAR(150) UNIQUE NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(320),
    height INT,
    weight INT
);

CREATE TABLE IF NOT EXISTS workouts (
    workoutid SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(userid) ON DELETE CASCADE,
    name VARCHAR(50),
    intensity VARCHAR(50),
    favorite BOOLEAN DEFAULT FALSE,
    workout_datetime TIMESTAMP
);

-- CREATE TABLE IF NOT EXISTS scheduledworkout (
--     id SERIAL PRIMARY KEY,
--     workoutid INTEGER REFERENCES workouts(workoutid) ON DELETE CASCADE,
--     userid INTEGER REFERENCES users(userid) ON DELETE CASCADE,
--     workoutdatetime DATETIME
-- );
-- StaticDateTimePicker
-- LocalizationProvider

-- for home page modal and box from material UI
-- for box position absolute almost makes the position on the top layer of the page

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
INSERT INTO users (username, hashed_password, first_name, last_name, email, height, weight)
VALUES
  ('john123', 'new_password123', 'John', 'Doe', 'john@example.com', 180, 80),
  ('jane456', 'new_password456', 'Jane', 'Doe', 'jane@example.com', 165, 60),
  ('bob789', 'new_password789', 'Bob', 'Smith', 'bob@example.com', 175, 75);


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
  ('Wide-grip barbell curl', 'biceps', 'Beginner', 'Stand up with your torso upright while holding a barbell at the wide outer handle.
    The palm of your hands should be facing forward. The elbows should be close to the torso. This will be your starting position.
    While holding the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out.
    Tip: Only the forearms should move. Continue the movement until your biceps are fully contracted and the bar is at shoulder level.
    Hold the contracted position for a second and squeeze the biceps hard. Slowly begin to bring the bar back to starting position as your breathe in.
    Repeat for the recommended amount of repetitions.
    Variations:  You can also perform this movement using an E-Z bar or E-Z attachment hooked to a low pulley.
    This variation seems to really provide a good contraction at the top of the movement. You may also use the closer grip for variety purposes.'),
  ('Decline Dumbell Triceps Extension', 'triceps', 'Beginner', 'Secure your legs at the end of the decline bench and lie down with a dumbbell
    on each hand on top of your thighs. The palms of your hand will be facing each other. Once you are laying down, move the dumbbells in front
    of you at shoulder width. The palms of the hands should be facing each other and the arms should be perpendicular to the floor and fully extended.
    This will be your starting position. As you breathe in and you keep the upper arms stationary (and elbows in), bring the dumbbells down
    slowly by moving your forearms in a semicircular motion towards you until your thumbs are next to your ears. Breathe in as you perform this portion
    of the movement. Lift the dumbbells back to the starting position by contracting the triceps and exhaling. Repeat for the recommended amount of
    repetitions.  Variations: You can use an e-z bar or barbell to perform this movement. You can also perform it on a flat bench as well.'),
  ('Machine Bicep Curl', 'biceps', 'Beginner', 'Adjust the seat to the appropriate height and make your weight selection. Place your upper arms
    against the pads and grasp the handles. This will be your starting position. Perform the movement by flexing the elbow, pulling your lower arm
    towards your upper arm. Pause at the top of the movement, and then slowly return the weight to the starting position. Avoid returning the weight
    all the way to the stops until the set is complete to keep tension on the muscles being worked.'),
  ('Low Cable Triceps Extension', 'triceps', 'Beginner', 'Select the desired weight and lay down face up on the bench of a seated row machine that has
    a rope attached to it. Your head should be pointing towards the attachment. Grab the outside of the rope ends with your palms facing each other
    (neutral grip). Position your elbows so that they are bent at a 90 degree angle and your upper arms are perpendicular (90 degree angle) to your torso.
    Tip: Keep the elbows in and make sure that the upper arms point to the ceiling while your forearms point towards the pulley above your head.
    This will be your starting position. As you breathe out, extend your lower arms until they are straight and vertical. The upper arms and elbows
    remain stationary throughout the movement. Only the forearms should move. Contract the triceps hard for a second. As you breathe in slowly return
    to the starting position. Repeat for the recommended amount of repetitions.  Variations: You can perform the same movement using a flat bench
    and exercise bands or a low pulley that is set at the same level as your head is.'),
  ('Wide-grip bench press', 'Chest', 'Beginner', 'Lie back on a flat bench with feet firm on the floor. Using a wide, pronated (palms forward) grip
    that is around 3 inches away from shoulder width (for each hand), lift the bar from the rack and hold it straight over you with your arms locked.
    The bar will be perpendicular to the torso and the floor. This will be your starting position. As you breathe in, come down slowly until you feel
    the bar on your middle chest. After a second pause, bring the bar back to the starting position as you breathe out and push the bar using your
    chest muscles. Lock your arms and squeeze your chest in the contracted position, hold for a second and then start coming down slowly again.
    Tip: It should take at least twice as long to go down than to come up. Repeat the movement for the prescribed amount of repetitions.  Caution:
    If you are new at this exercise, it is advised that you use a spotter. If no spotter is available, then be conservative with the amount of weight
    used. Also, beware of letting the bar drift too far forward. You want the bar to fall on your middle chest and nowhere else.
    Do not bounce the weight off your chest. You should be in full control of the barbell at all times.
    Variations: You can use dumbbells for this exercise as well as exercise bands. Same as the Barbell Bench Press but with a different grip.'),
  ('Wide-Grip Decline Barbell Bench Press', 'Chest', 'Beginner', 'Lie back on a decline bench with the feet securely locked at the front of the bench.
    Using a wide, pronated (palms forward) grip that is around 3 inches away from shoulder width (for each hand), lift the bar from the rack and hold
    it straight over you with your arms locked. The bar will be perpendicular to the torso and the floor. This will be your starting position. As you
    breathe in, come down slowly until you feel the bar on your lower chest. After a second pause, bring the bar back to the starting position as you
    breathe out and push the bar using your chest muscles. Lock your arms and squeeze your chest in the contracted position, hold for a second and then
    start coming down slowly again. Tip: It should take at least twice as long to go down than to come up. Repeat the movement for the prescribed amount
    of repetitions.  Caution:  If you are new at this exercise, it is advised that you use a spotter. If no spotter is available, then be conservative with
    the amount of weight used. Also, beware of letting the bar drift too far forward. You want the bar to fall on your middle chest and nowhere else.
    Do not bounce the weight off your chest. You should be in full control of the barbell at all times.  Variations: You can use dumbbells for this exercise as
    well as exercise bands. Same as the Decline Barbell Bench Press but with a wider grip.'),
  ('Incline cable chest press', 'Chest', 'Beginner', 'Adjust the weight to an appropriate amount and be seated, grasping the handles. Your upper arms should be
    about 45 degrees to the body, with your head and chest up. The elbows should be bent to about 90 degrees. This will be your starting position. Begin by extending
    through the elbow, pressing the handles together straight in front of you. Keep your shoulder blades retracted as you execute the movement. After pausing at full
    extension, return to the starting position, keeping tension on the cables.'),
  ('Hands-elevated push-up', 'Chest', 'Beginner', 'Stand facing a Smith machine bar or sturdy elevated platform at an appropriate height. Place your hands on the bar,
    with your hands about shoulder width apart. Position your feet back from the bar with arms and body straight. This will be your starting position. Keeping your body
    straight, lower your chest to the bar by bending the arms. Return to the starting position by extending the elbows, pressing yourself back up.'),
  ('Barbell Deadlift', 'hamstrings', 'intermediate', 'Approach the bar so that it is centered over your feet. Your feet should be about hip-width apart.
    Bend at the hipto grip the bar at shoulder-width allowing your shoulder blades to protract. Typically, you would use an alternating grip.
    With your feet and your grip set, take a big breath and then lower your hips and flex the knees until your shins contact the bar. Look forward with your head.
    Keep your chest up and your back arched, and begin driving through the heels to move the weight upward. After the bar passes the knees aggressively pull the
    bar back, pulling your shoulder blades together as you drive your hips forward into the bar. Lower the bar by bending at the hips and guiding it to the floor.'),
  ('Glute Ham Raise', 'hamstrings', 'intermediate', 'Begin by adjusting the equipment to fit your body. Place your feet against the footplate in between the rollers
    as you lie facedown. Your knees should be just behind the pad. Start from the bottom of the movement. Keep your back arched as you begin the movement by flexing
    the knees. Drive your toes into the foot plate as you do so. Keep your upper body straight, and continue until your body is upright. Return to the starting position,
    keeping your descent under control.'),
  ('Standing Calf Raises', 'calves', 'Beginner', 'Adjust the padded lever of the calf raise machine to fit your height. Place your shoulders under the pads provided
    and position your toes facing forward (or using any of the two other positions described at the beginning of the chapter). The balls of your feet should be secured
    on top of the calf block with the heels extending off it. Push the lever up by extending your hips and knees until your torso is standing erect. The knees should
    be kept with a slight bend; never locked. Toes should be facing forward, outwards or inwards as described at the beginning of the chapter. This will be your starting
    position. Raise your heels as you breathe out by extending your ankles as high as possible and flexing your calf. Ensure that the knee is kept stationary at all
    times. There should be no bending at any time. Hold the contracted position by a second before you start to go back down. Go back slowly to the starting position
    as you breathe in by lowering your heels as you bend the ankles until calves are stretched. Repeat for the recommended amount of repetitions. Caution: If you
    suffer from lower back problems, a better exercise is the calf press as during a standing calf raise the back has to support the weight being lifted. Also,
    maintain your back straight and stationary at all times. Rounding of the back can cause lower back injury. Variations: There are several other ways to perform
    a standing calf raise. A barbell instead of a machine can be used instead as well as dumbbells, one leg or two legs at a time. Refer to the exercise descriptions
    of these movements below. A smith machine can be used for calf raises as well.'),
  ('Glute Kickback', 'glutes', 'Beginner', 'Kneel on the floor or an exercise mat and bend at the waist with your arms extended in front of you (perpendicular
    to the torso) in order to get into a kneeling push-up position but with the arms spaced at shoulder width. Your head should be looking forward and the bend
    of the knees should create a 90-degree angle between the hamstrings and the calves. This will be your starting position. As you exhale, lift up your right
    leg until the hamstrings are in line with the back while maintaining the 90-degree angle bend. Contract the glutes throughout this movement and hold the
    contraction at the top for a second. Tip: At the end of the movement the upper leg should be parallel to the floor while the calf should be perpendicular
    to it. Go back to the initial position as you inhale and now repeat with the left leg. Continue to alternate legs until all of the recommended repetitions
    have been performed. Variations: For this exercise you can also perform all of the repetitions with one leg first and then the other one. Additionally,
    you can also add ankle weights.'),
  ('Barbell deficit deadlift', 'lower_back', 'Beginner', 'Begin by having a platform or weight plates that you can stand on, usually 1-3 inches in height.
    Approach the bar so that it is centered over your feet. You feet should be about hip width apart. Bend at the hip to grip the bar at shoulder width,
    allowing your shoulder blades to protract. Typically, you would use an overhand grip or an over/under grip on heavier sets. With your feet, and your grip set,
    take a big breath and then lower your hips and bend the knees until your shins contact the bar. Look forward with your head, keep your chest up and your back arched,
    and begin driving through the heels to move the weight upward. After the bar passes the knees, aggressively pull the bar back, pulling your shoulder blades together
    as you drive your hips forward into the bar. Lower the bar by bending at the hips and guiding it to the floor.'),
  ('Straight bar bench mid rows', 'middle_back', 'Beginner', 'Place a loaded barbell on the end of a bench. Standing on the bench behind the bar, take a medium, pronated
    grip. Stand with your hips back and chest up, maintaining a neutral spine. This will be your starting position. Row the bar to your torso by retracting the shoulder
    blades and flexing the elbows. Use a controlled movement with no jerking. After a brief pause, slowly return the bar to the starting position, ensuring to go all the way down.'),
  ('Seated Back Extension', 'lower_back', 'Beginner', 'Adjust the machine and select an appropriate load. Seat yourself with your upper back against the roller and
    grasp the handles with your feet planted firmly on the footrest. Your head should remain looking forward and your chest should be up. This will be your starting
    position. Initiate the movement by extending at the hips and lumbar spine to straighten your body, pushing the roller to the rear. At the top of the motion pause,
    and then return to the starting position.'),
  ('Standing dumbbell shrug', 'traps', 'intermediate', 'Stand erect with a dumbbell on each hand (palms facing your torso), arms extended on the sides. Lift the dumbbells
    by elevating the shoulders as high as possible while you exhale. Hold the contraction at the top for a second. Tip: The arms should remain extended at all times. Refrain
    from using the biceps to help lift the dumbbells. Only the shoulders should be moving up and down. Lower the dumbbells back to the original position. Repeat for the
    recommended amount of repetitions. Variations: You can perform this exercise with bands, barbells or cables. You can also use a single handle and work one side at a time.');

-- Leg day, name, muscle, difficulty, weight, sets, reps

-- Add some exercise instances
INSERT INTO exerciseinstances (workoutid, exerciseid, weight, sets, reps)
VALUES
  (1, 1, 0, 3, 10), -- squats x3
  (1, 4, 0, 4, 10), -- burpees x4
  (2, 2, 15, 3, 10), -- 15lb bicep curls x3
  (3, 3, 0, 5, 1), -- downward dog x5
  (4, 1, 25, 4, 8), -- 25lb goblet squats x4
  (4, 2, 10, 3, 12); -- 10lb bicep curls x3
