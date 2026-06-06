import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import blankuser from '../assets/blankuser.png'

const UserProfile = () => {
    const { postUserId, setPostUserId, token } = useContext(AuthContext)
    const [userfound, setUserfound] = useState(null)

    const apibase = "https://socialmediaproject-6sl8.onrender.com"

    const fetchUser = async (userId) => {
        try {
            console.log("API Calling");
            const response = await axios.get(`${apibase}/user/userbyid/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setUserfound(response.data)
        } catch (error) {
            console.log(`Error:- ${error}`);
        }
    }

    useEffect(() => {
        if (postUserId) {
            fetchUser(postUserId)
        }
    }, [postUserId])

    return (
        // Outer wrapper: Full fluid width, dynamic minimum height to prevent mobile cutoff
        <div className="min-h-screen w-full mx-auto flex items-center justify-center p-4 sm:p-6 bg-white">

            {/* Profile Card Container - Max width safety stops it from stretching too wide on ultra-wide monitors */}
            <div className="w-full max-w-md md:max-w-3xl bg-[#FDEEE7] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10 md:p-12">
                
                {/* Content Layout: Vertical stack on mobile, horizontal row on desktop */}
                <div className="w-full flex flex-col md:flex-row justify-evenly items-center gap-8 md:gap-6">

                    {/* Unified Image Component - Safely falls back if image_url doesn't exist */}
                    <div className="shrink-0">
                        <img
                            src={userfound && "image_url" in userfound ? userfound.image_url : blankuser}
                            alt="userimage"
                            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                        />
                    </div>

                    {/* Profile Data Section */}
                    {userfound ? (
                        <div className="bg-[#ff5608] w-full md:w-[60%] p-6 sm:p-8 rounded-3xl shadow-lg border border-orange-600/20">

                            <p className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                                @{userfound.username}
                            </p>

                            {/* Changed text-gray-400 to text-orange-200 for proper visual contrast on orange backgrounds */}
                            <p className="text-sm font-medium text-orange-200 mt-0.5">
                                {userfound.name}
                            </p>

                            {/* Stats Counter Row */}
                            <div className="flex justify-between sm:justify-start sm:gap-12 mt-6">

                                <div className="text-center sm:text-left">
                                    <p className="text-lg sm:text-xl font-bold text-white">
                                        0
                                    </p>
                                    <span className="text-xs sm:text-sm font-medium text-orange-200/90">
                                        Posts
                                    </span>
                                </div>

                                <div className="text-center sm:text-left">
                                    <p className="text-lg sm:text-xl font-bold text-white">
                                        {userfound.numOfFollowers}
                                    </p>
                                    <span className="text-xs sm:text-sm font-medium text-orange-200/90">
                                        Followers
                                    </span>
                                </div>

                                <div className="text-center sm:text-left">
                                    <p className="text-lg sm:text-xl font-bold text-white">
                                        {userfound.numOfFollowings}
                                    </p>
                                    <span className="text-xs sm:text-sm font-medium text-orange-200/90">
                                        Following
                                    </span>
                                </div>

                            </div>

                            {/* Contact Footer */}
                            <div className="mt-6 border-t border-white/20 pt-4">
                                <p className="text-xs sm:text-sm text-orange-100 flex items-center gap-2">
                                    <span>📧</span> <span className="break-all">{userfound.email}</span>
                                </p>
                            </div>

                        </div>
                    ) : (
                        // Loading State Card matching the dimension footprint
                        <div className="w-full md:w-[60%] flex items-center justify-center p-12">
                            <p className="text-[#ff5608] font-semibold text-lg animate-pulse">
                                Loading Profile...
                            </p>
                        </div>
                    )}

                </div>

            </div>

        </div>
    )
}

export default UserProfile