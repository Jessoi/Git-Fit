import React, {useState, useEffect} from 'react';

function EditWorkout() {
    const [userid, setUserid] = useState(1)
    const [workouts, setWorkouts] = useState([])
    const [formData, setFormData] = useState({
        userid: userid,
        name: '',
        intensity: '',
        favorite: false
    })

    const getListWorkout = async () => {
        const response = await fetch(`http://localhost:8000/workouts/${userid}`)
        if (response.ok){
            const data= await response.json()
            setWorkouts(data.workouts)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `http://localhost:8000/workouts/${workoutid}`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            setFormData({
            userid: userid,
            name: '',
            intensity: '',
            favorite: ''
            });
            event.target.reset()
        }
    }

        useEffect(() => {
            handleSubmit();
            getListWorkout();
        }, []);

        const handleFormChange = (e) => {
            const value = e.target.value;
            const inputName = e.target.name;

            setFormData({
                ...formData,
                [inputName]: value
            });
        }

    return (
        <div>
            <h1>Update Workout</h1>
            <h3>Update Name & Intensity</h3>
            <form onSubmit={handleSubmit} id="update-workout-form">
                <input onChange={handleFormChange} value={formData.name} placeholder='Workout name' required type="text" id='name' name='name' />
                <input onChange={handleFormChange} value={formData.intensity} placeholder='Intensity' required type="text" id='intensity' name='intensity' />
                <button>Update fields</button>
                <p></p>
            </form>
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
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default EditWorkout;
