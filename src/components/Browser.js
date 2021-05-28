import BrowserFrom from './browser/BrowserFrom'
import BrowserList from './browser/BrowserList'
import HotelDetails from './browser/HotelDetails'
import { useState } from 'react'
import  { 
    BrowserRouter as Router,
    Route, 
    Switch
} from 'react-router-dom'

export const FILTER_OPTION = {
    PRICE_ASC: "price_asc",
    PRICE_DESC: "price_desc",
    GRADE_ASC: "grade_asc",
    GRADE_DESC: "grade_dec",
    POPULAR_ASC: "popular_asc",
    POPULAR_DESC: "popular_desc"
}

const Browser = () => {

    /* FILTER INFO */
    const [filterInfo, setFilterInfo] = useState(
        {
            city: "",
            sortedBy: "",
            priceRange: 0,
            gradeFrom: 0,
            gradeTo: 0,         
            dateFrom: "",
            dateTo: "",
            capacityFrom: 0,
            capacityTo: 0
        }
    )

    /* HOTELS */
    const [hotels, setHotels] = useState([])


    // Update Hotels
    const updateHotels = async () => {
        if (filterInfo.city === "") {
            return
        }

        await fetch('/api/hotels/', {
                method: 'Post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filterInfo)         
            })
            .then(response => response.json())
            .then(data => setHotels(data)) 
    }

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact children={
                        <>
                            <BrowserFrom filterInfo={filterInfo} setFilterInfo={setFilterInfo} onSubmit={updateHotels} />
                            <BrowserList hotels={hotels} />
                        </>
                    } />

                    <Route path="/details/:hotelId" children={
                            <HotelDetails filterInfo={filterInfo} setFilterInfo={setFilterInfo} />
                        }/>       
                </Switch>
            </Router>
        </div>
    )

}

export default Browser
