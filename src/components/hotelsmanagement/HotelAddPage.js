import { useState } from 'react'
import PhotoTab from './PhotoTab'
import RoomTab from './RoomTab'
import  { Link, useHistory } from 'react-router-dom'
import { useAuthInfo } from '../context/AuthContextProvider'

const HotelAddPage = ({onSucceed}) => {

    const authInfo = useAuthInfo()
    const history = useHistory() 
    
    const [hotel, setHotel] = useState({
        name: "",
        telephoneNum: "",
        description: "",
        address: {
            street: "",
            number: "",
            city: "",
            postalcode: "",
            region: "",
            country: ""
        }     
    })

    const [rooms, setRooms] = useState([])

    const [photos, setPhotos] = useState([])

    const [mainPhotoIndex, setMainPhotoIndex] = useState(-1)

    const [fileUrl, setFileUrl] = useState("")

    const [errors, setErrors] = useState([])

    const uploadImage = (e) => {
        e.preventDefault()

        if(fileUrl === "")
            return

        const reader = new FileReader()
        const file = document.querySelector('input[type=file]').files[0];

        reader.onload = async (e) => {
            const imageBinary = (e.target.result)
            setPhotos([...photos, imageBinary ])  
            }

        console.log("im reading")
        reader.readAsDataURL(file)   
    }

    const deletePhoto = (index) => {
        setPhotos(photos.filter((x, i) => {
            if(index === i)
                return false
            return true
        }))
    }

    const setRoom = (index, updatedRoom) => {
        setRooms(rooms.map((room, i) => {
            if (i !== index) 
                return room
            return updatedRoom
        }))
    }

    const deleteRoom = (index) =>
    {
        setRooms(rooms.filter((room, i) => {
            if (i !== index) 
                return true
            return false
        }))
    }

    const putNewHotel = async () => {
        await fetch("/api/addHotel/",
            {
                method: 'PUT',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": `Bearer ${authInfo.bearer}`
                },
                body: JSON.stringify({
                        ...hotel,
                        photos: photos,
                        mainIndex: mainPhotoIndex,
                        rooms: rooms
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
                    console.log("Succed, redirecting")
                    history.push("/hotels")
                    onSucceed()
                }
             })
    }

    const setBackendErrors = (csvErrorMessage) => {
        setErrors(csvErrorMessage.split(";"))
        console.log(csvErrorMessage.split(";"))
    }

    
    return (
        <div className="container d-flex justify-content-center">
            <div className="card m-4 rounded rounded-lg w-100 shadow border "  
                    style={{"border": "#8f8f8fb6", "padding": 60}} >
                
                <Link to="/hotels" className="btn btn-light rounded-pill mr-auto">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i> back
                </Link>
                
                <h2 style={{marginRight: "auto", marginLeft: "auto"}}> And new hotel</h2>

                <form onSubmit={ (e) => { 
                        e.preventDefault()
                        putNewHotel()
                    }
                }>
                    <h5>Basic Info</h5>

                    <div className="form-group">
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

                    <hr/>

                    <h5>Adress Info</h5>

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
                    </div>

                    <hr/>

                    <h5>Rooms </h5>


                    <div className="form-group">
                        <button className="btn btn-dark"
                            onClick={(e) => {
                                e.preventDefault()
                                setRooms([
                                ...rooms,
                                {
                                    number: "",
                                    price: "",
                                    capacity: "",                                    
                                }])
                            }}>
                            Add room
                        </button>

                        <div className="row">
                        {
                            rooms.map((room, index) =>
                                <RoomTab key={index} 
                                    room={room}
                                    index={index}
                                    setRoom={setRoom} 
                                    deleteRoom={deleteRoom} />
                            )
                        }
                        </div>
                    </div>


                    <hr/>

                    <h5>Photos </h5>

                    <div className="form-group">
                        <div className="row">
                        {
                            photos.map((photo, index) =>
                                <PhotoTab key={index} photo={photo} index={index} 
                                    mainPhotoIndex={mainPhotoIndex} setMainPhotoIndex={setMainPhotoIndex} 
                                    onDelete={deletePhoto} />
                            )
                        }
                        </div>
                    </div>
                    
                    <div className="d-flex mb-4 justify-content-center">
                        <div className="custom-file mr-2">
                            <input type="file" className="custom-file-input" id="customFile" 
                                onChange={(e) => {
                                       console.log(e.target.value)
                                       setFileUrl(e.target.value)
                                    }}
                                />
                            <label className="custom-file-label" htmlFor="customFile"> { fileUrl } </label>
                        </div>
                        <button className="btn btn-dark"
                            onClick={uploadImage}>
                            Upload
                        </button>
                    </div>
                    <div className="w-100 text-center">
                        <button type="submit" className="btn btn-primary">Confirm</button>
                    </div>
                </form>
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

            </div>
        </div>
    )
}

export default HotelAddPage
