import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import Login from '../Auths/Login'

const Navbar = () => {
    const { islogin, logout, isshowlogin, setIsshowlogin } = useContext(AuthContext)
    const navigate = useNavigate()
    const logingout = ()=>{
        logout()
        navigate("/")
    }
    return (
        <>
            <div className=' sm:w-[20vw] sm:h-screen flex sm:flex-col border-r-2 p-2 justify-between ' >
                <h1>Social Media</h1>
                <div className=' border-2 sm:h-[70%]   ' >
                    <ul className=' flex sm:flex-col gap-2 ' >
                        <li><NavLink to="/" className={({ isActive }) => isActive ? "text-[#ff00d0] border-b-2 border-[#ff00d0] pb-1" : " hover:text-[#000000] text-[#000000] font-semibold   transition"} >Home</NavLink></li>

                        <li><NavLink to="/reels" className={({ isActive }) => isActive ? "text-[#ff00d0] border-b-2 border-[#ff00d0] pb-1" : " hover:text-[#ff00d0] text-[#000000] font-semibold   transition"}>Reels</NavLink></li> 
                        <li><NavLink to="/savedpost" >Saved</NavLink></li> 
                        <li><NavLink to="/createreel" >CreateReel</NavLink></li>
                    </ul>
                </div>
                <div className=' h-20 ' >
                    {
                        // ---- yaha confusing hai login me bhi 
                        islogin ?
                            <div className='felx flex-col justify-between items-center h-full gap-2  ' >
                                <div>
                                    <button onClick={logingout} className=' cursor-pointer ' >Logout</button>
                                </div>
                                <div>
                                    <button onClick={()=>navigate("/profile")} className=' cursor-pointer ' >Profile</button>
                                </div>
                            </div>
                            : <button onClick={() => setIsshowlogin(true)} >Login</button>
                    }

                </div>
            </div>
            {
                isshowlogin ? <Login /> : null
            }
        </>
    )
}

export default Navbar