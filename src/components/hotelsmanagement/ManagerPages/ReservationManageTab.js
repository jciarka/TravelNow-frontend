import React from 'react'
import { useState } from 'react'
import { useAuthInfo } from '../../context/AuthContextProvider'

const ReservationManageTab = ({reservation, onSuccess}) => {
    
    const authInfo = useAuthInfo()
    const [error, setError] = useState("")

    const deleteReservation = async () => {
        fetch(`/api/reservations/${reservation.id}`,
        {
            method: 'DELETE',
            headers: {
                "Content-type": 'application/json',
                "Authorization": `Bearer ${authInfo.bearer}`
             }
        })
        .then(response => {
            if (!response.ok)
            {
                response.json().then(resp => setError(resp.message.toString()))     
            }
            else
            {
                onSuccess()
            }
        })
    }

    return (
        <div className="card rounded rounded-lg w-100 shadow border m-2"  style={{"border": "#8f8f8fb6"}}>
            <div className="d-flex justify-content-between pl-3 pr-3">

                <div className="form-group mt-auto mb-auto">
                    Room number: {reservation.id}
                </div>

                <div className="form-group mt-auto mb-auto">
                    From: {reservation.dateFrom}
                </div>

                <div className="form-group mt-auto mb-auto">
                    To: {reservation.dateTo}
                </div>

                <div className="form-group m-2">
                    <button className="btn btn-warning"
                            onClick={(e) => {
                                deleteReservation()
                            }}>
                                Cancel
                            </button>
                </div>     
            </div>
        </div>
    )
}

export default ReservationManageTab
