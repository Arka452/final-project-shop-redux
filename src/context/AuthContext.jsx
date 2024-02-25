/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    
    const [auth,setAuth] = useState(false) ;

    useEffect(() => {
        const storedUser = localStorage.getItem('auth');
        if(storedUser){
            setAuth(JSON.parse(storedUser))
        }

    }, [])

    useEffect(() => {
      
        localStorage.setItem('auth', JSON.stringify(auth));

    }, [auth])
    
    

    return(
        <AuthContext.Provider value={{auth,setAuth}}>
        {children}
    </AuthContext.Provider>
    )
}