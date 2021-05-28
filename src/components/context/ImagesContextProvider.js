import React from 'react'
import { useContext }from 'react'

const ImagesContext = React.createContext()
export const useImagesContext = () => useContext(ImagesContext)

export const ImagesContextProvider = ({ children }) => {

    const imageUrlBase = "http://localhost:8080/hotelsImage"

    return (
        <ImagesContext.Provider value={imageUrlBase}>
            {children}
        </ImagesContext.Provider>
    )
}

