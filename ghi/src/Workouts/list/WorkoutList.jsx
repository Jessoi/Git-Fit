import React, {useState, useEffect} from 'react';


function UserWorkouts() {
    const [userid, setUserid] = useState(1)
    const [workouts, setWorkouts] = useState([])

    const getListWorkout = async () => {
        const response = await fetch(`http://localhost:8000/workouts/${userid}`)
        if (response.ok){
            const data= await response.json()
            setWorkouts(data.workouts)
        }
    }

    const updateFavorite = async (workoutid, favoriteStatus) => {
        const url = `http://localhost:8000/workouts/${workoutid}/updatefavorite`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({favorite: !favoriteStatus}),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log("fetchconfig", fetchConfig)

                const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newWorkouts = workouts.map( workout => {
                if (workout.workoutid === workoutid){
                    return {...workout, favorite: !favoriteStatus}
                }
                else {
                    return workout
                };
            });
            setWorkouts(newWorkouts);
        }
    };
    const deleteWorkout = async (workoutid) => {
        const request = `http://localhost:8000/workouts/${workoutid}`
        const fetchConfig= {
            method: "delete",
    };

    const response = await fetch(request, fetchConfig);

    if (response.ok){
        alert("workout deleted make this a modal");
        getListWorkout();
    } else{
        alert("unable to delete make this a modal");
    };
    }

        useEffect(() => {
            getListWorkout();
        }, []);

    return (
        <div className="workoutListMainDiv">
            <table>
                <thead className='workoutListTHead'>
                    <tr>
                        <th>Workouts</th>
                        <th>Intensity</th>
                        <th>Favorite</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map(workout =>(
                            <tr key={workout.workoutid}>
                                <td>{workout.name}</td>
                                <td>{workout.intensity}</td>
                                <td>
                                    <button onClick={() =>
                                        updateFavorite(workout.workoutid, workout.favorite)
                                    }>{workout.favorite ? 'fav' : 'no fav'}
                                </button>
                                </td>
                                <td><button onClick={() => deleteWorkout(workout.workoutid)}>
                                Delete</button></td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default UserWorkouts;
