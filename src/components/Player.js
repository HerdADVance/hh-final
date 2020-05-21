import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";

import Card from './Card'

const Player = ({ player, round, handlePlayHandClick }) => {

	const totalCards = 10 - ( (round - 1) * 2)
	const [cardsSelected, setCardsSelected] = React.useState([])

	// FUNCTIONS
	function createCards(n){
	    var cards = [];
	    for(var i =0; i < n; i++){
	        cards.push(<div className="card" key={i}></div>);
	    }
	    return cards;
	}


	function addCardToSelected(card) {
		setCardsSelected([...cardsSelected, card])
	}

	function removeCardFromSelected(card) {
		setCardsSelected(cardsSelected.filter(item => item !== card))
	}
  
    // JSX 
    return (
    <div className={player.isUser? 'player me' : 'player'}>

    	<div className="player-info">
        	<span className="player-score">{player.score}</span>
        	<span className="player-username">{player.username}</span>

        	{player.isUser?
	        	<button
	        		className="player-play"
	        		onClick={() => handlePlayHandClick(cardsSelected)}
	        		disabled={cardsSelected.length === 2 ? false : true }
	        	>
	        		Play Hand
	        	</button>
	        :
	        	<button className="player-play">Playing</button>
	    	}
        </div>

        {player.isUser?
        <>
        	{player.cards
        		.sort()
        		.map((card) => (
	                <Card
	        			key={card}
	        			card={card}
	        			cardsSelected={cardsSelected}
	        			addCardToSelected={addCardToSelected}
	        			removeCardFromSelected={removeCardFromSelected}
	        		/>
            	))
            }

        </>
        :
        	createCards(totalCards)
        }


    </div>
    )

};

export default Player