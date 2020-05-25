import React, { useState, useEffect, useRef } from "react";
import { Router, Link, navigate } from "@reach/router";
import axios from 'axios'
import cookie from 'js-cookie'
import baseUrl from './../utils/baseUrl'
import findIndex from 'lodash/findIndex'

import openSocket from 'socket.io-client';

import { AuthContext } from "../App";
import Player from './Player'

const Game = ({ location }) => {

	const token = cookie.get('hh-token')
	const gameId = location.pathname.substr(6)

	const [gameInfo, setGameInfo] = React.useState({})

	const { current: socket } = useRef(openSocket('http://localhost:3000'));
	

	React.useEffect(() => {

	    async function getGameInfo() {

	        try {
	            const url = `${baseUrl}/api${location.pathname}`
	            const payload = { 
	            	headers: { Authorization: token } 
	            }
	            const response = await axios.get(url, payload)
	            await setGameInfo(response.data.gameInfo)

	        } catch(error) {
	            console.error(error)
	        }
	    }

	    getGameInfo()
	    
	    socket.open()
	    socket.on(gameId, function(msg){

			//otherFunction(msg)

			if(msg.type = 'play_hand'){
				
				// Update new round
				if(msg.newRound){

					console.log(msg)

					// setGameInfo(prevGameInfo => ({
		   //  			...prevGameInfo,
		   //  			[msg.playedPlayerId]: {
		   //  				...prevGameInfo[msg.playedPlayerId],
		   //  				score: msg
		   //  			}	    			
		   //  		}))

				// Find right player to mark as played
				} else {
			   		setGameInfo(prevGameInfo => ({
		    			...prevGameInfo,
		    			[msg.playedPlayerId]: {
		    				...prevGameInfo[msg.playedPlayerId],
		    				hasPlayed: true
		    			}	    			
		    		}))
				}
				

			}
		})
	    

	    return function cleanup() {
	    	socket.disconnect()
	    	socket.off(gameId);
	    }

    }, [])

	function handleConsoleClick(){
		console.log(gameInfo)
	}

    async function handlePlayHandClick(hand) {
    	console.log(gameInfo)
    	try{
    		const url = `${baseUrl}/api${location.pathname}/playHand`
    		const gameId = location.pathname.substr(6)
        	const payload = { 
        		hand,
        		gameId
        	}
        	const headers = { headers: { Authorization: token } }
        	const response = axios.post(url, payload, headers)
        	

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
        
        {gameInfo.playerIds?
        <>
        	<Player 
        		player={gameInfo[gameInfo.playerIds[0]]}
        		round={gameInfo.round}
        		handlePlayHandClick={handlePlayHandClick}
        	/>
        	<Player 
        		player={gameInfo[gameInfo.playerIds[1]]} 
        		round={gameInfo.round}
        		handlePlayHandClick={handlePlayHandClick}
        	/>
        </>
        :
        	<p>Loading</p>
    	}

    	<button className="console" onClick={handleConsoleClick}>Console Game Info</button>

    </div>
    )

};

export default Game