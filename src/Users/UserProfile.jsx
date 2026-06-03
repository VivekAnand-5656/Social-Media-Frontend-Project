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
        <div className=' w-[80vw] sm:h-screen flex p-2 items-center justify-between ' >
            <div className=' w-[75%] h-full flex flex-col border ' >
                <div className=' border w-full h-[50%] flex  justify-evenly p-2 items-center  ' >
                    {
                        userfound && "image_url" in userfound ? (
                            <img
                                src={userfound.image_url}
                                alt="userimage"
                                className="w-38 h-38 rounded-full border"
                            />
                        ) : (
                            <img
                                src={blankuser}
                                alt="userimage"
                                className="w-38 h-38 rounded-full border"
                            />
                        )
                    }
                    {/* <img src={userfound.image_url} alt="userimage" className=' w-38 h-38 rounded-full border ' /> */}
                    {
                        userfound ? (
                            <div className=' border w-[50%] p-2 rounded-2xl ' >
                                <p className=' text-2xl font-semibold ' >{userfound.username}</p>
                                <p className=' text-[0.9rem] ' >{userfound.name}</p>
                                <div className=' flex gap-3 justify-center items-center text-center '>
                                    <p className=' flex flex-col '>0 <span className=' font-semibold ' >Posts</span></p>
                                    <p className=' flex flex-col ' >{userfound.numOfFollowers}<span className=' font-semibold cursor-pointer '   >Follower</span></p>
                                    <p className=' flex flex-col '>{userfound.numOfFollowings}<span className=' font-semibold cursor-pointer '   >Following</span></p>
                                    {/* <p className=' flex flex-col ' >{userfound.numOfFollowers}<span className=' font-semibold cursor-pointer ' onClick={() => setIsPage("followers")} >Follower</span></p>
                            <p className=' flex flex-col '>{userfound.numOfFollowings}<span className=' font-semibold cursor-pointer ' onClick={() => setIsPage("followings")} >Following</span></p> */}
                                </div>
                                {/* --- contact --- */}
                                <p className=' text-[0.9rem] p-2 ' >{userfound.email}</p>
                            </div>
                        ) : (
                            <p>Loading </p>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default UserProfile

