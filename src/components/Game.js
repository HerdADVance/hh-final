import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import axios from 'axios'
import cookie from 'js-cookie'
import baseUrl from './../utils/baseUrl'

import { AuthContext } from "../App";

const Game = () => {

	const token = cookie.get('hh-token')

	React.useEffect(() => {

	    async function getGameInfo() {
	        try {
	        	console.log("gameinfo")
	            const url = `${baseUrl}/api/game/5eb871a7073e0cec69e31340`
	            const payload = { 
	            	headers: { Authorization: token } 
	            }
	            const response = await axios.get(url, payload)
	            console.log(response.data.game)

	        } catch(error) {
	            console.error(error)
	        }
	    }

	    getGameInfo()
        

    }, [])
  
    // JSX 
    return (
    <div className="wrap">
        <h1>Game</h1>
    </div>
    )

};

export default Game