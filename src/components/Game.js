import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import axios from 'axios'
import cookie from 'js-cookie'
import baseUrl from './../utils/baseUrl'

import { AuthContext } from "../App";
import Player from './Player'

const Game = ({ location }) => {

	const token = cookie.get('hh-token')

	const [gameInfo, setGameInfo] = React.useState({})

	React.useEffect(() => {

	    async function getGameInfo() {
	        try {
	            const url = `${baseUrl}/api${location.pathname}`
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

    async function handlePlayHandClick(hand) {
    	console.log(hand)
    	try{
    		const url = `${baseUrl}/api${location.pathname}/playHand`
    		const gameId = location.pathname.substr(6)
        	const payload = { 
        		hand,
        		gameId
        	}
        	const headers = { headers: { Authorization: token } }
        	const response = await axios.post(url, payload, headers)

    	} catch(error) {
            console.error(error)
        }
    }
  
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
        		handlePlayHandClick={handlePlayHandClick}
        	/>
        	<Player 
        		player={gameInfo.players[1]} 
        		round={gameInfo.round}
        		handlePlayHandClick={handlePlayHandClick}
        	/>
        </>
        :
        	<p>Loading</p>
    	}

    </div>
    )

};

export default Game