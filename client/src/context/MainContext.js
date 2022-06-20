import {useState , createContext} from "react"

export const MainContext = createContext()

export const MainContextProvider = (props) => {
return(
    <MainContext.Provider>
        {props.children}
    </MainContext.Provider>
)
}