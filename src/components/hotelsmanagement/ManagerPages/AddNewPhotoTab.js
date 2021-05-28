import React from 'react'

const AddNewPhotoTab = ({ photo, index, mainPhotoIndex, onDelete }) => {
    return (
        <div className="text-center">
            <div className="card rounded rounded-lg shadow border m-2 d-flex justify-content-between"  
                style={{"border": "#8f8f8fb6", "width": "150px", "background": "lightgray"}} >

                <img className="card-img-left rounded rounded-lg" 
                    src={photo}
                    alt="hotelImage"
                    style={{height: "150px", width: "148px", objectFit: "cover" }}>
                </img>

                <div className="d-flex">
                    <button className="btn w-50 btn-primary"
                            style={{borderRadius: "0px 0px 0px 5px"}}
                            onClick={(e) => {
                                e.preventDefault()

                                
                                
                                }}>
                        <i className="fa fa-arrow-up" style={{fontSize: 30}} aria-hidden="true"></i>
                    </button>
                    <button className="btn btn-danger w-50"
                            style={{borderRadius: "0px 0px 5px 0px"}}
                            onClick={(e) => {
                                    e.preventDefault()
                                    onDelete(index) 
                                } 
                            }>
                        <i className="fa fa-ban" style={{fontSize: 30}}  aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>


    )
}

export default AddNewPhotoTab
