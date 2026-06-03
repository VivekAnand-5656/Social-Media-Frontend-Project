import { createContext, useEffect, useState, } from "react";

export const AuthContext = createContext()

export const AuthProvider =({children})=>{
    const [changepage,setChangepage] = useState(null);
    const [token,setToken] = useState(
        localStorage.getItem("token") || null
    )
    const [islogin,setIslogin] = useState(false)
    const [isshowlogin,setIsshowlogin] = useState(false)
    // ----- Curent User ----
    const [userdata, setUserdata] = useState([])
    
    
    useEffect(()=>{
        const storetoken = localStorage.getItem("token");
        if (storetoken){
            setToken(storetoken)
            setIslogin(true)
        }
    },[])

    const login = (newToken)=>{
        localStorage.setItem("token",newToken)
        setToken(newToken)
        setIslogin(true)
        setIsshowlogin(false)
    }
    const logout = ()=>{
        localStorage.removeItem("token")
        setToken(null)
        setIslogin(false)
        setIsshowlogin(true)
        setUserdata([])
    }
    return (
        <AuthContext.Provider
        value={{
            changepage,setChangepage,login,logout,islogin,setIslogin,isshowlogin,setIsshowlogin,token,userdata, setUserdata
        }} >
            {children}
        </AuthContext.Provider>
    )
}