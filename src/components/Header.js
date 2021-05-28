import  { Link } from 'react-router-dom'

import { useAuthInfo, useAuthInfoUpdate } from './context/AuthContextProvider'

import TravelNowLogo    from '../icons/airplane.svg'
import HotelLogo        from '../icons/hotel-building.svg'
import RestaurantLogo   from '../icons/restaurant.svg'
import HistoryLogo      from '../icons/city-hall.svg'
import PopcornLogo      from '../icons/popcorn.svg'
import FootballLogo     from '../icons/football.svg'
import LoginIcon        from '../icons/login.png'
import LogoutIcon       from '../icons/exit.svg'

const Header = () => {

    const authInfoUpdate = useAuthInfoUpdate()
    const authInfo = useAuthInfo()

    return (
        <>
            <div className="row flex-nowrap justify-content-center align-items-center">
                <div className="m-4">
                    <a className="text-muted" href="/">
                        <div className="d-flex justify-content-center">
                            <img className="mr-4" src={TravelNowLogo} width="60" height="60" alt="logo" />
                            <h1> Travel now! </h1>
                        </div>
                    </a>
                </div>   
            </div>

            {/*<!-- NAVBAR -->*/}
            <nav className="navbar navbar-expand-lg navbar-light shadow-lg border" style={{"border": "#8f8f8fb6"}} >

                 {/*<!-- Links -->*/}
                <div className="navbar-brand text-center">
                    <div>
                        <div className="prompt">
                            Stay wherever you want!
                        </div>
                        <div className="d-flex justify-content-start">
                            <Link to="/">
                                <button className="btn btn-light rounded-1 mr-3 nav-button">
                                    <img src={HotelLogo} width="20" height="20" alt=""/>
                                    Hotels
                                </button>
                            </Link>
                            <Link to="/">
                                <button className="btn btn-light rounded-1 mr-3 nav-button">
                                    <img src={RestaurantLogo} width="20" height="20" alt=""/>
                                    Restaurants
                                </button>
                                </Link>
                            <Link to="/">
                                <button className="btn btn-light rounded-1 mr-3 nav-button">
                                    <img src={HistoryLogo} width="20" height="20" alt=""/>
                                    History
                                </button>
                            </Link>
                            <Link to="/">
                                <button className="btn btn-light rounded-1 mr-3 nav-button">
                                    <img src={PopcornLogo} width="20" height="20" alt=""/>
                                    Atractions
                                </button>
                            </Link>
                            <Link to="/">
                                <button className="btn btn-light rounded-1 mr-3 nav-button">
                                    <img src={FootballLogo} width="20" height="20" alt=""/>
                                    Sport
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/*<!-- LOGIN -->*/}
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item active">

                            { authInfo.isLoggedIn ? 

                                <div className="nav-item dropdown position-static justify-content-end">
                                    <button className="btn btn-light rounded-50 dropbtn" style={{"display": "block"}}> 
                                        <img src={LoginIcon} width="30" height="30" style={{"fill": "white"}} alt=""/>
                                        <div>{ authInfo.userInfo.userName }</div> 
                                    </button> 
                                    <div className="dropdown-content">
                                        {
                                            authInfo.userInfo.authorities.includes("ROLE_USER") ?
                                            (
                                                <Link to="/reservations">
                                                    My reservations
                                                </Link>
                                            ) : ""
                                        }
                                        {
                                            authInfo.userInfo.authorities.includes("ROLE_OWNER") ?
                                        
                                            (
                                                <Link to="/hotels">
                                                    My hotels
                                                </Link>
                                            ) : ""
                                            
                                        }

                                        <Link to="/" onClick={ (e) => {
                                            e.preventDefault()
                                            authInfoUpdate.logOut()    
                                            }                                
                                        }>
                                            Log out <img className="bl-2" src={LogoutIcon} width="15" height="15" alt=""/>
                                        </Link>
                                    </div>
                                </div>
                                :
                                <div className="nav-item dropdown position-static justify-content-end">
                                    <Link to="/login">
                                        <button className="btn btn-light rounded-50 dropbtn" style={{"display": "block"}}> 
                                            <img src={LoginIcon} width="30" height="30" style={{"fill": "white"}} alt=""/>
                                            <div>Log in!</div>
                                        </button> 
                                    </Link>
                                </div>                              
                                }
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header
