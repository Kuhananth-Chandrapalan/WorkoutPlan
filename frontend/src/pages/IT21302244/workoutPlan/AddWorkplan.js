import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AddWorkplan() {
    let navigate = useNavigate();
    const [workplan, setWorkplan] = useState({
        name: "",
        routines: {
            Monday: { day: 'Monday', routine: "", exercises: "", sets: "", repetitions: "" },
            Tuesday: { day: 'Tuesday', routine: "", exercises: "", sets: "", repetitions: "" },
            Wednesday: { day: 'Wednesday', routine: "", exercises: "", sets: "", repetitions: "" },
            Thursday: { day: 'Thursday', routine: "", exercises: "", sets: "", repetitions: "" },
            Friday: { day: 'Friday', routine: "", exercises: "", sets: "", repetitions: "" },
            Saturday: { day: 'Saturday', routine: "", exercises: "", sets: "", repetitions: "" },
            Sunday: { day: 'Sunday', routine: "", exercises: "", sets: "", repetitions: "" }
        }
    });
    const [error, setError] = useState("");

    const onInputChange = (day, field) => (e) => {
        const newRoutines = { ...workplan.routines };
        newRoutines[day] = { ...newRoutines[day], [field]: e.target.value };
        setWorkplan({ ...workplan, routines: newRoutines });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/workplans/with-routines", {
                name: workplan.name,
                routines: workplan.routines
            });
            console.log("Workplan created successfully:", response.data);
            navigate("/WorkoutPlan");
        } catch (err) {
            setError("Failed to create workplan. Please check the details and try again.");
            console.error("Creating workplan failed:", err);
        }
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12 offset-md-0 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4" style={{ color: '#17a2b8' }}>Create Weekly Workplan</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">Name</label>
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Enter plan name"
                                name="name"
                                value={workplan.name}
                                onChange={(e) => setWorkplan({...workplan, name: e.target.value})}
                            />
                        </div>
                        {Object.keys(workplan.routines).map(day => (
                            <div key={day}>
                                <h5 style={{ color: '#17a2b8' }}>{day}</h5>  

                                <div className="mb-3">
                                    <label className="form-label">Routine</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter routine"
                                        value={workplan.routines[day].routine}
                                        onChange={onInputChange(day, 'routine')}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Exercises</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter exercises"
                                        value={workplan.routines[day].exercises}
                                        onChange={onInputChange(day, 'exercises')}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Sets</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter sets"
                                        value={workplan.routines[day].sets}
                                        onChange={onInputChange(day, 'sets')}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Repetitions</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter repetitions"
                                        value={workplan.routines[day].repetitions}
                                        onChange={onInputChange(day, 'repetitions')}
                                    />
                                </div>
                            </div>
                        ))}
                        <button type="submit" className="btn btn-outline-primary">Submit</button>
                        <Link to="/WorkoutPlan" className="btn btn-outline-danger mx-2">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
