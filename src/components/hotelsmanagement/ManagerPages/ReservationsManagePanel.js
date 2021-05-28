import React from 'react'
import { useState, useEffect } from 'react'
import  { useParams } from 'react-router-dom'
import { useAuthInfo } from '../../context/AuthContextProvider'
import ReservationManageTab from './ReservationManageTab'

const ReservationsManagePanel = ({onAppend, onCollapse, isCurrentSection}) => {

    const authInfo = useAuthInfo()
    let { hotelId } = useParams()

    const [reservations, setReservations] = useState([])
    const [error, setError] = useState("")
    const [filterInfo, setFilterInfo] = useState(
        {
            dateFrom: "",
            dateTo: ""
        }
    )
    const [changeTrigger, setChangeTrigger] = useState(0)
    
    /* Fetch HotelDetails */
    const getHotelReservations = async () => {
            fetch('/api/reservations/temp',
            {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": `Bearer ${authInfo.bearer}`
                },
                body: JSON.stringify({
                        hotelsId: hotelId,
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

        <div className="card p-3 m-2 rounded rounded-lg shadow border " >
            <h5>Reservations</h5>

            {
                isCurrentSection() && (
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
                                            getHotelReservations()
                                        }}>Submit</button>
                            </div>

                            {
                                reservations.map((reservation, index) =>
                                    <ReservationManageTab 
                                        key={index} 
                                        reservation={reservation}
                                        onSuccess={() => getHotelReservations()}
                                    />
                                )
                            }

                        </div>
                    </div>
                )
            }

            {
                isCurrentSection() && (
                <div>
                    <button className="btn btn-success"
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

export default ReservationsManagePanel
