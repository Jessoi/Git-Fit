import React, {useState, useEffect} from 'react';

function CreateWorkout() {
    const [userid, setUserid] = useState(1)
    const [workouts, setWorkouts] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        userid: userid
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `http://localhost:8000/workouts`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            setFormData({
                name: '',
                userid: userid,
            });
            event.target.reset()
            getlistworkout()
        }
    }
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
            <h1>Create Workout</h1>
            <form onSubmit={handleSubmit} id="create-workout-form">
                <input onChange={handleFormChange} value={formData.name} placeholder='Workout name' required type="text" id='name' name='name' />
            <button>Create workout</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Workouts</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts ? (workouts.map(workout =>{
                        return(
                            <tr key={workout.name}>
                                <td>{workout.name}</td>
                            </tr>
                        )
                    }))
                :
                (<tr><td>No Workouts</td></tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default CreateWorkout;
