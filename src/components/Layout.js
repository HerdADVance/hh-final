import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import axios from 'axios'

import Header from './Header'
import Signup from './Signup'
import Login from './Login'

const Layout = () => {
  
    // JSX 
    return (
    <>
        <Header/>
        <Router>
            <Signup path="/signup" />
            <Login path="/login" />
        </Router>
    </>
    )

};

export default Layout