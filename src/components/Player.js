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
	        cards.push(<img key={i} src="/images/back.png" width="80" />);
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
    <div className="player">
        <h1>{player.username} {player.score}</h1>

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

            {cardsSelected.length == 2 ?

            	<button
            		onClick={() => handlePlayHandClick(cardsSelected)}
            	>
            		Play Hand
            	</button>
            :
            	''

            }

        </>
        :
        	createCards(totalCards)
        }


    </div>
    )

};

export default Player