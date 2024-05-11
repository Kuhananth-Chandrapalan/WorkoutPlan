import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './centerPane.css';

const CenterPane = () => {
    const [workplans, setWorkplans] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        loadWorkplans();
    }, []);

    const loadWorkplans = async () => {
        try {
            const response = await axios.get('http://localhost:8080/workplans');
            setWorkplans(response.data);
        } catch (err) {
            setError('Failed to fetch workplans. Please ensure that the backend server is running.');
            console.error('Error fetching workplans: ', err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/workplans/${id}`);
            loadWorkplans();
            alert('Workplan deleted successfully');
        } catch (error) {
            console.error("Error deleting workplan: ", error);
            setError('Error deleting workplan. Please try again.');
        }
    };

    const handleFileUpload = async (file, id) => {
        const formData = new FormData();
        formData.append('imageFile', file);

        try {
            await axios.post(`http://localhost:8080/workplans/${id}/uploadImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            loadWorkplans();
        } catch (error) {
            console.error('Error uploading image:', error);
            setError('Error uploading image. Please try again.');
        }
    };

    const triggerFileInput = (id) => {
        document.getElementById(`fileInput-${id}`).click();
    };

    return (
        <div className='container py-1' style={{ paddingTop: '1px', paddingBottom: '1px' }}>
            <div className="fixed-top-container">
                <Link to="/addWorkplan" className="btn btn-primary" style={{ padding: '5px 10px', fontSize: '14px' }}>Add Workout Plan</Link>
            </div>
            <div style={{ paddingTop: '1rem' }}>
                <h1 className="text-center mb-4" style={{ color: '#17a2b8' }}>Weekly Workout Plans</h1>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {workplans.map(plan => (
                    <div key={plan.id} className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-3">{plan.name}</h5>
                            <div className="text-center mb-3">
                                {plan.image ?
                                    <img src={`data:image/jpeg;base64,${plan.image}`} alt="Workplan" style={{ width: '100%', maxHeight: '300px' }} /> :
                                    <div className="add-image-placeholder" style={{ width: '100%', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', color: '#ccc' }}>
                                        Add image
                                    </div>
                                }
                            </div>
                            {plan.image ?
                                <button onClick={() => triggerFileInput(plan.id)} className="btn btn-secondary mb-3">Change</button> :
                                <button onClick={() => triggerFileInput(plan.id)} className="btn btn-secondary mb-3">Choose File</button>
                            }
                            <input type="file" id={`fileInput-${plan.id}`} onChange={(e) => handleFileUpload(e.target.files[0], plan.id)} style={{ display: 'none' }} className="form-control" />
                            <div className="mt-3">
                                <Link to={`/viewWorkplan/${plan.id}`} className="btn btn-primary mr-2">View</Link>
                                <button onClick={() => handleDelete(plan.id)} className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CenterPane;
