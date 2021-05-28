import React, { useState } from 'react'
import { useAuthInfo } from '../context/AuthContextProvider'


const RoomInfoCard = ({room, dateFrom, dateTo, onSuccess}) => {

    const authInfo = useAuthInfo()

    const [putError, setPutError] = useState("");

    const printMan = () => {
        const stars = []
        for (var i=0; i < room.capacity; i++) {
            stars.push(<i key={i} className="fa fa-male" aria-hidden="true"></i> )
        }
        return stars
    }

    const putNewReservation = async () => {
        await fetch("/api/reservations/add",
            {
                method: 'PUT',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": `Bearer ${authInfo.bearer}`
                },
                body: JSON.stringify({
                        dateFrom : dateFrom,
                        dateTo : dateTo,
                        roomsId : room.id
                    })
            })
            .then(response => {
                if (!response.ok)
                {
                    if(response.status === 401)
                    {
                        setPutError("Log in before adding hotel");
                    } else {
                        response.json().then(resp => setPutError(resp.message.toString()))     
                    }
                }
                return response
             })
            .then((response) => {
                onSuccess()
            } )
    }

    return (
            
            <div className="card rounded rounded-lg w-100 shadow border m-2"  style={{"border": "#8f8f8fb6"}} >
                <div className="d-flex justify-content-between align-items-center pl-3 pr-3">
                    <div className="p-2">
                        <button href="/" className="btn btn-warning"
                                disabled={authInfo === null || authInfo.isLoggedIn !== true ? 
                                          'disabled' : ""}
                                onClick={(e) => {
                                    e.preventDefault()
                                    putNewReservation()
                                }} >Book</button>

                    </div>

                    <div className="p-2">
                        <label>Room number: {room.number}</label>
                    </div>

                    <div className="p-2">
                        <label>Price: ${room.price}</label>
                    </div>

                    <div className="p-2">
                        <label>
                            Capacity: {printMan()}
                        </label>
                    </div>
                </div>
                <div className="text-center">
                    <label className="badge badge-danger">{putError}</label>
                </div>
            </div>
            
    )
}

export default RoomInfoCard
