import React from 'react'
import { useState, useEffect } from 'react'
import  {
    useParams
} from 'react-router-dom'
import RoomTab from '../RoomTab'
import RoomManageTab from './RoomManageTab'
import { useAuthInfo } from '../../context/AuthContextProvider'

const RoomManagePanel = ({onAppend, onCollapse, isCurrentSection}) => {
    
    const authInfo = useAuthInfo()    
    let { hotelId } = useParams();

    const [oldRooms, setOldRooms] = useState([])
    const [newRooms, setNewRooms] = useState([])
    const [errors, setErrors] = useState([])
    const [changeTrigger, setChangeTrigger] = useState(0)
    
    /* Fetch HotelDetails */
    const getHotelDetails = async () => {
        fetch(`/api/hotelDetails/${hotelId}`)
            .then(response => response.json())
            .then(data => {
                    setOldRooms(data.rooms)
                    setErrors([])
                }) 
    }

    useEffect(() => {
        getHotelDetails(oldRooms)
    }, [isCurrentSection(), changeTrigger])  // eslint-disable-line react-hooks/exhaustive-deps

    const setNewRoom = (index, updatedRoom) => {
        setNewRooms(newRooms.map((room, i) => {
            if (i !== index) 
                return room
            return updatedRoom
        }))
    }

    const deleteNewRoom = (index) =>
    {
        setNewRooms(newRooms.filter((room, i) => {
            if (i !== index) 
                return true
            return false
        }))
    }

    const setOldRoom = (index, updatedRoom) => {
        setOldRooms(oldRooms.map((room, i) => {
            if (i !== index) 
                return room
            return updatedRoom
        }))
    }

    const addNewRooms = async () => {
        await fetch("/api/hotels/newRooms",
            {
                method: 'PUT',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": `Bearer ${authInfo.bearer}`
                },
                body: JSON.stringify({
                        hotelId: hotelId,
                        rooms: newRooms
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
                    setNewRooms([])
                }
             })
    }    

    const updateRoom = async (room) => {
        await fetch("/api/hotels/updateRoom",
            {
                method: 'PUT',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": `Bearer ${authInfo.bearer}`
                },
                body: JSON.stringify({
                        hotelId: hotelId,
                        room: room
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

    const deleteRoom = async (roomId) => {
        await fetch("/api/hotels/deleteRoom",
            {
                method: 'DELETE',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": `Bearer ${authInfo.bearer}`
                },
                body: JSON.stringify({
                    hotelId: hotelId,
                    roomId: roomId
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
            <h5>Change your rooms information</h5>

            {
                isCurrentSection() && (
                    <>
                        <hr/>
                        <h5>Manage existing rooms</h5>
                        <div className="form-group">
                            <div className="row">
                            {
                                oldRooms.map((room, index) => 
                                    <RoomManageTab key={index} 
                                        room={room}
                                        index={index}
                                        setRoom={setOldRoom}
                                        onUpdateRoom={updateRoom} 
                                        onDeleteRoom={deleteRoom}
                                    />
                                )
                            }
                            </div>
                        </div>
                            

                        <hr/>
                        <h5>Add new rooms</h5>
                        <div className="form-group">
                            <div className="row">
                                {
                                    newRooms.map((room, index) =>
                                        <RoomTab key={index} 
                                            room={room}
                                            index={index}
                                            setRoom={setNewRoom} 
                                            deleteRoom={deleteNewRoom} 
                                        />
                                    )
                                }
                            </div>
                        </div>

                        <div className="mt-2 mb-2 d-flex justify-content-between">
                        <button className="btn btn-warning"
                            onClick={(e) => {
                                e.preventDefault()
                                setNewRooms([
                                ...newRooms,
                                {
                                    number: "",
                                    price: "",
                                    capacity: "",                                    
                                }])
                            }}>

                            Add room patern
                        </button>
                            <button className="btn btn-primary"
                                onClick={(e) => {
                                    e.preventDefault()
                                    addNewRooms()
                                }}>
                                Upload new rooms
                            </button>
                        </div>
                        <hr/>
                    </>

                    
                )
            }

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

export default RoomManagePanel