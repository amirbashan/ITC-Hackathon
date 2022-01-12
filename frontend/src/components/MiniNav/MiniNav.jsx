import React from "react";
import { Outlet, Link } from "react-router-dom";
import './MiniNav.css';

export default function MiniNav() {
  return (
    <nav className="nav shadow mb-2">
      <Link to="/login" className="px-4 nav-link">
        Login
      </Link>
      <Link to="/signup" className="px-2 nav-link">
        SignUp
      </Link>
      <Outlet />
    </nav>
  );
}
