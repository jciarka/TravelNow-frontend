import { useState } from 'react'
import  {
    Link,
    useParams
} from 'react-router-dom'
import ReservationsManagePanel from './ManagerPages/ReservationsManagePanel'
import HotelInfoManagePanel from './ManagerPages/HotelInfoManagePanel'
import HotelAddressManagePanel from './ManagerPages/HotelAddressManagePanel'
import RoomManagePanel from './ManagerPages/RoomManagePanel'
import PhotosManagePanel from './ManagerPages/PhotosManagePanel'

const HotelManagePage = () => {

    let { hotelId } = useParams();
    
    /* Fetch HotelDetails */
    const getHotelDetails = async (setFunction) => {
        fetch(`/api/hotelDetails/${hotelId}`)
            .then(response => response.json())
            .then(data => {
                    setFunction(data)
                }) 
        }


    const [hotel, setHotel] = useState({
        name: "",
        telephoneNum: "",
        description: "",
        address: {
            street: "",
            number: "",
            city: "",
            postalcode: "",
            region: "",
            country: ""
        }     
    })

    const [section, setSection] = useState(0)


    return (
        <>
            
            <div className="p-4 jumbotron">
                <Link to="/hotels" className="btn btn-light rounded-pill mr-auto">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i> back
                </Link>

                <div className="container m-4">
                    <h3>Manage your hotel</h3>
                    <p>
                        Here you can manage your hotel
                    </p>
                </div>
            </div>

            <div className="container">
                <ReservationsManagePanel onAppend={() => setSection(1)} 
                                        onCollapse={() => setSection(0)}
                                        isCurrentSection={() => section === 1 } 
                                        getHotelDetails={getHotelDetails}/>

                <HotelInfoManagePanel onAppend={() => setSection(2)} 
                                        onCollapse={() => setSection(0)}
                                        isCurrentSection={() => section === 2 } />

                <HotelAddressManagePanel onAppend={() => setSection(3)} 
                                        onCollapse={() => setSection(0)}
                                        isCurrentSection={() => section === 3 } />

                <RoomManagePanel onAppend={() => setSection(4)} 
                                        onCollapse={() => setSection(0)}
                                        isCurrentSection={() => section === 4 } />

                <PhotosManagePanel onAppend={() => setSection(5)} 
                                        onCollapse={() => setSection(0)}
                                        isCurrentSection={() => section === 5 } />

            </div>
        </>

    )
}

export default HotelManagePage
