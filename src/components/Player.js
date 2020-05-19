import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";

import Card from './Card'

const Player = ({ player, round }) => {

	const [numCardsSelected, setNumCardsSelected] = React.useState(0)
	const totalCards = 10 - ( (round - 1) * 2)


	// FUNCTIONS
	function createCards(n){
	    var cards = [];
	    for(var i =0; i < n; i++){
	        cards.push(<img key={i} src="/images/back.png" width="80" />);
	    }
	    return cards;
	}

	function decrementCardsSelected() {
		setNumCardsSelected(numCardsSelected - 1)
	}

	function handlePlayClick() {
		console.log('clicky')
	}

	function incrementCardsSelected() {
		setNumCardsSelected(numCardsSelected + 1)
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
	        			numCardsSelected={numCardsSelected}
	        			decrementCardsSelected={decrementCardsSelected}
	        			incrementCardsSelected={incrementCardsSelected}
	        		/>
            	))
            }

            {numCardsSelected == 2 ?

            	<button
            		onClick={handlePlayClick}
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