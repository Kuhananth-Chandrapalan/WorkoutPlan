import React from 'react';
import muscels from '../../../assets/lifting.jpg';
import rope from '../../../assets/rope.jpg';
import treadmil from '../../../assets/treadmil.jpg';
import './rightPane.css';

export default function RightHomePane() {
  return (
    <div className='rightPane'>
        <div className="card" data-bs-theme="dark">
            <img src={muscels} className="card-img-top" alt="A person lifting weights" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button className="btn btn-primary">Go somewhere</button>
            </div>
        </div>

        <div className="card" data-bs-theme="dark">
            <img src={rope} className="card-img-top" alt="A person doing rope exercises" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button className="btn btn-primary">Go somewhere</button>
            </div>
        </div>

        <div className="card" data-bs-theme="dark">
            <img src={treadmil} className="card-img-top" alt="A person running on a treadmill" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button className="btn btn-primary">Go somewhere</button>
            </div>
        </div>
    </div>
  )
}
