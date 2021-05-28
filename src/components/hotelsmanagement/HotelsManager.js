import { useState, useEffect } from 'react'
import { useAuthInfo } from '../context/AuthContextProvider'
import HotelManageCard from './HotelManageCard'
import HotelAddPage from './HotelAddPage'
import HotelManagePage from './HotelManagePage'
import  {
    Link,
    Route,
    BrowserRouter as Router
} from 'react-router-dom'

const HotelsManager = () => {

    const authInfo = useAuthInfo()

    /* HOTELS */
    const [hotels, setHotels] = useState([])

    const [changeTrigger, setChangeTrigger] = useState(0)

    useEffect(() => {
        getOwnerHotels()
    }, [changeTrigger])  // eslint-disable-line react-hooks/exhaustive-deps
    
    // Update Hotels
    const getOwnerHotels = async () => {

        if(authInfo === null || authInfo.isLoggedIn !== true)
            return

        await fetch(`/api/ownersHotels/${authInfo.userInfo.id}`,
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${authInfo.bearer}`
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setHotels(data)
            } ) 
    }

    return (
        <Router>
            <Route path="/hotels" exact children={
                <>
                    <div className="jumbotron">
                        <div className="container">
                            <h3>Manage your hotels</h3>
                            <span>Here you can manage exising hotels add new offers</span> <br/>
                            <span>Pick hotel you wish to manage from list below or clisc lad icon to add new one</span>
                        </div>
                    </div>
                    <div className="container  d-flex justify-content-center">
                        {
                            hotels.map((hotel, index) => {
                                return <HotelManageCard key={index} hotel={hotel}/>
                            })
                        }
                        <Link to={"/hotels/add"}>
                            <div className="card rounded rounded-lg shadow border mr-2 ml-2 d-flex align-items-center"  
                                style={{"border": "#8f8f8fb6", "width": "300px", "height": "350px", "background": "lightgray"}} >
                                <div className="w-100 p-2 text-center" style={{"margin": "auto"}} >
                                    <label> <i style={{fontSize: 100}} className="fa fa-plus" aria-hidden="true"></i> </label>
                                </div>
                            </div>
                        </Link>
                    </div>
                </>                    
            } />

            <Route path="/hotels/manage/:hotelId" exact children={
                <>
                    <HotelManagePage />
                </>
            }/>

            <Route path="/hotels/add" exact children={
                <>
                    <HotelAddPage onSucceed={() => setChangeTrigger(changeTrigger + 1)} />
                </>
            }/>
        </Router>
    )
}

export default HotelsManager
