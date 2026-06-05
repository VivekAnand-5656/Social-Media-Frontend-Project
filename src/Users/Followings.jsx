import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import blankuser from '../assets/blankuser.png'
import { toast, Slide } from 'react-toastify'

const Followings = () => {
    const { token, userdata } = useContext(AuthContext)
    const [myfollowings, setMyfollowings] = useState([])




    const apibase = "https://socialmediaproject-6sl8.onrender.com"
    const fetchFollowings = async () => {
        try {
            const response = await axios.get(`${apibase}/user/myfollowings`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ) 
            setMyfollowings(response.data)

        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }
    useEffect(() => {
        if (token) {
            fetchFollowings()
        }
    }, [token])
    // ------- Follow --------
    const followpost = async (userId,username) => {
        try {
            const response = await axios.put(`${apibase}/user/follow/${userId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            fetchFollowings()
            const followmsg = (username)=>{
                    toast.success(`You are Following ${username}`, {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                  });
                  }
                  followmsg(username)
        } catch (error) {
            console.log(`Error:- ${error}`);
        }
    }
    // ----------- Unfollow -----------
    const unfollowPost = async (userId,username) => {
        try {
            const response = await axios.put(`${apibase}/user/unfollow/${userId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            fetchFollowings()
             const followmsg = (username)=>{
                     toast.success(`You are unFollowing ${username}`, {
                     position: "bottom-right",
                     autoClose: 1000,
                     hideProgressBar: false,
                     closeOnClick: false,
                     pauseOnHover: false,
                     draggable: true,
                     progress: undefined,
                     theme: "colored",
                     transition: Slide,
                   });
                   }
                   followmsg(username)


        } catch (error) {
            console.log(`Error:- ${error}`);
        }
    }

    return (
        <div className="w-full flex flex-col gap-3 p-3">
            {
                myfollowings?.length > 0 ? (
                    myfollowings.map((user) => {
                        const isFollow = user.followers?.some(
                            (fl) => fl.user_id === userdata?._id
                        )

                        return (
                            <div
                                key={user._id}
                                className="flex justify-between items-center bg-[#ffffff]   rounded-xl p-3 hover:border-orange-500 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    {
                                        user && "image_url" in user ? (
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

                                    <p className="text-[0.8rem] font-medium text-black">
                                        {user.name}
                                    </p>
                                </div>

                                {
                                    isFollow ? (
                                        <button
                                            onClick={() => unfollowPost(user._id,user.name)}
                                            className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer transition-all"
                                        >
                                            Following
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => followpost(user._id,user.name)}
                                            className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-all"
                                        >
                                            Follow
                                        </button>
                                    )
                                }
                            </div>
                        )
                    })
                ) : (
                    <p className="text-center text-gray-400 mt-5">
                        No Followings Found
                    </p>
                )
            }
        </div>
    )
}

export default Followings