import React from 'react'

const RoomTab = ({ room, index, setRoom, deleteRoom }) => {
    return (
    <div className="card rounded rounded-lg w-100 shadow border m-2"  style={{"border": "#8f8f8fb6"}} >
        <div className="d-flex justify-content-between align-items-center pl-3 pr-3">

            <div className="form-group col-lg-2 mt-2 mb-2">
                        <label htmlFor="RoomNumber">Room number</label>
                        <input type="text" className="form-control" 
                               value={room.number} 
                               onChange={ (e) => {
                                    setRoom(index, {...room, number: Number(e.target.value.replace(/\D/g,''))} )        
                            } }/>
            </div>

            <div className="form-group col-lg-4 mt-2 mb-2">
                        <label htmlFor="RoomPrice">price [$]</label>
                        <input type="text" className="form-control" 
                               value={room.price} 
                               onChange={ (e) => {
                                    setRoom(index, {...room, price: Number(e.target.value.replace(/\D/g,''))} )        
                            } }/>
            </div>

            <div className="form-group col-lg-4 mt-2 mb-2">
                        <label htmlFor="Room number">capacity</label>
                        <input type="text" className="form-control" 
                               value={room.capacity} 
                               onChange={ (e) => {
                                    setRoom(index, {...room, capacity: Number(e.target.value.replace(/\D/g,''))} )        
                            } }/>
            </div>

            <div className="p-2">
                <button className="btn btn-warning"
                    onClick={(e) => {
                        e.preventDefault()
                        deleteRoom(index)
                    }}>
                    Remove
                </button>
            </div>

        </div>
    </div>
    )
}

export default RoomTab
