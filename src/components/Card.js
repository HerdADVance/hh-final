import React, { useState, useEffect } from "react";
import { Router, Link, navigate } from "@reach/router";

const Card = ({ card, numCardsSelected, decrementCardsSelected, incrementCardsSelected }) => {

	const [isSelected, setIsSelected] = React.useState('')


    // FUNCTIONS
	function handleClick(){
        if(isSelected === 'selected'){
            setIsSelected('')
            decrementCardsSelected()
        } else {
            if(numCardsSelected < 2){
                setIsSelected('selected')
                incrementCardsSelected()
            }
        }
	}

  
    // JSX 
    return (
    <div 
        className={`card C${card} ${isSelected}`}
        onClick={handleClick}
    >
    </div>
    )

};

export default Card