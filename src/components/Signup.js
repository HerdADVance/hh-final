import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import { Link } from "@reach/router";
import { handleLogin } from '../utils/auth'
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
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')

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
            setLoading(true)
            setError('')
            const url = `${baseUrl}/signup`
            const payload = { ...user }
            const response = await axios.post(url, payload)
            handleLogin(response.data)
        } catch (error) {
            setError(error.response.data)
            console.log(error.response.data)
        } finally {
            setLoading(false)
        }
    }


    // JSX 
    return (
    <div className="auth">
        <Form onSubmit={handleSubmit} error={Boolean(error)} loading={loading}>
            <Message
                error
                header="Oops!"
                content={error}
            />
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
                <Link to="/login">Login</Link>
            </Segment>
        </Form>
    </div>
    )

};

export default Signup