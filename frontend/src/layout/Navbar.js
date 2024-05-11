import React from 'react';
import { Link } from 'react-router-dom';
import gym from '../assets/gym1.png';
import boxer from '../assets/profile1.jpeg';
import './navBar.css';  // Make sure this is the correct path to your CSS file

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-body-tertiary" data-bs-theme="dark">
                <div className="container-fluid">
                    <div className='logo'>
                        <img src={gym} alt='logo' width='35' height='35' className='d-inline-block align-text-top' />
                        <Link className="navbar-brand" to="/">Muscles</Link>
                    </div>

                    <div className='maincomponents'>
                        <div className='search-bar'>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>

                        <Link to="/">
                            <span className="material-icons">web_stories</span>
                        </Link>
                        <Link to="/workoutstatus">
                            <span className="material-icons">fitness_center</span>
                        </Link>
                        <Link to="/workoutplan">
                            <span className="material-icons">table</span>
                        </Link>
                        <Link to="/mealplan">
                            <span className="material-icons">restaurant</span>
                        </Link>
                    </div>
                    
                    <div className='navbarProfile'>
                        <Link to="/favorites">
                            <span className="material-icons">favorite</span>
                        </Link>
                        <Link to="/messages">
                            <span className="material-icons">chat_bubble</span>
                        </Link>
                        <Link to="/userprofile">
                            <img src={boxer} alt='addpost' width='36' height='36' style={{borderRadius: "100%", border: "2px solid"}} />
                        </Link>
                    </div>
                </div> 
            </nav>
        </div>
    );
}
