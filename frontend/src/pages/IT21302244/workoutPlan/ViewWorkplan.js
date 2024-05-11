import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ViewWorkplan.css'; // Import your CSS for styling

function ViewWorkplan() {
    const [workplan, setWorkplan] = useState({
        name: "",
        routines: []
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const loadWorkplan = async () => {
            try {
                const result = await axios.get(`http://localhost:8080/workplans/${id}`);
                setWorkplan(result.data);
            } catch (error) {
                console.error('Failed to load workplan:', error);
            }
        };
        loadWorkplan();
    }, [id]);

    // Navigate to edit page
    const handleEdit = () => {
        navigate(`/editWorkplan/${id}`);
    };

    return (
        <div className="container view-workplan">
            <div className="workplan-header">
                <h2>Workplan Details for {workplan.name}</h2>
                <Link className="btn btn-primary" to="/WorkoutPlan">Back to Home</Link>
            </div>
            <section className="workplan-details">
                {workplan.routines.map((routine, index) => (
                    <div className="routine-details" key={index}>
                        <h3>{routine.day}</h3> {/* assuming 'day' exists on routine */}
                        <div className="detail">
                            <h4>Routine</h4>
                            <p>{routine.routine}</p>
                        </div>
                        <div className="detail">
                            <h4>Exercises</h4>
                            <p>{routine.exercises}</p>
                        </div>
                        <div className="detail">
                            <h4>Sets</h4>
                            <p>{routine.sets}</p>
                        </div>
                        <div className="detail">
                            <h4>Repetitions</h4>
                            <p>{routine.repetitions}</p>
                        </div>
                    </div>
                ))}
            </section>
            <div className="workplan-actions">
                <button onClick={handleEdit} className="btn btn-warning">Edit</button>
            </div>
        </div>
    );
}

export default ViewWorkplan;
