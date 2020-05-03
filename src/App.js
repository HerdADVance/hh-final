import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import axios from 'axios'

import Signup from './components/Signup'

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
        <Signup/>
    </div>
    )

};

ReactDOM.render(<App />, document.getElementById("root"));