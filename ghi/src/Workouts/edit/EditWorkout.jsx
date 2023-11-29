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
            <form onSubmit={handleSubmit} id="create-workout-form">
                <input onChange={handleFormChange} value={formData.name} placeholder='Workout name' required type="text" id='name' name='name' />
                <input onChange={handleFormChange} value={formData.intensity} placeholder='Intensity' required type="text" id='intensity' name='intensity' />
            <button>Update fields</button>
            <p>down here you will need to put a list of workouts that can be selected to edit the exercises</p>
            </form>
        </div>
    );
}
export default EditWorkout;
