import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import { Link } from "@reach/router";
import { handleLogin } from '../utils/auth'
import axios from 'axios'
import Me from '../contexts/Me'
import baseUrl from './../utils/baseUrl'
import { AuthContext } from "../App";


const INITIAL_USER = {
    login: '',
    password: ''
}

const Login = () => {

    const { dispatch } = React.useContext(AuthContext);

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
            const url = `${baseUrl}/login`
            const payload = { ...user }
            const response = await axios.post(url, payload)
            dispatch({
                type: "LOGIN",
                payload: {
                    user: response.data.user,
                    token: response.data.token
                }
            })
        } catch (error) {
            setError(error.response.data)
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
                    content="Login"
                />
                <Link to="/signup">Signup</Link>
            </Segment>
        </Form>
    </div>
    )

};

export default Login