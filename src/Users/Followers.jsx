import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'

const Followers = () => {
    const { token, userdata } = useContext(AuthContext)
    const [myfollowers, setMyfollowers] = useState([])




    const apibase = "https://socialmediaproject-6sl8.onrender.com"
    const fetchFollowers = async () => {
        try {
            const response = await axios.get(`${apibase}/user/myfollowers`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Data:- ", response.data);
            setMyfollowers(response.data)

        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }
    useEffect(() => {
        if (token) {
            fetchFollowers()
        }
    }, [token])

    return (
        <div className="w-full flex flex-col gap-3 p-3">
            {
                myfollowers?.length > 0 ? (
                    myfollowers.map((user) => (
                        <div
                            key={user._id}
                            className="flex items-center gap-3 bg-[#ffffff]  rounded-xl p-3 hover:border-orange-500 transition-all"
                        >
                            {
                                user?.image_url ? (
                                    <img
                                        src={user.image_url}
                                        alt="user"
                                        className="w-10 h-10 rounded-full object-cover border border-gray-600"
                                    />
                                ) : (
                                    <img
                                        src={blankuser}
                                        alt="user"
                                        className="w-10 h-10 rounded-full object-cover border border-gray-600"
                                    />
                                )
                            }

                            <div>
                                <p className="text-sm font-medium text-black">
                                    {user.name}
                                </p>

                                <p className="text-xs text-gray-400">
                                    Follower
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400 mt-5">
                        No Followers Found
                    </p>
                )
            }
        </div>
    )
}
export default Followers