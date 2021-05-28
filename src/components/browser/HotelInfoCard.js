import { Link } from "react-router-dom"
import { useImagesContext } from '../context/ImagesContextProvider'
import HotelLogo        from '../../icons/hotel-building.svg'

const HotelInfoCard = ({hotel}) => {

    const imageBaseUrl = useImagesContext()

    const printStars = () => {
        const stars = []
        for (var i=0; i < hotel.avgRating; i++) {
            stars.push(<i key={i} className="fa fa-star" aria-hidden="true"></i>)
        }
        return stars
    }

    const printPrice = () => {
        if (hotel.avgPrice < 50) {
            return <label>$</label>
        } else if (hotel.avgPrice < 120) {
            return <label>$$</label>
        } else {
            return <label>$$$</label>
        }
    } 

    return (
        <div className="container">
            <div className="row">
                <div className="card rounded rounded-lg w-100 shadow border"  style={{"border": "#8f8f8fb6"}} >
                    <Link to={`/details/${hotel.id}`} style={{"width": "100%"}}>
                        <div className="card-horizontal">
                            <div className="img-square-wrapper rounded rounded-lg">
                            {
                                hotel.mainPhoto  !== null && hotel.mainPhoto  !== '' && hotel.mainPhoto  !== 0 && 

                                <img className="card-img-left rounded rounded-lg" 
                                src={`${imageBaseUrl}/${hotel.mainPhoto}`} // zmien na hotel main photo id 
                                alt="Hotel main image"
                                style={{height: "200px", width: "250px", objectFit: "cover" }}></img>
                            }

                            {
                                (hotel.mainPhoto  !== null && hotel.mainPhoto  !== '' && hotel.mainPhoto  !== 0) || 

                                <div style={{height: "200px", width: "250px", textAlign: "center"}}>
                                        <img src={HotelLogo} width="100" height="100" style={{"fill": "white", "margin-left": "auto", "margin-right": "auto", marginTop:"50px"}} alt=""/>
                                </div>
                            }

                            </div>
                            <div className="card-body">
                                <h4 className="card-title">{hotel.name}</h4>
                                <p className="card-text">{hotel.description}</p>
                                {hotel.numOfRooms} rooms <br/>
                                {printStars()}<br/>
                                {printPrice()}<br/>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>  
    )
}

export default HotelInfoCard

