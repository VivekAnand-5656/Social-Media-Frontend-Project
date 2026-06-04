import React, { useContext } from 'react'
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





const Navbar = () => {
    const { islogin, logout, isshowlogin, setIsshowlogin, userdata } = useContext(AuthContext)
    const navigate = useNavigate()
    const logingout = () => {
        logout()
        navigate("/")
    }
    return (
        <>
            <div className=' bg-[#0D121A] text-white sm:w-[20vw] sm:h-screen flex sm:flex-col p-2 justify-between items-center ' >
                {
                    islogin ? (
                        <div>
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
                            <p>{userdata.name}</p>
                            <p>{userdata.username}</p>
                        </div>
                    ) : (
                        <div className=' w-full flex justify-center items-center gap-3 ' >
                            <img src={logo} className=' rounded-full w-10 h-10  ' alt="" />
                            <h1 className=' text-2xl  ' >Socially</h1>
                        </div>
                    )
                }
                <div className='w-[80%] sm:h-[70%] flex justify-center items-center'>
                    <ul className='w-full flex sm:flex-col gap-2'>

                        <li className='w-full '>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-white bg-[#27284A]"
                                        : "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-white font-semibold hover:bg-gray-100 hover:text-black transition"
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
                                        ? "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-white bg-[#27284A]"
                                        : "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-white font-semibold hover:bg-gray-100 hover:text-black transition"
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
                                        ? "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-white bg-[#27284A]"
                                        : "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-white font-semibold hover:bg-gray-100 hover:text-black transition"
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
                                        ? "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-white bg-[#27284A]"
                                        : "flex w-full gap-3 items-center px-2 py-1.5 rounded-lg text-white font-semibold hover:bg-gray-100 hover:text-black transition"
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
                                className="flex cursor-pointer w-full items-center gap-3 rounded-lg bg-[#673CE6] px-2 py-1.5 font-semibold text-white transition hover:bg-gray-100 hover:text-black"
                            >
                                Logout
                                <RiLogoutBoxFill />
                            </button>

                            <button
                                onClick={() => navigate("/profile")}
                                className="flex cursor-pointer w-full items-center gap-3 rounded-lg bg-[#673CE6] px-2 py-1.5 font-semibold text-white transition hover:bg-gray-100 hover:text-black"
                            >
                                Profile
                                <FaUserAlt />
                            </button>

                        </div>
                    ) : (
                        <button
                            onClick={() => setIsshowlogin(true)}
                            className="flex cursor-pointer w-full items-center gap-3 rounded-lg bg-[#673CE6] px-2 py-1.5 font-semibold text-white transition hover:bg-gray-100 hover:text-black"
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