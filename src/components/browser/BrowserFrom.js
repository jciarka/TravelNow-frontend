import { useState, useEffect } from "react";
import { FILTER_OPTION } from '../Browser'

const BrowserFrom = ({filterInfo, setFilterInfo, onSubmit}) => {

    /* CITIES */
    const [cities, setCities] = useState([]);

    /* GET CITIES*/ // fetch onWillMount
    useEffect(() => {
        const getCities = async () => {
            fetch('/api/cities')
                .then(response => response.json())
                .then(data => {
                        setCities(data)
                    }) 
            }

        getCities()
    }, [])

    /* filtersTabVisible */
    const [filtersTabVisible, setFiltersTabVisible] = useState(false);


    /* module JXS */
    return (
        <div className="jumbotron w-100">
            <div className="container">
                <form onSubmit={ (e) => {
                        e.preventDefault()
                        onSubmit()
                    }
                }>      
                    <div className="row">
                        <h1>Where would you like to go?</h1>
                        <h5>Type the destiantion of yout travel and we will find the best suiting hotel for you!</h5>
                        
                        <div className="form-row d-flex justify-content-start w-100">

                            {/*<!-- form city -->*/}
                            <div className="p-2" style={{"width": "40%"}}>
                                <input list="cities-list" name="city" type="text" 
                                        className="form-control" placeholder="Type city"
                                        value={filterInfo.city} autoComplete="off"
                                        onChange={(e) => setFilterInfo(
                                            {
                                                ...filterInfo,
                                                city: e.target.value
                                            })} 
                                />
                                <datalist id="cities-list" > 
                                    {cities.map((city, index) =>
                                        <option key={index} value={city} />
                                    )}
                                </datalist>
                            </div>

                            {/*<!-- form submit -->*/}
                            <div className="p-2">
                                <button type="submit" className="btn btn-dark mb-2">Submit</button>
                            </div>

                            {/*<!-- forms  sortedby-->*/}
                            <div className="p-2">
                                <select name="sortedBy" className="custom-select" 
                                        id="inlineFormCustomSelectPref"
                                        defaultValue={filterInfo.sortedBy}
                                        onChange={(e) => setFilterInfo(
                                            {
                                                ...filterInfo,
                                                sortedBy: e.target.value
                                            }
                                        )}>
                                    <option value="">Sort by</option>
                                    <option value={FILTER_OPTION.PRICE_DESC}>Price descending</option>
                                    <option value={FILTER_OPTION.PRICE_ASC}>Price ascending</option>
                                    <option value={FILTER_OPTION.GRADE_DESC}>Grade descending</option>
                                    <option value={FILTER_OPTION.GRADE_DESC}>Grade ascending</option>
                                    <option value={FILTER_OPTION.POPULAR_DESC}>Popularity descending</option>
                                    <option value={FILTER_OPTION.POPULAR_ASC}>Popularity ascending</option>
                                </select>
                            </div>

                            <div className="p-2">
                                <button className="btn btn-light border" 
                                        onClick={((e) => {
                                            e.preventDefault()
                                            setFiltersTabVisible(!filtersTabVisible)
                                            }
                                        )} >
                                    Apply Filters
                                </button>
                            </div>
                            
                        </div>
                    </div>

                    { filtersTabVisible && (
                        <div className="row"> 
  
                            <div className="card card-body">
                                <div className="row pl-4 pr-4 mt-2" >
                                    <div className="col-lg-6 form-group border rounded pt-2 pb-2">
                                        <label htmlFor="price">Free rooms in period</label>

                                        {/*<!-- forms  date (datefrom, dateto)-->*/}
                                        <div className="w-100 d-flex">
                                            <div className="w-100 d-flex form-inline justify-content-start align-items-center">
                                                <div className="form-group">
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
                                                
                                                {/*<!-- forms  date (datefrom, dateto)-->*/}
                                                <div className="form-group">
                                                    <label htmlFor="dateTo">To</label>
                                                    <input name="dateTo" type="date" id="dateTo" className="form-control mx-sm-3"
                                                    value={filterInfo.dateTo}
                                                    onChange={(e) => setFilterInfo(
                                                        {
                                                            ...filterInfo,
                                                            dateTo: e.target.value
                                                        })} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 form-group border rounded pt-2 pb-2">
                                        <label htmlFor="price">Price</label>

                                        {/*<!-- forms  price range-->*/}
                                        <div className="d-flex justify-content-start rounded w-auto">
                                            <div className="form-check m-2"> 
                                                <input className="form-check-input" type="radio" name="priceRange" id="price_medium" value="1"
                                                    checked={filterInfo.priceRange === 0 ? 'checked' : ''} 
                                                    onChange={(e) => setFilterInfo({...filterInfo, priceRange: 0})}/>
                                                <label className="form-check-label" htmlFor="price_small">
                                                Any
                                                </label>
                                            </div>                                                    
                                            
                                            <div className="form-check m-2"> 
                                                <input className="form-check-input" type="radio" name="priceRange" id="price_medium" value="1"
                                                    checked={filterInfo.priceRange === 1 ? 'checked' : ''} 
                                                    onChange={(e) => setFilterInfo({...filterInfo, priceRange: 1})}/>
                                                <label className="form-check-label" htmlFor="price_small">
                                                $
                                                </label>
                                            </div>

                                            <div className="form-check m-2">
                                                <input className="form-check-input" type="radio" name="priceRange" id="price_medium" value="2"
                                                    checked={filterInfo.priceRange === 2 ? 'checked' : ''} 
                                                    onChange={(e) => setFilterInfo({...filterInfo, priceRange: 2})}/>

                                                <label className="form-check-label" htmlFor="price_medium">
                                                $$
                                                </label>
                                            </div>

                                            <div className="form-check m-2">
                                                <input className="form-check-input" type="radio" name="priceRange" id="price_large" value="3" 
                                                    checked={filterInfo.priceRange === 3 ? 'checked' : ''} 
                                                    onChange={(e) => setFilterInfo({...filterInfo, priceRange: 3})}/>
                                                <label className="form-check-label" htmlFor="price_large">
                                                $$$
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/*<!-- forms  grade (gradeFrom, gradeTo)-->*/}
                                    <div className="col-xl-3 col-md-6 form-group border rounded pt-2 pb-2">
                                        <label htmlFor="grade">Grade</label>
                                        <div className="d-flex justify-content-start">
                                        <select name="gradeFrom" className="custom-select mp-2"
                                                defaultValue={filterInfo.gradeFrom}
                                                onChange={(e) => setFilterInfo(
                                                    {
                                                        ...filterInfo,
                                                        gradeFrom: Number(e.target.value)
                                                    })}>
                                            <option value="0">
                                                From
                                            </option>
                                            <option value="1">
                                                1
                                            </option>
                                            <option value="2">
                                                2
                                            </option>
                                            <option value="3">
                                                3
                                            </option>
                                            <option value="4">
                                                4
                                            </option>
                                            <option value="5">
                                                5
                                            </option>
                                        </select>
                                        
                                        <select name="gradeTo" className="custom-select mp-2"
                                                defaultValue={filterInfo.gradeTo}
                                                onChange={(e) => setFilterInfo(
                                                    {
                                                        ...filterInfo,
                                                        gradeTo: Number(e.target.value)
                                                    })}>
                                            <option value="0">
                                                From
                                            </option>
                                            <option value="1">
                                                1
                                            </option>
                                            <option value="2">
                                                2
                                            </option>
                                            <option value="3">
                                                3
                                            </option>
                                            <option value="4">
                                                4
                                            </option>
                                            <option value="5">
                                                5
                                            </option>
                                        </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row pl-4 pr-4 mt-2" >
                                    <div className="col-lg-6 form-group border rounded pt-2 pb-2">
                                        <label htmlFor="price">Room capacity</label>

                                        <div className="w-100 d-flex">
                                            <div className="w-100 d-flex form-inline justify-content-start align-items-center">
                                                <div className="form-group">
                                                    <label htmlFor="dateFrom">From</label>
                                                    <input name="dateFrom" type="text" 
                                                        id="capacityFrom" className="form-control ml-3 mr-3"
                                                        style={{width: "100px"}}
                                                        value={filterInfo.capacityFrom} 
                                                        onChange={(e) => setFilterInfo(
                                                            {
                                                                ...filterInfo,
                                                                capacityFrom: Number(e.target.value)
                                                            })} 
                                                    />
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label htmlFor="dateTo">To</label>
                                                    <input name="dateTo" type="text" 
                                                        id="capacityTo" className="form-control ml-3 mr-3"
                                                        value={filterInfo.capacityTo}
                                                        style={{width: "100px"}}
                                                        onChange={(e) => setFilterInfo(
                                                            {
                                                                ...filterInfo,
                                                                capacityTo: Number(e.target.value)
                                                            })} 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>)
                    }
       
                        
                </form>
            </div>
        </div>
    )
}

export default BrowserFrom
