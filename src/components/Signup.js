import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'

import baseUrl from './../utils/baseUrl'

const INITIAL_USER = {
    email: '',
    username: '',
    password: ''
}

const Signup = () => {

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
    <Form onSubmit={handleSubmit}>
        <Segment>
            <Form.Input
                fluid
                icon="envelope"
                iconPosition="left"
                label="E-Mail"
                placeholder="E-Mail"
                name="email"
                value={user.email}
                onChange={handleChange}
            />
            <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                label="Username"
                placeholder="Username"
                name="username"
                value={user.username}
                onChange={handleChange}
            />
            <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                label="Password"
                placeholder="Password"
                name="password"
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
        </Segment>
    </Form>
    )

};

export default Signup