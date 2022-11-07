import React from 'react'
import { Link } from 'react-router-dom';
import './Topbar.css'
import PermIdentityIcon from "@material-ui/icons/PermIdentity";const Topbar = () => {
  return (
    <div className="topbar">
      <ul className="topbar-list">
        <li>
          <Link to='about'>About</Link>
        </li>
        <li>
          <Link to='contact'>Contact Us</Link>
        </li>
        <li>
          <Link to='/login'>
            <PermIdentityIcon />
            <span>Sign in</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Topbar