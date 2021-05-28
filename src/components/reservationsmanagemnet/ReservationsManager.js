import React from 'react'
import { useState } from 'react'
import { useAuthInfo } from '../context/AuthContextProvider'
import ReservationManageTab from '../hotelsmanagement/ManagerPages/ReservationManageTab'

const ReservationsManager = () => {

    const authInfo = useAuthInfo()

    const [reservations, setReservations] = useState([])
    const [error, setError] = useState("")
    const [filterInfo, setFilterInfo] = useState(
        {
            dateFrom: "",
            dateTo: ""
        }
    )

    /* Fetch HotelDetails */
    const getUsersReservations = async () => {
        fetch('/api/reservations',
        {
            method: 'POST',
            headers: {
                "Content-type": 'application/json',
                "Authorization": `Bearer ${authInfo.bearer}`
            },
            body: JSON.stringify({
                    dateFrom: filterInfo.dateFrom,
                    dateTo: filterInfo.dateTo,
                })
        })
        .then(response => {
            if (!response.ok)
            {
                response.json().then(resp => setError(resp.message.toString()))
            }
            else
            {
                response.json()
                        .then(data => { setReservations(data) })
            }
        })
    }

    return (
    <>
        <div className="jumbotron">
            <div className="container">
                <h3>Manage your reservations</h3>
                <span>Here you can list your reservations</span> <br/>
                <span>and cancel them if you wish</span>

                    <div className="m-3">
                        <div className="row justify-content-center"> 
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

                                <button className="btn btn-dark m-2"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            getUsersReservations()
                                        }}>Submit</button>
                            </div>

                            { 
                                reservations.map((reservation, index) =>
                                    <ReservationManageTab 
                                        key={index} 
                                        reservation={reservation}
                                        onSuccess={() => getUsersReservations()}
                                    />
                                )
                            }

                        </div>
                    </div>

            </div>
        </div>
    </>

    )
}

export default ReservationsManager
