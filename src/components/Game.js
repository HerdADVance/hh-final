import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import axios from 'axios'
import cookie from 'js-cookie'
import baseUrl from './../utils/baseUrl'

import openSocket from 'socket.io-client';

import { AuthContext } from "../App";
import Player from './Player'

const Game = ({ location }) => {

	const token = cookie.get('hh-token')

	const [gameInfo, setGameInfo] = React.useState({})

	function sendSocketIO() {
	    socket.emit('example_message', 'demo');
	}

	React.useEffect(() => {

	    async function getGameInfo() {
	        try {
	            const url = `${baseUrl}/api${location.pathname}`
	            const payload = { 
	            	headers: { Authorization: token } 
	            }
	            const response = await axios.get(url, payload)
	            setGameInfo(response.data.gameInfo)
	            console.log(response.data.gameInfo)

	        } catch(error) {
	            console.error(error)
	        }
	    }

	    const gameId = location.pathname.substr(6)
	    const socket = openSocket('http://localhost:3000');
	    socket.on(gameId, function(msg){
	    	console.log(msg)
	    })
	    // socket.join('thisgame');
	    // socket.to('thisgame').emit('nice game', "let's play a game");


	    getGameInfo()

	    return function cleanup() {
	    	socket.disconnect()
	    }

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
        	console.log(response.data)

    	} catch(error) {
            console.error(error)
        }
    }
  
    // JSX 
    return (
    <div className="wrap game">
        <h1>Game</h1>
        <strong>Round {gameInfo.round}</strong>

        <div className="board">
	        {gameInfo.round?
		        gameInfo[`board${gameInfo.round}`].map((card) => (
		        	<div className={`card C${card}`} key={card}></div>
		    	))
		    :
		    	''
		    }
	    </div>
        
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