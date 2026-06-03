import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { data } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaUserLarge } from "react-icons/fa6";
import { MdOutlineAddCircle } from "react-icons/md";
import { TbDots } from "react-icons/tb";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa6";
import { BiSolidSend } from "react-icons/bi";





const Profile = () => {
    const { token, userdata, setUserdata } = useContext(AuthContext)
    const [myposts, setMyposts] = useState([])
    const [showcomments, setShowcomments] = useState(false)
    const [selectpost, setSelectpost] = useState(null)
    const [selectlikepost, setSelectlikepost] = useState(null)
    const [opendots, setOpendots] = useState(null)
    const apibase = "https://socialmediaproject-6sl8.onrender.com"

    const fetchUser = async () => {

        try {
            console.log("API Calling");

            const response = await axios.get(`${apibase}/user/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const datas = response.data
            setUserdata(datas)

        } catch (error) {
            console.log(`Error:- ${error}`);

        }
    }

    // ========== My Posts ===========
    const fetchmyposts = async () => {
        try {
            const response = await axios.get(`${apibase}/user/posts`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const datas = response.data
            setMyposts(datas)

        } catch (error) {
            console.log(`Error:- ${error}`);

        }
    }

    useEffect(() => {
        if (token) {
            fetchUser()
            fetchmyposts()
        }
    }, [token])

    const datetime = (time) => {
        const date = new Date(time).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
        return date
    }


    return (
        <>
            <div className=' w-[80vw] sm:h-screen border flex flex-col p-2 items-center ' >
                {/* ---------- User Data ------ */}
                <div className=' border w-[50%] h-[50%] flex  justify-evenly p-2 items-center  ' >
                    <img src={userdata.image} alt="userimage" className=' w-38 h-38 rounded-full border ' />
                    <div className=' border w-[50%] p-2 rounded-2xl ' >
                        <p className=' text-2xl font-semibold ' >{userdata.username}</p>
                        <p className=' text-[0.9rem] ' >{userdata.name}</p>
                        <div className=' flex gap-3 justify-center items-center text-center '>
                            <p className=' flex flex-col '>0 <span className=' font-semibold ' >Posts</span></p>
                            <p className=' flex flex-col ' >{userdata.numOfFollowers}<span className=' font-semibold ' >Follower</span></p>
                            <p className=' flex flex-col '>{userdata.numOfFollowings}<span className=' font-semibold ' >Following</span></p>
                        </div>
                        {/* --- contact --- */}
                        <p className=' text-[0.9rem] p-2 ' >{userdata.email}</p>
                        <button className=' p-2 bg-[#b0b3db] rounded-2xl cursor-pointer ' >Edit Profile</button>
                    </div>
                </div>
                {/* --------- My Posts --------- */}
                <div className='feed  bg-[#575353] w-[80%] h-[90%] flex  gap-5 rounded-2xl overflow-scroll ' >
                    {
                        // ==== Setup baki hai iska 
                        myposts?.map((post) => (
                            <div key={post.public_id} className="bg-white w-[30%] h-85  flex flex-col  rounded-xl shadow-md p-1.5 ">

                                <div className=' relative w-full h-full flex flex-col items-center ' >
                                    {/* ---- 3 dots --- */}
                                    <button className='   self-end-safe text-1rem cursor-pointer z-50 ' onClick={() => setOpendots(opendots?._id === post._id ? null : post)} ><TbDots /></button>
                                    {
                                        opendots?._id === post._id &&
                                        <div className='absolute top-5 right-0 w-25 h-15 text-[0.9rem] text-white bg-black rounded-2xl flex flex-col gap-1 p-1 z-50'>
                                            <button>Delete Post</button>
                                            <button>Edit Post</button>
                                        </div>
                                    }

                                    {/* ---------------- Post card -------------- */}
                                    <img
                                        src={post.post_url}
                                        alt="post"
                                        className="w-full h-[70%] rounded-xl object-cover  "
                                    />

                                    <div className="p-1.5 w-full flex ">

                                        <div className="flex gap-2 mt-2">
                                            {/* --------- Likes ------- */}
                                            <span className='flex justify-center cursor-pointer items-center gap-1.5' ><FaRegHeart /> <span onClick={() => setSelectlikepost(post)}>{post.likes.length}</span></span>
                                            {/* ---- Show Like Box ---- */}
                                            {
                                                selectlikepost &&
                                                <div className=' feed flex flex-col  fixed z-50 top-25 shadow-xl right-60 p-2 overflow-scroll bg-[#ffffff] w-[40%] h-[50%] rounded-2xl border ' >
                                                    <button
                                                        onClick={() => setSelectlikepost(null)}
                                                        className=' self-end-safe text-2xl cursor-pointer ' ><RiCloseCircleFill /></button>
                                                    {
                                                        selectlikepost.likes.length === 0
                                                            ? <p>No Likes</p>
                                                            : selectlikepost.likes.map((like, index) => (
                                                                <div key={index} className='  ' >
                                                                    <p className=' text-[1rem] font-semibold ' >{like.name}</p>
                                                                    <p className=' text-[0.9rem] ' >{like.username}</p>
                                                                </div>
                                                            ))
                                                    }
                                                </div>
                                            }
                                            {/* ------- Comments ------- */}
                                            <span className='flex justify-center cursor-pointer items-center gap-1.5' ><FaComments onClick={() => setSelectpost(post)} /> <span onClick={() => setSelectpost(post)}>{post.comments.length}</span></span>
                                            {/* ---- Show Comments Box ---- */}
                                            {
                                                selectpost &&
                                                <div className=' feed flex flex-col justify-between  fixed z-50 top-25 shadow-xl right-60 p-2 overflow-scroll bg-[#ffffff] w-[40%] h-[50%] rounded-2xl border ' >
                                                    <button
                                                        onClick={() => setSelectpost(null)}
                                                        className=' self-end-safe text-2xl cursor-pointer ' ><RiCloseCircleFill /></button>
                                                    <div className=' feed h-[80%] overflow-scroll ' >
                                                        {
                                                            selectpost.comments.length === 0
                                                                ? <p>No Comments</p>
                                                                : selectpost.comments.map((comment, index) => (
                                                                    <div key={index} className='    ' >
                                                                        <p className=' text-[1rem] font-semibold ' >{comment.name}</p>
                                                                        <span className=' flex  items-center gap-10 ' ><FaRegCommentDots /><p className=' text-[0.9rem] ' >{comment.comment}</p></span>
                                                                    </div>
                                                                ))
                                                        }
                                                    </div>
                                                    <div className=' justify-self-end flex justify-between items-center ' >
                                                        <input type="text" name='comment' placeholder='Add comment..........'
                                                            className=' border w-[90%] p-1.5 rounded-2xl ' />
                                                        <button className=' cursor-pointer  rounded-full text-4xl ' ><BiSolidSend /></button>
                                                    </div>
                                                </div>
                                            }
                                        </div>

                                    </div>
                                    <div className=' flex flex-col w-full justify-between ' >
                                        <h2 className="font-semibold text-[0.9rem] line-clamp-1 ">{post.caption}</h2>
                                        <p className=' text-[0.5rem]  ' >{datetime(post.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Profile