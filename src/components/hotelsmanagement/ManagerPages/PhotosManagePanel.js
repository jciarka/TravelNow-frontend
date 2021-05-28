import React from 'react'
import { useState, useEffect } from 'react'
import  {
    useParams
} from 'react-router-dom'
import PhotoTab from '../PhotoTab'
import { useImagesContext } from '../../context/ImagesContextProvider'
import { useAuthInfo } from '../../context/AuthContextProvider'

const PhotosManagePanel = ({onAppend, onCollapse, isCurrentSection}) => {

    const imageBaseUrl = useImagesContext()
    const authInfo = useAuthInfo()
        
    let { hotelId } = useParams()
    
    const [mainPhotoIndex, setMainPhotoIndex] = useState(-1)
    const [photosIds, setphotosIds] = useState([])
    const [fileUrl, setFileUrl] = useState("")
    const [error, setError] = useState("")
    const [changeTrigger, setChangeTrigger] = useState(0)

    /* Fetch HotelDetails */
    const getHotelDetails = async () => {
        fetch(`/api/hotelDetails/${hotelId}`)
            .then(response => response.json())
            .then(data => {
                    setphotosIds(data.picturesIds)
                    setMainPhotoIndex(data.mainPhoto)
                }) 
    }

    useEffect(() => {
        getHotelDetails()
    }, [isCurrentSection(), changeTrigger])

    const addNewPhoto = async (imageBinary) => {
        await fetch("/api/hotels/newPhoto",
            {
                method: 'PUT',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": `Bearer ${authInfo.bearer}`
                },
                body: JSON.stringify({
                        hotelId: hotelId,
                        photo: imageBinary
                    })
            })
            .then(response => {
                if (!response.ok)
                {
                    response.json().then(resp => setError(resp.message.toString()))     
                }
                return response
             })
            .then((response) => {
                setChangeTrigger(changeTrigger + 1)
                setError("")
            } )
    }

    const deletePhoto = async (photoId) => {
        await fetch("/api/hotels/deletePhoto",
            {
                method: 'DELETE',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": `Bearer ${authInfo.bearer}`
                },
                body: JSON.stringify({
                        hotelId: hotelId,
                        photoId: photoId
                    })
            })
            .then(response => {
                if (!response.ok)
                {
                    response.json().then(resp => setError(resp.message.toString()))     
                }
                return response
             })
            .then((response) => {
                setChangeTrigger(changeTrigger + 1)
                setError("")
            } )
    }

    const setMainPhoto = async (photoId) => {
        await fetch("/api/hotels/setMainPhoto",
            {
                method: 'PUT',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": `Bearer ${authInfo.bearer}`
                },
                body: JSON.stringify({
                        hotelId: hotelId,
                        photoId: photoId
                    })
            })
            .then(response => {
                if (!response.ok)
                {
                    response.json().then(resp => setError(resp.message.toString()))     
                }
                return response
             })
            .then((response) => {
                setChangeTrigger(changeTrigger + 1)
                setError("")
            } )
    }

    const uploadImage = (e) => {
        e.preventDefault()

        if(fileUrl === "")
            return

        const reader = new FileReader()
        const file = document.querySelector('input[type=file]').files[0];

        reader.onload = async (e) => {
                const imageBinary = (e.target.result)
                addNewPhoto(imageBinary);
            }

        console.log("im reading")
        reader.readAsDataURL(file)   
    }

    return (

        <div className="card p-3 m-2 rounded rounded-lg shadow border " >
            <h5>Manage photos</h5>
            {
                isCurrentSection() && (
                    <>
                    <div className="form-group">
                        <div className="row">
                        {
                            photosIds.map((photosId) =>
                                <PhotoTab key={photosId} 
                                    photo={`${imageBaseUrl}/${photosId}`} 
                                    index={photosId} 
                                    mainPhotoIndex={mainPhotoIndex} setMainPhotoIndex={setMainPhoto} 
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

                        <button className="btn btn-primary"
                            onClick={uploadImage}>
                            Upload
                        </button>
                    </div>
                </>)
            }

            {
                error === "" ||
                <div className="w-100 text-center alert alert-danger">
                    <label className="">{error}</label>
                </div>
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

export default PhotosManagePanel