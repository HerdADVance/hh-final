import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";

//const Card = ({ card, numCardsSelected, decrementCardsSelected, incrementCardsSelected }) => {
const Card = ({ card, cardsSelected, addCardToSelected, removeCardFromSelected }) => {

	const [isSelected, setIsSelected] = React.useState('')


    // FUNCTIONS
	function handleClick(card){
        if(isSelected === 'selected'){
            setIsSelected('')
            removeCardFromSelected(card)
        } else {
            if(cardsSelected.length < 2){
                setIsSelected('selected')
                addCardToSelected(card)
            }
        }
	}

  
    // JSX 
    return (
    <div 
        className={`card C${card} ${isSelected}`}
        onClick={() => handleClick(card)}
    >
    </div>
    )

};

export default Card