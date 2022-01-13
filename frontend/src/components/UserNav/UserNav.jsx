import React, {useState} from 'react'
import './UserNav.css';
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as BurgerSvg } from "../../assets/burger.svg";
const UserNav = () => {
    const [dropdown, setDropdown] = useState(false)

    const handleDropdown = () => {
        setDropdown(!dropdown)
    }
    return (
        <div id="userNav">
            <BurgerSvg onClick={() => {handleDropdown()}}/>
            {
            dropdown &&
                <>
                <Link to="/profile" className="px-4 nav-link bold" >
                    User Profile
                </Link>
                <Link to="/rides" className="px-2 nav-link bold">
                    My Rides
                </Link>
                </>
            }
            <Outlet />
        </div>
    )
}

export default UserNav
