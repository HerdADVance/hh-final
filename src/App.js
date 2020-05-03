import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link } from "@reach/router";
import axios from 'axios'
import cookie from 'js-cookie'
import baseUrl from './utils/baseUrl'

import Layout from './components/Layout'


class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            me: {}
        }
    }

    async componentDidMount(){
        console.log("mounting")
        const token = cookie.get('hh-token')
        const payload = { headers: { Authorization: token } }
        const url = `${baseUrl}/user`
        const response = await axios.get(url, payload)
        const user = response.data
        this.setState({me: user})
    }

  
    // JSX 
    render(){
        return (
            <Layout me={this.state.me} />
        )
    }

};


ReactDOM.render(<App />, document.getElementById("root"));