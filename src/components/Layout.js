import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import axios from 'axios'

import Signup from './Signup'
import Login from './Login'

const Layout = ({ me }) => {
  
    // JSX 
    return (
    <div>
        <h1>Huntington Hold'em</h1>
        <h2>{me? me.username : 'no user'}</h2>
        <Router>
            <Signup path="/signup" />
            <Login path="/login" />
        </Router>
    </div>
    )

};

export default Layout