import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";


const Player = ({ player }) => {
  
    // JSX 
    return (
    <div className="player">
        <h1>Player: {player.username}</h1>

        {player.isUser?
        <>
        	{player.cards.map((card) => (
                <div key={card}>
                    <span>{card} </span>
                </div>
            ))}
        </>
        :
        	<p>Back of cards here</p>
        }

    </div>
    )

};

export default Player