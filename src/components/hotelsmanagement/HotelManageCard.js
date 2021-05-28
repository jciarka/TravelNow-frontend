import React from 'react'
import { Link } from 'react-router-dom'
import { useImagesContext } from '../context/ImagesContextProvider'

const HotelManageCard = ({hotel}) => {

    const imageBaseUrl = useImagesContext()

    return (
        <Link to={`/hotels/manage/${hotel.id}`}>
            <div className="card rounded rounded-lg shadow border mr-2 ml-2"  
                style={{"border": "#8f8f8fb6", "width": "300px", "height": "350px", "background": "lightgray"}} >

                {
                    hotel.mainPhoto  !== null && hotel.mainPhoto  !== 0 && 

                    <img className="card-img-left rounded rounded-lg" 
                    src={`${imageBaseUrl}/${hotel.mainPhoto}`} // zmien na hotel main photo id 
                    alt="Hotel main image"
                    style={{height: "300px", width: "300px", objectFit: "cover" }}></img>
                }

                {
                    (hotel.mainPhoto  == null || hotel.mainPhoto == 0) &&
                     
                    <div style={{"width": "300px", "height": "350px", "background": "lightgray"}}>
                    </div>
                }


                <div className="w-100 p-2 text-center align-items-center">
                    <h4 className="card-title" >{hotel.name}</h4>
                    <label>{hotel.address.city}, Poland</label>
                </div>
            </div>
        </Link>
    )
}

export default HotelManageCard

