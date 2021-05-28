import React, { useState } from 'react'
import { useHistory  } from 'react-router-dom'

const CreateAccountPage = () => {

    const history = useHistory() 

    const [username, setUsername] = useState("")
    const validateUserName = () => {
        if(username.length === 0 || username === "")
            return "Username can't be empty"
        else
            return ""
    }

    const [password, setPassword] = useState("")
    const validatePassword = () => {
        if(password.length === 0 || password === "")
            return "Password can't be empty"
        else
            return ""
    }

    const [retypedPassword, setRetypedPassword] = useState("")
    const validateRetypedPassword = () => {
        if(retypedPassword !== password)
            return "Passwords are not equal"
        else
            return ""
    }

    const [email, setEmail] = useState("")   
    const validateEmail = () => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email))
            return "Email is not valid"
        else
            return ""
    }

    const [type, setType] = useState(0)

    const [backendError, setBackendError] = useState()

    const validateAll = () =>
    {
        if (validateUserName() != "") return false
        if (validatePassword() != "") return false
        if (validateRetypedPassword() != "") return false
        if (validateEmail() != "") return false
        return true
    }


    const putNewUser = async () => {
        await fetch("/api/auth/add",
            {
                method: 'PUT',
                headers: {
                    "Content-type": 'application/json',
                },
                body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email,
                        type: type
                    })
            })
            .then(response => {
                if (!response.ok)
                {
                    response.json().then(resp => setBackendError(resp.message.toString()))
                }
                else
                {
                    history.push("/login")
                }
            })

    }
    

    return (
        <div className="container  d-flex justify-content-center">
            <div className="card m-4 rounded rounded-lg w-100 shadow border "  
                    style={{"border": "#8f8f8fb6", "maxWidth": 500, "padding": 60}} >
                        
                    <div className="form-group">
                        <label htmlFor="username">username</label>
                        <input type="text" className="form-control" placeholder="Username"
                               value={username} style={validateUserName() !=="" ? {borderColor: "red"} : {}} 
                               onChange={ (e) => {
                                            setUsername(e.target.value)
                                        }
                                   }/>
                        <label className="text-danger text-sm-left">{validateUserName()}</label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">password</label>
                        <input type="password" className="form-control" placeholder="Password"
                               value={password} style={validatePassword() !=="" ? {borderColor: "red"} : {}} 
                               onChange={ (e) => { 
                                            setPassword(e.target.value)
                                        }
                                   }/>
                            <label className="text-danger text-sm-left">{validatePassword()}</label>                  
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">retype password</label>
                        <input type="password" className="form-control" placeholder="Password"
                               value={retypedPassword} style={validateRetypedPassword() !=="" ? {borderColor: "red"} : {}} 
                               onChange={ (e) => { 
                                            setRetypedPassword(e.target.value)
                                        }
                                   }/> 
                            <label className="text-danger text-sm-left">{validateRetypedPassword()}</label>   
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">email</label>
                        <input type="text" className="form-control" placeholder="Username"
                               value={email} style={validateEmail() !== "" ? {borderColor: "red"} : {}} 
                               onChange={ (e) => {
                                            setEmail(e.target.value)
                                            validateEmail()
                                        }
                                   }/>
                        <label className="text-danger text-sm-left">{validateEmail()}</label>    
                    </div>


                    <label>Account type</label>
                    <div className="form-group border rounded pt-2 pb-2">
                        <div className="form-check m-2">
                            <input className="form-check-input" type="radio" 
                                checked={type === 0 ? 'checked' : ''} 
                                onChange={(e) => setType(0)}/>

                            <label className="form-check-label" htmlFor="price_medium">
                            I will be  looking for rooms offers
                            </label>
                        </div>

                        <div className="form-check m-2">
                            <input className="form-check-input" type="radio" 
                                checked={type === 1 ? 'checked' : ''} 
                                onChange={(e) => setType(1)}/>
                            <label className="form-check-label" htmlFor="price_large">
                            I will be advertising my hotels
                            </label>
                        </div>

                    </div>

                    {
                        backendError !== "" &&
                        <label className="text-danger text-sm-left">{backendError}</label>    
                    }

                    <div className="w-100 text-center">
                        <button disabled={!validateAll()} 
                            type="submit" className="btn btn-primary"
                            onClick={(e)=> putNewUser()}>
                                Create
                            </button>
                    </div>

            </div>
        </div>
    )
}

export default CreateAccountPage
