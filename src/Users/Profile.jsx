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
            console.log(`Message:- ${response.data}`)
            alert("Post deleted Successfully")
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
            console.log("Post Updated");
            alert("Post updated")
            // setEditform()
        } catch (error) {
            console.log(`Error:- ${error}`)
            alert("Post not updated")
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
            <div className='w-[80vw] h-screen bg-linear-to-br from-[#1B2735] to-[#2A3E48] flex gap-4 p-4 mx-auto' >
                {/* ---------- User Data ------ */}
                <div className='w-[75%] h-full flex flex-col bg-[#0D121A] text-white rounded-3xl shadow-2xl overflow-hidden' >
                    <div className='w-full min-h-63 flex justify-evenly items-center p-6 border-b border-gray-700'>
                        <img src={userdata.image_url} alt="userimage" className='w-40 h-40 rounded-full border-4 border-blue-500 object-cover shadow-lg'/>
                        <div className=' bg-[#2A3E48] w-[50%] p-2 rounded-2xl ' >
                            <p className='text-3xl font-bold mb-3' >{userdata.username}</p>
                            <div className=' flex gap-3 justify-center items-center text-center '>
                                <p className=' flex flex-col '>0 <span className=' font-semibold ' >Posts</span></p>
                                <p className=' flex flex-col ' >{userdata.numOfFollowers}<span className=' font-semibold cursor-pointer ' onClick={() => setIsPage("followers")} >Follower</span></p>
                                <p className=' flex flex-col '>{userdata.numOfFollowings}<span className=' font-semibold cursor-pointer ' onClick={() => setIsPage("followings")} >Following</span></p>
                            </div>
                            <p className=' text-[0.9rem] p-0.5 ' >{userdata.name}</p>
                            {/* --- contact --- */}
                            <p className=' text-[0.9rem] p-0.5 ' >{userdata.email}</p>
                            <button onClick={() => navigate("/updateprofile")} className='mt-4 px-5 py-2 bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer' >Edit Profile</button>
                        </div>
                    </div>
                    {/* --------- My Posts --------- */}
                    <div className='feed  bg-[#2A3E48] p-2 flex-wrap w-full h-full flex  gap-5 rounded-2xl overflow-scroll ' >
                        {
                            // ==== Setup baki hai iska 
                            myposts?.map((post) => (
                                <div key={post.public_id} className="bg-[#4d6f80] w-[30%] h-85  flex flex-col  rounded-xl shadow-md p-1.5 ">

                                    <div className=' relative w-full h-full flex flex-col items-center ' >
                                        {/* ---- 3 dots --- */}
                                        <button className='   self-end-safe text-1rem cursor-pointer z-50 ' onClick={() => setOpendots(opendots?._id === post._id ? null : post)} ><TbDots /></button>
                                        {
                                            opendots?._id === post._id &&
                                            <div className='  ' >
                                                <div className='absolute top-5 right-0 w-25 h-15 text-[0.9rem] text-white bg-black rounded-2xl flex flex-col gap-1 p-1 z-50'>
                                                    <button onClick={() => deletePost(opendots._id)} className=' cursor-pointer ' >Delete Post</button>
                                                    <button onClick={() => setIsEdit(true)} className=' cursor-pointer ' >Edit Post</button>
                                                </div>
                                                {
                                                    isEdit ? (
                                                        <div className=' border-2 w-[20%] flex flex-col p-4 fixed top-1/2 right-1/2 z-50 bg-white ' >
                                                            <form
                                                                onSubmit={(e) => {
                                                                    e.preventDefault();
                                                                    editPost(opendots._id);
                                                                }}
                                                            >
                                                                <RiCloseCircleFill className=' absolute right-0 top-0 text-2xl cursor-pointer ' onClick={() => setIsEdit(false)} />
                                                                <input type="text" name='caption' placeholder='Write your thoughts...'
                                                                    value={editform.caption}
                                                                    onChange={handlechange}
                                                                    className=' border p-2 '
                                                                />
                                                                <button type='submit' >Update</button>
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
                {/* ------- followers and followings ------ */}
                <div className=' w-[25%] h-full bg-[#0D121A] rounded-2xl  text-white ' >
                    <div>
                        {renderfollow()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile