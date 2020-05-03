import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import { Link } from "@reach/router";
import axios from 'axios'

import baseUrl from './../utils/baseUrl'

const INITIAL_USER = {
    login: '',
    password: ''
}

const Login = () => {

    const [user, setUser] = React.useState(INITIAL_USER)
    const [disabled, setDisabled] = React.useState(true)

    React.useEffect(() => {
        const isUser = Object.values(user).every(el => Boolean(el))
        isUser ? setDisabled(false) : setDisabled(true)
    }, [user])
  
    // FUNCTIONS
    async function handleChange(e){
        const { name, value } = e.target
        setUser(prevState => ({ ...prevState, [name]: value }))
    }

    async function handleSubmit(){
        try{
            const url = `${baseUrl}/signup`
            const payload = { ...user }
            const response = await axios.post(url, payload)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            console.log("done")
        }
    }


    // JSX 
    return (
    <div className="auth">
    <Form onSubmit={handleSubmit}>
            <Segment>
                <Form.Input
                    fluid
                    icon="envelope"
                    iconPosition="left"
                    label="Login with E-Mail or Username"
                    placeholder="E-Mail or Username"
                    name="login"
                    value={user.login}
                    onChange={handleChange}
                />
                <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    label="Password"
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={user.password}
                    onChange={handleChange}
                />
                <Button
                    disabled={disabled}
                    icon="signup"
                    type="submit"
                    color="purple"
                    content="Let's Play!"
                />
                <Link to="/signup">Signup</Link>
            </Segment>
        </Form>
    </div>
    )

};

export default Login