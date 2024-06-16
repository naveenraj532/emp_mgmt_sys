import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

const Header = () => {
    return (
        <>
            <nav>
                <h2>Employee Management System</h2>
                <ul>
                    <Link to="/getemployees"><li style={{textDecoration:"none"}}>Employees</li></Link>
                    <Link to="/addemployee"><li style={{textDecoration:"none"}}>Post Employee</li></Link>
                    <Link to="/login"><li style={{textDecoration:"none"}}>Logout</li></Link>
                </ul>
            </nav>
        </>
    );
};

export default Header;
