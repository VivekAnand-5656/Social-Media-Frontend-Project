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

            const response = await axios.get(`${apibase}/user/userbyid/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const datas = response.data
            setUserfound(datas)


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
        <div className="w-[85vw]  h-screen mx-auto flex items-center justify-center p-5 bg-[#ffffff]">

            <div className="w-[75%] h-[85%] bg-[#FDEEE7] rounded-3xl shadow-2xl overflow-hidden">

                <div className="w-full h-full flex justify-evenly items-center px-8">

                    {
                        userfound && "image_url" in userfound ? (
                            <img
                                src={userfound.image_url}
                                alt="userimage"
                                className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                            />
                        ) : (
                            <img
                                src={blankuser}
                                alt="userimage"
                                className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                            />
                        )
                    }

                    {
                        userfound ? (
                            <div className="bg-[#ff5608] w-[55%] p-6 rounded-3xl border border-gray-700 shadow-lg">

                                <p className="text-xl font-semibold text-white">
                                    @{userfound.username}
                                </p>

                                <p className="text-sm text-gray-400 mt-1">
                                    {userfound.name}
                                </p>

                                <div className="flex gap-10 mt-5">

                                    <div className="text-center">
                                        <p className="text-lg font-semibold text-white">
                                            0
                                        </p>
                                        <span className="text-sm text-gray-400">
                                            Posts
                                        </span>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-lg font-semibold text-white">
                                            {userfound.numOfFollowers}
                                        </p>
                                        <span className="text-sm text-gray-400">
                                            Followers
                                        </span>
                                    </div>

                                    <div className="text-center">
                                        <p className="text-lg font-semibold text-white">
                                            {userfound.numOfFollowings}
                                        </p>
                                        <span className="text-sm text-gray-400">
                                            Following
                                        </span>
                                    </div>

                                </div>

                                <div className="mt-5 border-t border-gray-700 pt-4">
                                    <p className="text-sm text-gray-300">
                                        📧 {userfound.email}
                                    </p>
                                </div>

                            </div>
                        ) : (
                            <p className="text-white">
                                Loading...
                            </p>
                        )
                    }

                </div>

            </div>

        </div>
    )
}

export default UserProfile

