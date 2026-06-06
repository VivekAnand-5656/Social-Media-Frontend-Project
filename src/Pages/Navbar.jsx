import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import Login from '../Auths/Login'
import blankuser from '../assets/blankuser.png'

import logo from '../assets/logo.png'
import { FcHome, FcVideoCall } from "react-icons/fc";
import { FaSave, FaUserAlt } from "react-icons/fa";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { RiLoginBoxFill, RiLogoutBoxFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
    const { islogin, logout, isshowlogin, setIsshowlogin, userdata } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        setIsOpen(false)
        navigate("/")
    }

    // Centralized styling generator for clean NavLinks
    const getLinkClass = ({ isActive }) => {
        const baseClass = "flex w-full gap-3 items-center px-4 py-2.5 rounded-xl font-semibold transition-all duration-200"
        return isActive
            ? `${baseClass} text-white bg-[#F27734] shadow-sm`
            : `${baseClass} text-[#F27734] bg-white shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.08)] hover:bg-[#F27734] hover:text-white`
    }

    return (
        <>
            {/* Hamburger Toggle Button (Mobile Only) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-[#F27734] p-2.5 rounded-xl text-white shadow-md hover:bg-[#e06623] transition-colors cursor-pointer"
                aria-label="Toggle Menu"
            >
                {isOpen ? <IoMdClose size={22} /> : <GiHamburgerMenu size={22} />}
            </button>

            {/* Sidebar Shell */}
            <div
                className={`
                    fixed lg:static top-0 left-0 z-40
                    bg-[#FDEEE7] text-black
                    w-64 h-screen
                    flex flex-col p-5
                    border-r border-orange-100/50
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                {/* Upper Section: User Profile or Brand Logo */}
                <div className="w-full flex flex-col justify-center items-center py-4 border-b border-orange-200/30">
                    {islogin ? (
                        <div className="w-full flex flex-col justify-center items-center">
                            <img
                                src={userdata?.image_url || blankuser}
                                alt="User avatar"
                                className="w-16 h-16 rounded-full object-cover border-2 border-[#F27734] shadow-sm"
                            />
                            <p className="font-bold mt-3 text-gray-800 text-base max-w-full truncate">
                                {userdata?.name || "User"}
                            </p>
                        </div>
                    ) : (
                        <div className="w-full flex justify-center items-center gap-3 py-2">
                            <img
                                src={logo}
                                className="rounded-full w-9 h-9 object-cover"
                                alt="Socially Logo"
                            />
                            <h1 className="text-2xl font-black tracking-tight text-[#F27734]">Socially</h1>
                        </div>
                    )}
                </div>

                {/* Central Section: Navigation Menu Links */}
                <div className="w-full flex-1 py-8 overflow-y-auto">
                    <ul className="w-full flex flex-col gap-3">
                        <li>
                            <NavLink to="/" className={getLinkClass} onClick={() => setIsOpen(false)}>
                                <FcHome className="text-xl" />
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/reels" className={getLinkClass} onClick={() => setIsOpen(false)}>
                                <FcVideoCall className="text-xl" />
                                <span>Reels</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/savedpost" className={getLinkClass} onClick={() => setIsOpen(false)}>
                                <FaSave className="text-lg" />
                                <span>Saved</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/createreel" className={getLinkClass} onClick={() => setIsOpen(false)}>
                                <BsFillCameraReelsFill className="text-lg" />
                                <span>Create Reel</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Lower Section: Action Buttons Footer */}
                <div className="w-full pt-4 border-t border-orange-200/30">
                    {islogin ? (
                        <div className="flex flex-col gap-2.5">
                            <button
                                onClick={() => { setIsOpen(false); navigate("/profile"); }}
                                className="w-full flex justify-center items-center gap-2 rounded-xl bg-white text-[#F27734] border border-[#F27734] px-4 py-2.5 font-semibold hover:bg-[#F27734] hover:text-white transition-all cursor-pointer"
                            >
                                <span>Profile</span>
                                <FaUserAlt className="text-xs" />
                            </button>
                            
                            <button
                                onClick={handleLogout}
                                className="w-full flex justify-center items-center gap-2 rounded-xl bg-[#F27734] px-4 py-2.5 text-white font-semibold hover:bg-[#d65f1e] transition-all cursor-pointer shadow-xs"
                            >
                                <span>Logout</span>
                                <RiLogoutBoxFill className="text-lg" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => { setIsOpen(false); setIsshowlogin(true); }}
                            className="w-full flex justify-center items-center gap-2 rounded-xl bg-[#F27734] px-4 py-2.5 text-white font-semibold hover:bg-[#d65f1e] transition-all cursor-pointer shadow-xs"
                        >
                            <span>Login</span>
                            <RiLoginBoxFill className="text-lg" />
                        </button>
                    )}
                </div>
            </div>

            {/* Ambient Backdrop Blur Overlay (Mobile Open State Only) */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-30 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Auth Conditional Overlay Portal */}
            {isshowlogin && <Login />}
        </>
    )
}

export default Navbar