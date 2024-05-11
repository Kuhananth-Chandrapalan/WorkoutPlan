import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditWorkplan() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [workplan, setWorkplan] = useState({ name: "", routines: [] });
    const [error, setError] = useState("");

    // Days of the week array
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    useEffect(() => {
        axios.get(`http://localhost:8080/workplans/${id}`)
             .then(response => setWorkplan(response.data))
             .catch(err => {
                 setError("Failed to fetch the workplan. Please try again later.");
                 console.error("Error fetching the workplan:", err);
             });
    }, [id]);

    const onInputChange = (index, field) => e => {
        const newRoutines = [...workplan.routines];
        newRoutines[index] = { ...newRoutines[index], [field]: e.target.value };
        setWorkplan({ ...workplan, routines: newRoutines });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const updatedWorkplan = {
            name: workplan.name,
            dailyRoutines: workplan.routines.map(routine => ({
                id: routine.id,
                day: routine.day,
                routine: routine.routine,
                exercises: routine.exercises,
                sets: routine.sets,
                repetitions: routine.repetitions
            }))
        };

        console.log('Submitting:', updatedWorkplan);
    
        try {
            await axios.put(`http://localhost:8080/workplans/${id}`, updatedWorkplan);
            navigate(`/viewWorkplan/${id}`);
        } catch (err) {
            setError("Failed to update the workplan. Please check your entries and try again.");
            console.error("Error updating the workplan:", err);
        }
    };

    if (!workplan) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12 offset-md-0 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4" style={{ color: '#17a2b8' }}>Edit Weekly Workplan</h2>
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
                                onChange={e => setWorkplan({...workplan, name: e.target.value})}
                            />
                        </div>
                        {workplan.routines.map((routine, index) => (
                            <div key={index}>
                                <h5 style={{ color: '#17a2b8' }}>{daysOfWeek[index]}</h5>  {/* Inline style for day names */}
                                <div className="mb-3">
                                    <label className="form-label">Routine</label>
                                    <input 
                                         type="text"
                                         className="form-control"
                                         placeholder="Enter routine"
                                         value={routine.routine}
                                        onChange={onInputChange(index, 'routine')}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Exercises</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter exercises"
                                        value={routine.exercises}
                                        onChange={onInputChange(index, 'exercises')}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Sets</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter sets"
                                        value={routine.sets}
                                        onChange={onInputChange(index, 'sets')}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Repetitions</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter repetitions"
                                        value={routine.repetitions}
                                        onChange={onInputChange(index, 'repetitions')}
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

export default EditWorkplan;
