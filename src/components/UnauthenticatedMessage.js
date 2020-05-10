import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "@reach/router";

const UnauthenticatedMessage = () => {

    return (
    	<p>Please <Link to="/login">login</Link> or <Link to ="signup">signup</Link> in order to play.</p>
    )

};

export default UnauthenticatedMessage

