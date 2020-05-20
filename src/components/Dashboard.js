import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";
import axios from 'axios'
import cookie from 'js-cookie'
import baseUrl from './../utils/baseUrl'

import { AuthContext } from "../App";
import UnauthenticatedMessage from './UnauthenticatedMessage'

const Dashboard = () => {

    const { state } = React.useContext(AuthContext);
    const token = cookie.get('hh-token')

    const [canRequestGame, setCanRequestGame] = React.useState(true)
    const [openGames, setOpenGames] = React.useState([])

    React.useEffect(() => {

        async function getDashboardInfo() {
            try {
                const url = `${baseUrl}/api/dashboard`
                const payload = { headers: { Authorization: token } }
                const response = await axios.get(url, payload)
                setCanRequestGame(response.data.canRequestGame)
                setOpenGames(response.data.openGames)

            } catch(error) {
                console.error(error)
            }
        }

        if(state.isAuthenticated) getDashboardInfo()
        

    }, [])

    async function handlePlayRandomOpponentClick(){
        try{
            const url = `${baseUrl}/api/playRandomOpponent`
            const payload = { headers: { Authorization: token } }
            const response = await axios.get(url, payload)
            setCanRequestGame(response.data.canRequestGame)
            if(response.data.gameId) navigate(`/game/${response.data.gameId}`)
        } catch (error) {
            console.log(error)
            //setError(error.response.data)
        } 
    }
  
    // JSX 
    return (
    <div className="wrap">
        <h1>Dashboard</h1>

        {state.isAuthenticated ?
        <>
            {canRequestGame ?
                <p><button onClick={handlePlayRandomOpponentClick}>Play Random Opponent</button></p>
            :
                <p>Waiting on opponent. New game will start soon.</p>
            }
            <h2>Current Games</h2>
            <table>
                <thead><tr>
                    <th>Opponent</th>
                    <th>Score</th>
                    <th>Round</th>
                </tr></thead><tbody>
                {openGames.map((game) => (
                    <tr key={game.id}>
                        <td><Link to={"game/" + game.id}>{game.opponentUsername}</Link></td>
                        <td>{game.userScore} - {game.opponentScore}</td>
                        <td>{game.round}</td>
                    </tr>
                ))}
            </tbody></table>

            <h2>Completed Games</h2>
        </>
        :
            <UnauthenticatedMessage/>
        }

    </div>
    )

};

export default Dashboard