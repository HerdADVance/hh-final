import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import axios from 'axios'

import Signup from './components/Signup'
import Login from './components/Login'

const App = () => {

    const [message, setMessage] = useState('Click above to get started')
  
    // FUNCTIONS
    async function handleButtonClick(){
        const response = await axios.get('http://localhost:3000/')
        console.log(response.data)
        setMessage(response.data)
    }


    // JSX 
    return (
    <div>
        <h1>Huntington Hold'em</h1>
        <Router>
            <Signup path="/signup" />
            <Login path="/login" />
        </Router>
    </div>
    )

};

ReactDOM.render(<App />, document.getElementById("root"));