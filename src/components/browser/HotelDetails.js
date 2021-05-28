import React from 'react'
import  { 
    Link,
    useParams
} from 'react-router-dom'
import { useState, useEffect } from "react";
import RoomInfoCard from './RoomInfoCard'
import HotelComments from './HotelComments';
import { useImagesContext } from '../context/ImagesContextProvider'
import Carousel from 'react-bootstrap/Carousel'

const HotelDetails = ({filterInfo, setFilterInfo}) => {

    const imageBaseUrl = useImagesContext()

    let { hotelId } = useParams();

    /* HOTEL DETAILS */
    const [hotelDetails, setHotelDetails] = useState({
        picturesIds: []
    });

    const [freeRooms, setFreeRooms] = useState([]);

    const [getRoomsTrigger, setGetRoomsTrigger] = useState(0)

    /* Fetch HotelDetails */
    const getHotelDetails = async () => {
        fetch(`/api/hotelDetails/${hotelId}`)
            .then(response => response.json())
            .then(data => {
                    setHotelDetails(data)
                }) 
        }


    /* Fetch FreeRooms */
    const getFreeRooms = async () => {
        /* Validate dates */

        if (filterInfo.dateTo === "") {
            return
        }
        if (filterInfo.dateFrom === "") {
            return
        }
            
        const dateFromObj = new Date(filterInfo.dateFrom)
        const dateToObj = new Date(filterInfo.dateTo)
        if (dateToObj < dateFromObj) {
            return
        }
        
        fetch(`/api/hotelDetails/freeRooms/${hotelId}?dateFrom=${filterInfo.dateFrom}&dateTo=${filterInfo.dateTo}&capacityFrom=${filterInfo.capacityFrom}&capacityTo=${filterInfo.capacityTo}`)
            .then(response => response.json())
            .then(data => {
                    setFreeRooms(data)
                }) 
        }

    /* DATA FETCH USE EFFECT ON WILLMOUNT */
    /* GET Hotel Details and free rooms if exists */ // fetch onWillMount
    useEffect(() => {
        getHotelDetails()
        getFreeRooms()
    }, [getRoomsTrigger]) // eslint-disable-line react-hooks/exhaustive-deps

    const printStars = () => {
        const stars = []
        for (var i=0; i < hotelDetails.avgRating; i++) {
            stars.push(<i key={i} className="fa fa-star" aria-hidden="true"></i>)
        }
        return stars
    }

    const printPrice = () => {
        if (hotelDetails.avgPrice < 50) {
            return <label>$</label>
        } else if (hotelDetails.avgPrice < 120) {
            return <label>$$</label>
        } else {
            return <label>$$$</label>
        }
    } 
    
    return (
            <>
            <div className="jumbotron w-100 mb-0">
                <Link to="/" className="btn btn-light rounded-pill">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i> back
                </Link>
                <div className="container">

      
                    <div className="row m-4 ">
                        <div className="d-flex w-100 justify-content-center align-items-center">
                            <div className="p-2">
                                <Carousel>
                                        {
                                            hotelDetails.picturesIds.map((pictureId, index) => 
                                                {
                                                    return(
                                                        <Carousel.Item>
                                                            <img className="card-img-left rounded rounded-lg" 
                                                                src={`${imageBaseUrl}/${pictureId}`} // zmien na hotel main photo id 
                                                                alt="Hotel main image"
                                                                style={{height: "250px", width: "350px", objectFit: "cover" }}></img>
                                                        </Carousel.Item>
                                                    )
                                                }
                                            )    
                                        }
                                </Carousel>
                            </div>
                            
                            <div className="p-4" style={{minWidth: "400px"}}>
                                <h2>{hotelDetails.name}</h2>
                                <p className="card-text">{hotelDetails.description}</p>
                                {hotelDetails.numOfRooms} rooms <br/>
                                {printStars()}<br/>
                                {printPrice()}<br/>
                            </div>
                        </div>
                    </div>

                    {/*<!-- forms  date (datefrom, dateto)-->*/}
                    <div className="row justify-content-center">
                        <h5>Check rooms availability</h5>
                    </div>

                    <div className="row justify-content-center">
                        <form onSubmit={ (e) => {
                            e.preventDefault()
                            getFreeRooms()
                        }}>    
                            <div className="d-flex form-inline">
                                <div className="border rounded p-2 m-1">
                                    <label>
                                        Reservation date
                                    </label>
                                    <div className="d-flex form-inline">
                                        <div className="d-flex form-inline">
                                            <div className="form-group m-2">
                                                <label htmlFor="dateFrom">From</label>
                                                <input name="dateFrom" type="date" id="dateFrom" className="form-control mx-sm-3"
                                                    value={filterInfo.dateFrom} 
                                                    onChange={(e) => setFilterInfo(
                                                        {
                                                            ...filterInfo,
                                                            dateFrom: e.target.value
                                                        })} 
                                                    />
                                            </div>

                                            <div className="form-group m-2">
                                                <label htmlFor="date_to">To</label>
                                                <input name="dateTo" type="date" id="dateTo" className="form-control mx-sm-3"
                                                    value={filterInfo.dateTo} 
                                                    onChange={(e) => setFilterInfo(
                                                        {
                                                            ...filterInfo,
                                                            dateTo: e.target.value
                                                        })} 
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded p-2 m-1">
                                    <label>
                                        Room capacity
                                    </label>
                                    <div className="d-flex form-inline">
                                        <div className="form-group m-2">
                                            <label htmlFor="dateFrom">From</label>
                                            <input name="dateFrom" type="text" 
                                                id="capacityFrom" className="form-control ml-3 mr-3"
                                                style={{width: "100px"}}
                                                value={filterInfo.capacityFrom} 
                                                onChange={(e) => setFilterInfo(
                                                    {
                                                        ...filterInfo,
                                                        capacityFrom: Number(e.target.value)
                                                    })} 
                                            />
                                        </div>
                                        
                                        <div className="form-group m-2">
                                            <label htmlFor="dateTo">To</label>
                                            <input name="dateTo" type="text" 
                                                id="capacityTo" className="form-control ml-3 mr-3"
                                                value={filterInfo.capacityTo}
                                                style={{width: "100px"}}
                                                onChange={(e) => setFilterInfo(
                                                    {
                                                        ...filterInfo,
                                                        capacityTo: Number(e.target.value)
                                                    })} 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-dark m-2">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            {
                freeRooms.length !== 0 &&

                <div className="container">
                    <div className="row mt-4 mb-4" >
                        {
                            freeRooms.map((room, index) => 
                                <RoomInfoCard key={index} room={room} 
                                              dateFrom={filterInfo.dateFrom}
                                              dateTo={filterInfo.dateTo}
                                              onSuccess={() => setGetRoomsTrigger(getRoomsTrigger + 1)}/>
                            )
                        }
                    </div>
                </div>
            }


            <div className="jumbotron w-100 mb-0">
                <div className="container" style={{minHeight: 500}}>
                    <HotelComments hotelId={hotelId} />
                </div>
            </div>
        </>
    )
}

export default HotelDetails
