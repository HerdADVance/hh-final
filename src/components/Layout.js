import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import axios from 'axios'

import Header from './Header'
import Signup from './Signup'
import Login from './Login'
import Dashboard from './Dashboard'
import Game from './Game'

const Layout = () => {
  
    // JSX 
    return (
    <>
        <Header/>
        <Router className="main-wrap">
            <Signup path="/signup" />
            <Login path="/login" />
            <Dashboard path="/"/>
            <Game path="/game/:id"/>
        </Router>
    </>
    )

};

export default Layout