import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthInfo, useAuthInfoUpdate } from '../context/AuthContextProvider'

const LoginForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const authInfoUpdate = useAuthInfoUpdate()
    const authInfo = useAuthInfo()

    const [whoLogin, setWhoLogIn] = useState("ROLE_USER")

    return (
        <div className="container  d-flex justify-content-center">
            <div className="card m-4 rounded rounded-lg w-100 shadow border "  
                    style={{"border": "#8f8f8fb6", "maxWidth": 500}} >

                <div className="d-flex">    
                    <button className={"btn btn-small rounded-0 " + ( whoLogin === "ROLE_USER" ? "btn-primary" : "btn-secondary" )}
                        onClick={(e) => {
                            e.preventDefault()
                            setWhoLogIn("ROLE_USER")
                        }}>
                        Login as user
                    </button>

                    <button className={"btn btn-small rounded-0 " + ( whoLogin === "ROLE_OWNER" ? "btn-primary" : "btn-secondary" )}
                        onClick={(e) => {
                            e.preventDefault()
                            setWhoLogIn("ROLE_OWNER")
                        }}>
                        Login as owner
                    </button>


                </div>

                <div style={{padding: 60}} >
                    
                    {
                        whoLogin === "ROLE_USER" && <h2>Welcome user!</h2>
                    }

                    {
                        whoLogin === "ROLE_OWNER" && <h2>Welcome hotel owner!</h2>
                    }
                    

                    <form onSubmit={ (e) => { 
                        e.preventDefault()
                        authInfoUpdate.logIn(
                                username,
                                password,
                                whoLogin
                                )
                        }
                    }>
                        <div className="form-group">
                            <label htmlFor="username">username</label>
                            <input type="text" className="form-control" id="username" aria-describedby="username" placeholder="Username"
                                value={username} onChange={ (e) => {
                                                setUsername(e.target.value)
                                                authInfoUpdate.clearError()
                                            }
                                    }/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="pasword" placeholder="Password"
                                value={password} onChange={ (e) => { 
                                                setPassword(e.target.value)
                                                authInfoUpdate.clearError()
                                            }
                                    }/>                          
                        </div>
                        { authInfo.logError !== "" &&
                        <div className="text-center">
                            <label className="text-danger">
                                {authInfo.logError}
                            </label>
                        </div>
                        }

                        <div className="w-100 text-center">
                            <button type="submit" className="btn btn-primary">Log in</button>
                        </div>

                        <div className="w-100 mt-4 text-center">
                                You don't have an account yet? <br/>
                            <Link to="/createAccount" className="btn btn-dark">Create account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default LoginForm
