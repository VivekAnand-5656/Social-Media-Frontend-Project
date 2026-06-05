import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import Login from '../Auths/Login'
import blankuser from '../assets/blankuser.png'

import logo from '../assets/logo.png'
import { FcHome } from "react-icons/fc";
import { FcVideoCall } from "react-icons/fc";
import { FaSave } from "react-icons/fa";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { RiLoginBoxFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";


const Navbar = () => {
    const { islogin, logout, isshowlogin, setIsshowlogin, userdata } = useContext(AuthContext)
    const [close,setClose] = useState(false)
    const navigate = useNavigate()
    const logingout = () => {
        logout()
        navigate("/")
    }
    return (
        <>
            <div className=' bg-[#FDEEE7] text-black lg:w-[15vw] w-[50vw] m-auto sm:h-screen h-screen flex flex-col lg:flex-col p-2 justify-between items-center ' >
                {
                    close?(
                        <IoMdClose 
                        onClick={()=>setClose(false)}
                        className=' lg:hidden flex '
                        />
                    ):(
                        <GiHamburgerMenu 
                        onClick={()=>setClose(true)} 
                        className=' lg:hidden flex '
                        />
                    )
                }
                {
                    islogin ? (
                        <div className=' w-full flex flex-col justify-center items-center p-2 ' >
                            {
                                userdata && "image_url" in userdata ? (
                                    <img
                                        src={userdata.image_url}
                                        alt="userimage"
                                        className="w-15 h-15 rounded-full "
                                    />
                                ) : (
                                    <img
                                        src={blankuser}
                                        alt="userimage"
                                        className="w-15 h-15 rounded-full "
                                    />
                                )
                            }
                            <p className=' font-semibold ' >{userdata.name}</p> 
                        </div>
                    ) : (
                        <div className=' w-full flex justify-center items-center gap-3 ' >
                            <img src={logo} className=' rounded-full w-10 h-10  ' alt="" />
                            <h1 className=' text-2xl  ' >Socially</h1>
                        </div>
                    )
                }
                <div className='lg:w-[80%] w-full lg:h-[70%] flex   justify-center items-center'>
                    <ul className='lg:w-full flex flex-col lg:flex-col lg:gap-2 gap-1.5 ' >

                        <li className='w-full '>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-white font-semibold  bg-[#F27734] "
                                        : "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-[#F27734] font-semibold hover:bg-[#F27734] hover:shadow-none bg-[#ffffff] shadow-[inset_0_2px_4px_#d6cfcf]   hover:text-white transition"
                                }
                            >
                                <FcHome />  Home
                            </NavLink>
                        </li>

                        <li className='w-full'>
                            <NavLink
                                to="/reels"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-white font-semibold  bg-[#F27734] "
                                        : "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-[#F27734] font-semibold hover:bg-[#F27734] hover:shadow-none bg-[#ffffff] shadow-[inset_0_2px_4px_#d6cfcf]   hover:text-white transition"
                                }
                            >
                                <FcVideoCall />    Reels
                            </NavLink>
                        </li>

                        <li className='w-full'>
                            <NavLink
                                to="/savedpost"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-white font-semibold  bg-[#F27734] "
                                        : "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-[#F27734] font-semibold hover:bg-[#F27734] hover:shadow-none bg-[#ffffff] shadow-[inset_0_2px_4px_#d6cfcf]   hover:text-white transition"
                                }
                            >
                                <FaSave />   Saved
                            </NavLink>
                        </li>

                        <li className='w-full'>
                            <NavLink
                                to="/createreel"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-white font-semibold  bg-[#F27734] "
                                        : "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-[#F27734] font-semibold hover:bg-[#F27734] hover:shadow-none bg-[#ffffff] shadow-[inset_0_2px_4px_#d6cfcf]   hover:text-white transition"
                                }
                            >
                                <BsFillCameraReelsFill />   Create Reel
                            </NavLink>
                        </li>

                    </ul>
                </div>
                <div className="h-30 ">
                    {islogin ? (
                        <div className="flex h-full flex-col justify-center gap-4">

                            <button
                                onClick={logingout}
                                className="flex cursor-pointer w-full items-center gap-3 rounded-lg bg-[#F27734] px-2 py-1.5 font-semibold text-white transition hover:bg-gray-100 hover:text-black"
                            >
                                Logout
                                <RiLogoutBoxFill />
                            </button>

                            <button
                                onClick={() => navigate("/profile")}
                                className="flex cursor-pointer w-full items-center gap-3 rounded-lg bg-[#F27734] px-2 py-1.5 font-semibold text-white transition hover:bg-gray-100 hover:text-black"
                            >
                                Profile
                                <FaUserAlt />
                            </button>

                        </div>
                    ) : (
                        <button
                            onClick={() => setIsshowlogin(true)}
                            className="flex cursor-pointer w-full items-center gap-3 rounded-lg bg-[#F27734] px-2 py-1.5 font-semibold text-white transition hover:bg-gray-100 hover:text-black"
                        >
                            Login
                            <RiLoginBoxFill />
                        </button>
                    )}
                </div>
            </div>
            {
                isshowlogin ? <Login /> : null
            }
        </>
    )
}

export default Navbar