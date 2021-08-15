import React from "react";
import { Link } from "react-router-dom";

function navbar() {
  return (
    <nav
      className='navbar navbar-dark bg-dark navbar-expand-sm fixed-top'
      style={{ padding: "0px 10px" }}>
      <Link to='/' className='navbar-brand'>
        Exercise Tracker
      </Link>
      <div className='collapse navbar-collapse justify-content-end'>
        <ul className='navbar-nav mr-auto'>
          <li className='navbar-item'>
            <Link to='/' className='nav-link'>
              Exercises
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to='/create' className='nav-link'>
              Create Exercises
            </Link>
          </li>
          <li className='navbar-item'>
            <Link to='/user' className='nav-link'>
              Create User
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default navbar;
