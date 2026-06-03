import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import blankuser from '../assets/blankuser.png'

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
            console.log("Data:- ", response.data);
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
    const followpost = async (userId) => {
        try {
            const response = await axios.put(`${apibase}/user/follow/${userId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            fetchFollowings()
            console.log("Follow Successfull");
            alert("Follow Successfully")
        } catch (error) {
            console.log(`Error:- ${error}`);
        }
    }
    // ----------- Unfollow -----------
    const unfollowPost = async (userId) => {
        try {
            const response = await axios.put(`${apibase}/user/unfollow/${userId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            fetchFollowings()
            console.log("Unfollow Successfully");
            alert("Unfollow Successfully")

        } catch (error) {
            console.log(`Error:- ${error}`);
        }
    }

    return (
        <div className=' w-full flex flex-col gap-3 p-1.5 ' >
            {
                myfollowings?.length > 0 ? (
                    myfollowings.map((user) => {
                        const isFollow = user.followers?.some(
                            (fl) => fl.user_id === userdata?._id
                        )
                        return (
                            <div key={user._id} className=' flex justify-between items-center p-1.5 ' >
                                {
                                    user && "image_url" in user ? (
                                        <img
                                            src={user.image_url}
                                            alt="userimage"
                                            className="w-5 h-5 rounded-full "
                                        />
                                    ) : (
                                        <img
                                            src={blankuser}
                                            alt="userimage"
                                            className="w-5 h-5 rounded-full "
                                        />
                                    )
                                }
                                <p>{user.name}</p>
                                {/* ----- Follow ------- */}
                                {
                                    isFollow ? (
                                        <button
                                            onClick={() => unfollowPost(user._id)}
                                            className='flex items-center cursor-pointer  gap-1'>
                                            Following
                                        </button>
                                    )
                                        : (
                                            <button
                                                onClick={() => followpost(user._id)}
                                                className='flex items-center cursor-pointer gap-1'>
                                                Follow
                                            </button>
                                        )
                                }
                            </div>
                        )
                    })
                ) : (
                    <p>No Followings found</p>
                )
            }
        </div>
    )
}

export default Followings