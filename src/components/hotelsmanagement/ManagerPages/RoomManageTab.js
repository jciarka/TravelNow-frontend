import React from 'react'

const RoomManageTab = ({ room, index, setRoom, onUpdateRoom, onDeleteRoom }) => {
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

            <div className="form-group col-lg-3 mt-2 mb-2">
                        <label htmlFor="RoomPrice">price [$]</label>
                        <input type="text" className="form-control" 
                               value={room.price} 
                               onChange={ (e) => {
                                    setRoom(index, {...room, price: Number(e.target.value.replace(/\D/g,''))} )        
                            } }/>
            </div>

            <div className="form-group col-lg-3 mt-2 mb-2">
                        <label htmlFor="Room number">capacity</label>
                        <input type="text" className="form-control" 
                               value={room.capacity} 
                               onChange={ (e) => {
                                    setRoom(index, {...room, capacity: Number(e.target.value.replace(/\D/g,''))} )        
                            } }/>
            </div>

            <div>
                <button className="btn btn-primary m-2"
                    onClick={(e) => {
                        e.preventDefault()
                        onUpdateRoom(room)
                    }}>
                    <i class="fa fa-floppy-o" style={{ fontSize: 20 }} aria-hidden="true"></i>
                </button>

                <button className="btn btn-danger m-2"
                    onClick={(e) => {
                        e.preventDefault()
                        onDeleteRoom(room.id)
                    }}>
                    <i className="fa fa-ban" style={{fontSize: 20}}  aria-hidden="true"></i>
                </button>
            </div>

        </div>
    </div>
    )
}

export default RoomManageTab