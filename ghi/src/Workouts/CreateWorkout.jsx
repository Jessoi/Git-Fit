import React, {useState, useEffect} from 'react';

function CreateWorkout() {
    const [formData, setFormData] = useState({
        name: '',
        userid: userid
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `http://localhost:8000/${userid}/workouts`;
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
        }
    }

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
        </div>
    );
}

export default CreateWorkout;
