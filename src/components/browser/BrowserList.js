import HotelInfoCard from './HotelInfoCard'

const BrowserList = ({hotels}) => {
    
    return (
        <>
            {
                hotels.map((hotel, index) => 
                    <HotelInfoCard key={index} hotel={hotel} />
                )
            }
        </>
    )
}

export default BrowserList
