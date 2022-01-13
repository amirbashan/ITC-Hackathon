import React, { useState } from "react";


export const MapContext = React.createContext()

const MapStore = ({ children }) => {
   

    return (
        <MapContext.Provider
            value={{
               
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export default MapStore;
