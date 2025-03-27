import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home">
            <h1>Welcome to Financial Manager</h1>
            <Link to="/expenses">
                <button className="home-button">Go to Expenses</button>
            </Link>
        </div>
    );
}

export default Home;
