import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { data, useNavigate } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaUserLarge } from "react-icons/fa6";
import { MdOutlineAddCircle } from "react-icons/md";
import { TbDots } from "react-icons/tb";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa6";
import { BiSolidSend } from "react-icons/bi";
import Followers from './Followers';
import Followings from './Followings';
import { toast,Slide } from 'react-toastify';





const Profile = () => {
    const { token, userdata, setUserdata } = useContext(AuthContext)
    const [myposts, setMyposts] = useState([])
    const navigate = useNavigate()
    const [showcomments, setShowcomments] = useState(false)
    const [selectpost, setSelectpost] = useState(null)
    const [selectlikepost, setSelectlikepost] = useState(null)
    const [opendots, setOpendots] = useState(null)
    const [editform, setEditform] = useState({
        caption: ""
    })
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
    // -------------------- Delete Post -----------------------
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apibase}/user/deletepost/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
             toast.success(`Post Deleted `, {
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
            fetchmyposts()
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }
    // --------------------- Edit Post ----------------
    const [isEdit, setIsEdit] = useState(false)
    const handlechange = (e) => {
        setEditform({
            ...editform, [e.target.name]: e.target.value
        })
    }
    const editPost = async (postId) => {
        try {
            const response = await axios.put(`${apibase}/user/updatepost/${postId}`, editform,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            fetchmyposts()
            setEditform({
                caption: ""
            })
             toast.success(`Post Updated`, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                  });
            // setEditform()
        } catch (error) {
            console.log(`Error:- ${error}`) 
        }
    }
    // ----------------- My Followings -----------------
    const [isPage, setIsPage] = useState("")
    const renderfollow = () => {
        switch (isPage) {
            case "followers":
                return <Followers />

            case "followings":
                return <Followings />

            default:
                return null
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
            <div className='w-[85vw] h-screen bg-[#ffffff] flex gap-4 p-4 mx-auto' >
                {/* ---------- User Data ------ */}
                <div className='w-[75%] h-full flex flex-col bg-[#FDEEE7] text-black gap-2 rounded-2xl shadow-2xl p-2 overflow-hidden' >

                    <div className='w-full min-h-35 flex bg-[#ffffff] rounded-lg justify-evenly items-center p-3 border-b border-orange-700'>
                        <img src={userdata.image_url} alt="userimage" className='w-20 h-20 rounded-full border-4 border-blue-500 object-cover shadow-lg' />

                        <div className=' bg-[#FDEEE7] w-[50%] h-full p-1 rounded-lg ' >
                            <p className='text-2xl font-bold ' >{userdata.username}</p>
                            <div className=' flex gap-3 justify-center items-center text-center '>
                                <p className=' flex flex-col '>0 <span className=' font-semibold ' >Posts</span></p>
                                <p className=' flex flex-col ' >{userdata.numOfFollowers}<span className=' font-semibold cursor-pointer ' onClick={() => setIsPage("followers")} >Follower</span></p>
                                <p className=' flex flex-col '>{userdata.numOfFollowings === null?`0`:userdata.numOfFollowings}<span className=' font-semibold cursor-pointer ' onClick={() => setIsPage("followings")} >Following</span></p>
                            </div>
                            <p className=' text-[0.9rem] p-0.5 ' >{userdata.name}</p>

                        </div>
                        <button onClick={() => navigate("/updateprofile")} className='mt-4 px-5 py-2 bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer' >Edit Profile</button>
                    </div>
                    {/* --------- My Posts --------- */}
                    <div className='feed  bg-[#ffffff] p-2 flex-wrap w-full h-full flex  gap-5 rounded-lg overflow-scroll ' >
                        {
                            myposts.length === 0 ? (
                                <p className="text-center m-auto  text-gray-400 mt-20">
                                    No Likes Yet
                                </p>
                            ) : (
                                myposts?.map((post) => (
                                    <div key={post.public_id}
                                        className="bg-[#FDEEE7] cursor-pointer w-[30%] h-85 flex flex-col rounded-lg  shadow-lg   overflow-hidden">

                                        <div className=' relative w-full h-full flex flex-col items-center ' >
                                            {/* ---- 3 dots --- */}
                                            <button className='   self-end-safe text-1rem cursor-pointer  ' onClick={() => setOpendots(opendots?._id === post._id ? null : post)} ><TbDots /></button>
                                            {
                                                opendots?._id === post._id &&
                                                <div className='  ' >
                                                    <div className='absolute top-5 right-0 w-25 h-15 text-[0.9rem] text-white bg-black rounded-2xl flex flex-col gap-1 p-1 z-50'>
                                                        <button onClick={() => deletePost(opendots._id)} className=' cursor-pointer ' >Delete Post</button>
                                                        <button onClick={() => setIsEdit(true)} className=' cursor-pointer ' >Edit Post</button>
                                                    </div>
                                                    {
                                                        isEdit ? (
                                                            <div className=' text-black rounded-2xl  w-[20%] h-[60%] flex flex-col gap-2 justify-between items-center p-1.5 fixed bottom-40  right-110 z-50 bg-white ' >
                                                                <img src={opendots.post_url} alt="image" className=' w-full h-[70%] rounded-2xl  ' />
                                                                <form
                                                                    onSubmit={(e) => {
                                                                        e.preventDefault();
                                                                        editPost(opendots._id);
                                                                    }}
                                                                    className='w-full flex flex-col justify-between gap-2 '
                                                                >
                                                                    <RiCloseCircleFill className=' absolute right-0 top-0 text-2xl cursor-pointer ' onClick={() => setIsEdit(false)} />
                                                                    <input type="text" name='caption' placeholder='Write your thoughts...'
                                                                        value={editform.caption}
                                                                        onChange={handlechange}
                                                                        className=' bg-[#b1adad] w-full rounded p-2 outline-0 '
                                                                    />
                                                                    <button type='submit'
                                                                        className=' w-full p-1.5 rounded cursor-pointer font-semibold bg-[#ff6a00] text-white '
                                                                    >Update</button>
                                                                </form>
                                                            </div>
                                                        ) : (
                                                            null
                                                        )
                                                    }
                                                </div>
                                            }

                                            {/* ---------------- Post card -------------- */}
                                            {
                                                post.post_url.endsWith(".mp4") ? (

                                                    <video src={post.post_url} controls
                                                        className='w-full h-[70%] rounded-2xl object-contain'></video>
                                                ) : (
                                                    <img
                                                        src={post.post_url}
                                                        alt="post"
                                                        className="w-full h-[70%] rounded-2xl object-contain"
                                                    />
                                                )
                                            }

                                            <div className="p-1.5 w-full flex ">

                                                <div className="flex gap-2 mt-2">
                                                    {/* --------- Likes ------- */}
                                                    <span className='flex justify-center cursor-pointer items-center gap-1.5' ><FaRegHeart /> <span onClick={() => setSelectlikepost(post)}>{post.likes.length}</span></span>
                                                    {/* ---- Show Like Box ---- */}
                                                    {
                                                        selectlikepost &&
                                                        <div className="text-black feed flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#FDEEE7] w-[40%] h-[50%] rounded-3xl border border-gray-700 shadow-2xl p-4">

                                                            <button
                                                                onClick={() => setSelectlikepost(null)}
                                                                className="self-end text-2xl text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                                                            >
                                                                <RiCloseCircleFill />
                                                            </button>

                                                            <div className="feed flex-1 overflow-y-auto flex flex-col gap-3">
                                                                {
                                                                    selectlikepost.likes.length === 0
                                                                        ? (
                                                                            <p className="text-center text-gray-400 mt-10">
                                                                                No Likes Yet
                                                                            </p>
                                                                        )
                                                                        : selectlikepost.likes.map((like, index) => (
                                                                            <div
                                                                                key={index}
                                                                                className="bg-[#FDEEE7] p-3 rounded-xl border border-gray-700 hover:border-orange-500 transition-all"
                                                                            >
                                                                                <p className="text-sm font-semibold text-black">
                                                                                    {like.name}
                                                                                </p>

                                                                                <p className="text-xs text-gray-400">
                                                                                    @{like.username}
                                                                                </p>
                                                                            </div>
                                                                        ))
                                                                }
                                                            </div>

                                                        </div>
                                                    }
                                                    {/* ------- Comments ------- */}
                                                    <span className='flex justify-center cursor-pointer items-center gap-1.5' ><FaComments onClick={() => setSelectpost(post)} /> <span onClick={() => setSelectpost(post)}>{post.comments.length}</span></span>
                                                    {/* ---- Show Comments Box ---- */}
                                                    {
                                                        selectpost &&
                                                        <div className="text-white feed flex flex-col justify-between fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#FDEEE7] w-[45%] h-[60%] rounded-3xl border border-gray-700 shadow-2xl p-4">

                                                            <button
                                                                onClick={() => setSelectpost(null)}
                                                                className="self-end text-2xl text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                                                            >
                                                                <RiCloseCircleFill />
                                                            </button>

                                                            <div className="feed h-[80%] overflow-y-auto flex flex-col gap-3">
                                                                {
                                                                    selectpost.comments.length === 0
                                                                        ? (
                                                                            <p className="text-center text-gray-400 mt-10">
                                                                                No Comments Yet
                                                                            </p>
                                                                        )
                                                                        : selectpost.comments.map((comment, index) => (
                                                                            <div
                                                                                key={index}
                                                                                className="bg-[#FDEEE7] p-3 rounded-xl border border-gray-700"
                                                                            >
                                                                                <p className="text-sm font-semibold text-black">
                                                                                    {comment.name}
                                                                                </p>

                                                                                <div className="flex items-center gap-3 mt-1 text-gray-300">
                                                                                    <FaRegCommentDots />
                                                                                    <p className="text-sm">
                                                                                        {comment.comment}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                }
                                                            </div>
                                                            <div className="flex items-center gap-2 mt-3 border-t border-gray-700 pt-3">
                                                                <input type="text" name="comment" placeholder="Write a comment..." className="flex-1 bg-[#FDEEE7] border border-gray-700 rounded-xl px-4 py-2 text-sm text-black placeholder:text-gray-500 outline-none focus:border-orange-500 transition-all" />
                                                                <button className="bg-orange-600 hover:bg-orange-700 p-2.5 rounded-xl transition-all hover:scale-105 cursor-pointer">
                                                                    <BiSolidSend className="text-lg text-white" />
                                                                </button>
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
                            )

                        }
                    </div>
                </div>
                {/* ------- followers and followings ------ */}
                <div className=' w-[25%] h-full bg-[#FDEEE7] rounded-2xl  text-white ' >
                    <div>
                        {renderfollow()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile