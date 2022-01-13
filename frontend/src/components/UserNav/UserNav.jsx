import React from 'react'
import './UserNav.css';
import { Outlet, Link } from "react-router-dom";

const UserNav = () => {

    return (
        <div id="userNav">
            <Link to="/profile" className="px-4 nav-link bold" >
                User Profile
            </Link>
            <Link to="/rides" className="px-2 nav-link bold">
                My Rides
            </Link>
            <Outlet />
        </div>
    )
}

export default UserNav
