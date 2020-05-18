import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";


const Player = ({ player, round }) => {

	const totalCards = 10 - ( (round - 1) * 2)

	function createCards(n){
	    var cards = [];
	    for(var i =0; i < n; i++){
	        cards.push(<img src="/images/back.png" width="80" />);
	    }
	    return cards;
	}
  
    // JSX 
    return (
    <div className="player">
        <h1>{player.username} {player.score}</h1>

        {player.isUser?
        <>
        	{player.cards.map((card) => (
                <div className={`card C${card}`} key={card}></div>
            ))}
        </>
        :
        	createCards(totalCards)
        }

    </div>
    )

};

export default Player