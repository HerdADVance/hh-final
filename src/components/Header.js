import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import axios from 'axios'

import { AuthContext } from "../App";

const Header = ({ }) => {

    const { state, dispatch } = React.useContext(AuthContext);

    function handleLogout() {
        dispatch({
            type: "LOGOUT"
        })
    }
  
    // JSX 
    return (
    <div className={`header wrap`}>
        <Link to="/" className="logo">Huntington Hold'em</Link>
        <nav>
            <ul>
                <li><Link to="/play">Play</Link></li>
                <li><Link to="/rules">Rules</Link></li>
                <li><Link to="/friends">Friends</Link></li>
                {state.isAuthenticated? <li>{state.me.username}</li> : ''}
            </ul>
        </nav>
        <span onClick={handleLogout}>Logout</span>
    </div>
    )

};

export default Header