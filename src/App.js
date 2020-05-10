import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Router, Link, navigate } from "@reach/router";
import axios from 'axios'
import cookie from 'js-cookie'
import baseUrl from './utils/baseUrl'

import Layout from './components/Layout'

export const AuthContext = React.createContext();

const initialState = {
    isAuthenticated: false,
    me: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            console.log("case login")
            cookie.set('hh-token', action.payload.token)
            navigate(`/`)
            return {
                ...state,
                isAuthenticated: true,
                me: action.payload.user
            };
        case "LOGOUT":
            cookie.remove('hh-token')
            navigate('/login')
            return {
                ...state,
                isAuthenticated: false,
                me: null
            };
        default:
            return state;
    }
};

function App() {
    
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {

        async function checkToken(token) {
            console.log("checking token")
            try {
                const payload = { headers: { Authorization: token } }
                const url = `${baseUrl}/api/user`
                const response = await axios.get(url, payload)
                const user = response.data
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        user: user,
                        token: token
                    }
                })
            } catch {
                console.error("Couldn't find user")
                // destroy cookie?
                navigate('/login')
            }
        }

        const token = cookie.get('hh-token')
        if(token && !state.isAuthenticated) checkToken(token)

    }, [state])

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch
            }}
        >
           
            <Layout/>
        </AuthContext.Provider>
    );
}

//export default App;


// class App extends React.Component {

//     constructor(props){
//         super(props);
//         this.state = {
//             me: {}
//         }
//     }

//     async handleLogin(user) {
//         try {
//             //setLoading(true)
//             //setError('')
//             const url = `${baseUrl}/login`
//             const payload = user
//             const response = await axios.post(url, payload)
//             cookie.set('hh-token', response)
//             this.setState({ me: {} })
//             navigate('/')
//         } catch (error) {
//             //setError(error.response.data)
//         } finally {
//             //setLoading(false)
//         }
//     }

//     handleLogout() {
//         cookie.remove('token')
//         navigate('/')
//         this.setState({ me: {} })
//     }

//     async componentDidMount(){
//         console.log("mounting")
//         const token = cookie.get('hh-token')

//         if(token){
//             const payload = { headers: { Authorization: token } }
//             const url = `${baseUrl}/user`
//             const response = await axios.get(url, payload)
//             const user = response.data
//             this.setState({me: user})
//         }
//     }

  
//     // JSX 
//     render(){

//         const meValue = {
//             me: this.state.me,
//             login: this.handleLogin
//             //logout: this.handleLogout
//         }

//         return (<>
//             <Me.Provider value={meValue}>
//                 <Layout/>
//             </Me.Provider>
//         </>)
//     }

// };


ReactDOM.render(<App />, document.getElementById("root"));