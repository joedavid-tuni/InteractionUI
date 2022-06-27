import React from 'react'


const WSContext = React.createContext(new WebSocket("ws://127.0.0.1:8887"));

export const WSContextProvider = (props) => {

    return <WSContext.Provider value={WSContext}> {props.children} </WSContext.Provider>
}


export default WSContext;