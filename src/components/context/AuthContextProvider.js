import React, { useContext, useReducer }from 'react'

/* export fuct reducing context value (authInfo) */
const AuthContext = React.createContext()
export const useAuthInfo = () => useContext(AuthContext) // returns value (authInfo)

/* update function */
const AuthUpdateContext = React.createContext() 
export const useAuthInfoUpdate = () => useContext(AuthUpdateContext) // returns value (setAuthInfo)

/* AUTH INFO REDUCER */
export const AUTH_ACTION = {
        LOGIN: "login", /* (authInfoDispatch({type: AUTH_ACTIONS.LOGIN,  credentials: { username: .. , password: .. })) */
        LOGOUT: "logout", /* (authInfoDispatch({type: AUTH_ACTIONS.LOGOUT} */
        CREATE: "create", /* (authInfoDispatch({type: AUTH_ACTIONS.CREATE,  credentials: { username: .. , password: .. , .. })) */
        SET_ERROR: "set_error",
        CLEAR_ERROR: "clear_error", /* (authInfoDispatch({type: AUTH_ACTIONS.LOGIN,  state: {bearer: ..., userInfo: ...})) */
    }


/* CONTEXT Component */
export const AuthContextProvider = ({ children }) => {

    const authInfoReducer = (state, action) => {
        switch (action.type){
            case AUTH_ACTION.LOGIN:
                return action.state
            
            case AUTH_ACTION.LOGOUT:
                state = {isLoggedIn: false, logError:''}
                return state
    
            case AUTH_ACTION.CREATE:
                /* TO DO */
                return state

            case AUTH_ACTION.SET_ERROR:
                state = {
                    isLoggedIn: false,
                    logError: action.error
                }
                return state

            case AUTH_ACTION.CLEAR_ERROR:
                state = {...state, logError:''}
                return state
    
            default:
                return state
        }
    }

    /* helper functions */
    const logOut = () => {
        authInfoDispatch({type: AUTH_ACTION.LOGOUT})
    }  

    const logIn = async (username, password, role) => {
        let setMessage = {
            type: AUTH_ACTION.LOGIN,
            state: {
                isLoggedIn: true,
                logError:''
            }          
        }

        fetch(`/api/auth/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password }),            
            })
            .then(response => {
                if (!response.ok)
                {
                    if(response.status === 401)
                    {
                        throw Error("Bad username or password");
                    } else {
                        throw Error("Unknown error, try again later");                 
                    }
                }
                return response
            })
            .then(response => {
                setMessage = {
                    ...setMessage, 
                    state: {
                        ...setMessage.state,
                        bearer: response.headers.get("Authorization")
                    }
                }
                return response
            })
            .then(response => response.json())
            .then(data => {
                setMessage = {
                    ...setMessage, 
                    state: {
                        ...setMessage.state,
                        userInfo: data
                    }
                }
                
                if(data.authorities.includes(role))
                {
                    authInfoDispatch(setMessage)
                }
                else
                {
                    authInfoDispatch({
                        type: AUTH_ACTION.SET_ERROR,
                        error: "Role error, try login as another user type"
                    })     
                }
                
            })
            .catch((error) => {
                authInfoDispatch({
                    type: AUTH_ACTION.SET_ERROR,
                    error: error.message
                })       
            })
        }
    
    const clearError = () => authInfoDispatch({type: AUTH_ACTION.CLEAR_ERROR})

    const [authInfo, authInfoDispatch] = useReducer(authInfoReducer, {isLoggedIn: false, logError:''})

    return (
        <AuthContext.Provider value={authInfo}>
            <AuthUpdateContext.Provider value={{logIn: logIn, logOut: logOut, clearError:clearError}}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    )
}
