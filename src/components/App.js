import Header from './Header'
import Browser from './Browser'
import LoginForm from './login/LoginForm'
import { AuthContextProvider } from './context/AuthContextProvider'
import { ImagesContextProvider } from './context/ImagesContextProvider'

//import { useState } from 'react'
import  { BrowserRouter as Router, Route} from 'react-router-dom'
import HotelManager from './hotelsmanagement/HotelsManager'
import ReservationsManager from './reservationsmanagemnet/ReservationsManager'
import CreateAccountPage from './login/CreateAccountPage'

const App = () => {
    //const serverUrl = "http://localhost:8080/"
    //const [loggedIn, setLoggedIn] = useState(false)

    return (
        <ImagesContextProvider>
            <AuthContextProvider>
                <Router>
                    <Header />

                    <Route path='/' exact render={(props) => (
                            <Browser />
                        )
                    }/>

                    <Route path='/login' exact render={(props) => (
                            <LoginForm />
                        )
                    }/>

                    <Route path='/hotels' exact render={(props) => (
                            <HotelManager/>
                        )
                    }/>

                    <Route path='/reservations' exact render={(props) => (
                        <>
                            <ReservationsManager />
                        </>
                        )
                    }/>
                    
                    <Route path='/createAccount' exact render={(props) => (
                        <>
                            <CreateAccountPage />
                        </>
                    )
                    }/>
                </Router>
            </AuthContextProvider>
        </ImagesContextProvider>
    )
}

export default App
