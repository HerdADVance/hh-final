import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import axios from 'axios'
import cookie from 'js-cookie'
import baseUrl from './../utils/baseUrl'

import { AuthContext } from "../App";
import Player from './Player'

const Game = () => {

	const token = cookie.get('hh-token')

	const [gameInfo, setGameInfo] = React.useState({})

	React.useEffect(() => {

	    async function getGameInfo() {
	        try {
	            const url = `${baseUrl}/api/game/5eb871a7073e0cec69e31340`
	            const payload = { 
	            	headers: { Authorization: token } 
	            }
	            const response = await axios.get(url, payload)
	            setGameInfo(response.data.gameInfo)

	        } catch(error) {
	            console.error(error)
	        }
	    }

	    getGameInfo()
        

    }, [])
  
    // JSX 
    return (
    <div className="wrap game">
        <h1>Game</h1>
        <strong>Round {gameInfo.round}</strong>
        
        {gameInfo.players?
        <>
        	<Player 
        		player={gameInfo.players[0]}
        		round={gameInfo.round}
        	/>
        	<Player 
        		player={gameInfo.players[1]} 
        		round={gameInfo.round}
        	/>
        </>
        :
        	<p>Loading</p>
    	}

    </div>
    )

};

export default Game