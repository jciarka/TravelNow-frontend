import React from 'react'
import { useState, useEffect } from 'react'
import  {
    useParams
} from 'react-router-dom'
import { useAuthInfo } from '../../context/AuthContextProvider'

const HotelInfoManagePanel = ({onAppend, onCollapse, isCurrentSection}) => {

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
    }, [isCurrentSection(), changeTrigger])

    const updateHotelInfo = async (room) => {
        await fetch("/api/hotels/updateHotelInfo",
            {
                method: 'PUT',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": `Bearer ${authInfo.bearer}`
                },
                body: JSON.stringify({
                        hotelId: hotelId,
                        name: hotel.name,
                        description: hotel.description,
                        telephoneNum: hotel.telephoneNum
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

        <div className="card p-4 m-2 rounded rounded-lg shadow border " >
            <h5>Change informations about your hotel</h5>

            {
                isCurrentSection() && (

                <div className="form-group">

                    <div className="pb-2">
                        <label htmlFor="HotelName">Hotel name</label>
                        <input type="text" className="form-control" 
                                value={hotel.name} onChange={ (e) => {
                                            setHotel({...hotel, name: e.target.value})       
                                        }
                                    }/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="HotelDescription">Hotel description</label>
                        <textarea type="text" className="form-control"
                                style={{height: "150px", resize: "none"}}
                                value={hotel.description} onChange={ (e) => {
                                            setHotel({...hotel, description: e.target.value})     
                                        }
                                    }/>
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-lg-3">
                                <label htmlFor="Tel">Tel.</label>
                                <input type="text" className="form-control"
                                    value={hotel.telephoneNum} onChange={ (e) => {
                                                    setHotel({...hotel, telephoneNum: e.target.value.replace(/\D/g,'')})   
                                                }
                                        }/>
                            </div>
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
                                updateHotelInfo()
                            }}>
                        Upload changes
                    </button>
                </div>)
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

export default HotelInfoManagePanel
