import React, {useState, useEffect} from 'react';

function UserWorkouts() {
    const [userid, setUserid] = useState(1)
    const [workouts, setWorkouts] = useState([])

    const getlistworkout = async () => {
        const response = await fetch(`http://localhost:8000/workouts/${userid}`)
        if (response.ok){
            const data= await response.json()
            setWorkouts(data.workouts)
        }
    }

        useEffect(() => {
            getlistworkout();
        }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Workouts</th>
                    <th>Muscle Group</th>
                    <th>Intnsity</th>
                    <th>Favorite</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {workouts.map(workout =>(
                        <tr key={workout.workoutid}>
                            <td>{workout.name}</td>
                        </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UserWorkouts;
