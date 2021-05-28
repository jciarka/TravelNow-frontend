import React from 'react'
import { useState, useEffect } from 'react'
import  {
    useParams
} from 'react-router-dom'
import { useAuthInfo } from '../../context/AuthContextProvider'


const HotelAddressManagePanel = ({onAppend, onCollapse, isCurrentSection}) => {
    
    const authInfo = useAuthInfo()    
    let { hotelId } = useParams()
    const [errors, setErrors] = useState([])
    const [changeTrigger, setChangeTrigger] = useState(0)
    
    /* Fetch HotelDetails */
    const getHotelDetails = async (setFunction) => {
        fetch(`/api/hotelDetails/${hotelId}`)
            .then(response => response.json())
            .then(data => {
                    setFunction(data)
                }) 
        }

    const [hotel, setHotel] = useState({})

    useEffect(() => {
        getHotelDetails(setHotel)
    }, [isCurrentSection(), changeTrigger])  // eslint-disable-line react-hooks/exhaustive-deps


    const updateAddress = async (room) => {
        await fetch("/api/hotels/updateAddress",
            {
                method: 'PUT',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": `Bearer ${authInfo.bearer}`
                },
                body: JSON.stringify({
                        hotelId: hotelId,
                        address: hotel.address
                    })
            })
            .then(response => {
                if (!response.ok)
                {
                    response.json().then(resp => { 
                        setBackendErrors(resp.message.toString())
                    })   
                }
                else
                {
                    setChangeTrigger(changeTrigger + 1)
                    setErrors([])
                }
             })
    }

    const setBackendErrors = (csvErrorMessage) => {
        setErrors(csvErrorMessage.split(";"))
        console.log(csvErrorMessage.split(";"))
    }

    return (
        <div className="card p-3 m-2 rounded rounded-lg shadow border " >
            <h5>Change address information</h5>

            {
                isCurrentSection() && (

                    <div className="form-group">
                    <div className="row">

                        <div className="col-lg-5 mt-2 mb-2">
                            <label htmlFor="City">City</label>
                            <input type="text" className="form-control" 
                            value={hotel.address.city} onChange={ (e) => {
                                            setHotel({
                                                ...hotel, 
                                                address: { ...hotel.address, city: e.target.value}
                                            })   
                                        }
                                }/>
                        </div>

                        <div className="col-lg-5 mt-2 mb-2">
                            <label htmlFor="Street">Street</label>
                            <input type="text" className="form-control" 
                            value={hotel.address.street} onChange={ (e) => {
                                            setHotel({
                                                ...hotel, 
                                                address: { ...hotel.address, street: e.target.value}
                                            })   
                                        }
                                }/>
                        </div>

                        <div className="col-lg-2 mt-2 mb-2">
                            <label htmlFor="BuildingNum">Building num.</label>
                            <input type="text" className="form-control" 
                            value={hotel.address.number} onChange={ (e) => {
                                            setHotel({
                                                ...hotel, 
                                                address: { ...hotel.address, number: e.target.value.replace(/\D/g,'')}
                                            })   
                                        }
                                }/>
                        </div>

                        <div className="col-lg-4 mt-2 mb-2">
                            <label htmlFor="PostalCode">Postal code</label>
                            <input type="text" className="form-control" 
                            value={hotel.address.postalcode} onChange={ (e) => {
                                            setHotel({
                                                ...hotel, 
                                                address: { ...hotel.address, postalcode: e.target.value}
                                            })   
                                        }
                                }/>
                        </div>

                        <div className="col-lg-4 mt-2 mb-2">
                            <label htmlFor="Region">Region</label>
                            <input type="text" className="form-control" 
                            value={hotel.address.region} onChange={ (e) => {
                                            setHotel({
                                                ...hotel, 
                                                address: { ...hotel.address, region: e.target.value}
                                            })   
                                        }
                                }/>
                        </div>

                        <div className="col-lg-4 mt-2 mb-2">
                            <label htmlFor="Country">Country</label>
                            <input type="text" className="form-control" 
                            value={hotel.address.country} onChange={ (e) => {
                                            setHotel({
                                                ...hotel, 
                                                address: { ...hotel.address, country: e.target.value}
                                            })   
                                        }
                                }/>
                        </div>
                    </div>

                    {
                    errors.length == 0 ||
                        <div className="alert alert-danger mt-2">
                            {
                                errors.map((error, index) => {
                                    return <div key={index}>- {error}</div>
                                })
                            }
                        </div>
                    }

                    <button className="btn btn-success"
                            onClick={(e) => {
                                e.preventDefault()
                                updateAddress()
                            }}>
                        Upload changes
                    </button>
                </div>
                )
            }

            {
                isCurrentSection() && (
                <div>
                    <button className="btn btn-dark"
                        onClick={(e) => {
                            e.preventDefault()
                            onCollapse();
                        }}>
                        Collapse
                    </button>
                </div>
            )}

            {
                !isCurrentSection() && (
                <div>
                    <button className="btn btn-dark"
                        onClick={(e) => {
                            e.preventDefault()
                            onAppend();
                        }}>
                        Append
                    </button>
                </div>
            )}
        </div>
    )
}

export default HotelAddressManagePanel