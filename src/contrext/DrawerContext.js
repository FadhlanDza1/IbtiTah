import { createContext, useContext, useState } from "react";

const DrawerContext = createContext()

export const useDrawer = () => {
    return useContext(DrawerContext)
}
export const DrawerProvider = ({children}) =>{
    const [isDrawerVisible, setIsDrawerVisible] = useState(false)

    const toggleDrawer =() =>{
        setIsDrawerVisible((Prev) => !Prev)
    }

    return (<DrawerContext.Provider value={{isDrawerVisible, toggleDrawer}}>{children}</DrawerContext.Provider>)
}
