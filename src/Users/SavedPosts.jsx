import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import { FaRegHeart } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaUserLarge } from "react-icons/fa6";
import { MdOutlineAddCircle } from "react-icons/md";
import { TbDots } from "react-icons/tb";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa6";
import { BiSolidSend } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
 

import blankuser from '../assets/blankuser.png'

const SavedPosts = () => {
    const { token, userdata } = useContext(AuthContext)
    const [saveposts, setSaveposts] = useState([])
    const [formdata, setFormdata] = useState({
        comment: ""
    })
    const [posts, setPosts] = useState([])
    const [selectlikepost, setSelectlikepost] = useState(null)
    const [selectcommentpost, setSelectcommentpost] = useState(null)


    const apibase = "https://socialmediaproject-6sl8.onrender.com"
    const fetchsaveposts = async (userId) => {
        try {
            const response = await axios.get(`${apibase}/user/savedposts/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ) 
            setSaveposts(response.data) 


        } catch (error) {
            console.log(`Error:- ${error}`);
            console.log(error.detail);

        }
    }
    useEffect(() => {
        if (token) {
            fetchsaveposts(userdata._id)
        }
    }, [token])


    // --------------------------------------------------------------------------------
    // -------- Like / Unlike --------
    const likepost = async (postId) => {
        try {
            await axios.put(
                `${apibase}/user/likepost/${postId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ) 
            fetchsaveposts(userdata._id)

        } catch (error) {
            console.log("Error:", error) 
        }
    }
    // ------------ Unlike Posts --------
    const unlikepost = async (postId) => {
        try {
            const response = await axios.put(`${apibase}/user/unlikepost/${postId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ) 
            fetchsaveposts(userdata._id)

        } catch (error) {
            console.log(`Error:- ${error}`);

        }
    }
    // ---------- Comment Post --------
    const handlechange = (e) => {
        setFormdata(
            { ...formdata, [e.target.name]: e.target.value }
        )
    }
    const commentPost = async (postId) => {
        try {
            const response = await axios.put(`${apibase}/user/commentpost/${postId}`, formdata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            fetchsaveposts(userdata._id)
             
            setFormdata({
                comment: ""
            })

        } catch (error) {
            console.log(`Error:- ${error}`)
            console.log("Comment not posted");

        }
    }
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
            fetchsaveposts(userdata._id)
             
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
            fetchsaveposts(userdata._id)
            

        } catch (error) {
            console.log(`Error:- ${error}`);
        }
    }
    // ------------------------------------



    // -------- Format Date --------
    const datetime = (time) => {
        return new Date(time).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }
    // ------------ Saved tk ho gyi hain ----
    return (
        <div 
        className="w-[85vw] h-screen mx-auto flex flex-col justify-center items-center bg-[#ffffff] text-black" >
            <h1 className="text-2xl uppercase font-semibold mb-6">Saved Posts</h1>
            <div 
            className="feed w-[80%] h-[80vh] flex flex-wrap gap-5 overflow-y-auto p-2" >
                {saveposts?.map((post) => {

                    const isLiked = post.likes?.some(
                        (like) => like.user_id === userdata?._id
                    )
                    const isFollow = post.user.followers?.some(
                        (fl) => fl.user_id === userdata?._id
                    )

                    return (
                        <div
                            key={post._id}
                            className="bg-[#FDEEE7] w-[31%] h-90 flex flex-col rounded-3xl   shadow-lg hover:border-orange-500 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >

                            {/* Header */}
                            <div 
                            className="flex justify-between items-center p-3  ">

                                <span className='flex items-center gap-2'>
                                    {
                                        post.user && "image_url" in post.user ? (
                                            <img
                                                src={post.user.image_url}
                                                alt="userimage"
                                                className="w-9 h-9 rounded-full object-cover border border-gray-600"
                                            />
                                        ) : (
                                            <img
                                                src={blankuser}
                                                alt="userimage"
                                                className="w-9 h-9 rounded-full object-cover border border-gray-600"
                                            />
                                        )
                                    }
                                    <p className='text-[0.8rem]' >{post.user.username || "Username"}</p>
                                </span>

                                {/* ----- Follow ------- */}
                                {
                                    isFollow ? (
                                        <button
                                            onClick={() => unfollowPost(post.user_id)}
                                            className="px-3 text-white py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg transition-all cursor-pointer">
                                            Following
                                        </button>
                                    )
                                        : (
                                            <button
                                                onClick={() => followpost(post.user_id)}
                                                className="px-3 py-1 text-white text-xs bg-blue-600 hover:bg-blue-700 rounded-lg transition-all cursor-pointer">
                                                Follow
                                            </button>
                                        )
                                }



                            </div>

                            {/* Image */}
                            <div className='w-full bg-[#FDEEE7] h-[80%] flex flex-col items-center'>

                                {
                                    post.post_url.endsWith(".mp4") ? (

                                        <video src={post.post_url} controls
                                            className='w-full h-[70%] rounded-xl object-contain'></video>
                                    ) : (
                                        <img
                                            src={post.post_url}
                                            alt="post"
                                            className="w-full h-[65%] object-cover"
                                        />
                                    )
                                }

                                {/* Actions */}
                                <div 
                                className="flex gap-5 px-4 py-2 text-black text-sm">

                                    <div className="flex gap-4 mt-2">

                                        {/* Like */}
                                        <span 
                                        className="flex items-center gap-2 cursor-pointer hover:text-black transition-all">

                                            {
                                                isLiked ? (
                                                    <FcLike
                                                        onClick={() => unlikepost(post._id)}
                                                    />
                                                ) : (
                                                    <FaRegHeart
                                                        onClick={() => likepost(post._id)}
                                                    />
                                                )
                                            }

                                            <span onClick={() => setSelectlikepost(post)} >{post.likes?.length || 0}</span>


                                        </span>
                                        {/* ---------- Like Box ------- */}
                                        {
                                            selectlikepost &&
                                            <div 
                                            className="text-black feed flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#FDEEE7] w-[40%] h-[50%] rounded-3xl border border-gray-700 shadow-2xl p-4">
                                                <button
                                                    onClick={() => setSelectlikepost(null)}
                                                    className=' self-end-safe text-2xl cursor-pointer ' ><RiCloseCircleFill /></button>
                                                {
                                                    selectlikepost.likes.length === 0
                                                        ? <p>No Likes</p>
                                                        : selectlikepost.likes.map((like, index) => (
                                                            <div key={index} 
                                                            className="bg-[#FDEEE7] p-3 rounded-xl border border-gray-700 hover:border-orange-500 transition-all">
                                                                <p className=' text-[1rem] font-semibold ' >{like.name}</p>
                                                                <p className=' text-[0.9rem] ' >{like.username}</p>
                                                            </div>
                                                        ))
                                                }
                                            </div>
                                        }

                                        {/* Comments */}
                                        <span
                                            onClick={() => setSelectcommentpost(post)}
                                            className='flex justify-center cursor-pointer items-center gap-2'>
                                            <FaComments />
                                            {post.comments?.length || 0}
                                        </span>
                                        {/* ---- Show Comments Box ---- */}
                                        {
                                            selectcommentpost &&
                                            <div
                                            className="text-black feed flex flex-col justify-between fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#FDEEE7] w-[45%] h-[60%] rounded-3xl border border-gray-700 shadow-2xl p-4" >
                                                <button
                                                    onClick={() => setSelectcommentpost(null)}
                                                    className=' self-end-safe text-2xl cursor-pointer ' ><RiCloseCircleFill /></button>
                                                <div className=' feed h-[80%] overflow-scroll ' >
                                                    {
                                                        selectcommentpost.comments.length === 0
                                                            ? <p>No Comments</p>
                                                            : selectcommentpost.comments.map((comment, index) => (
                                                                <div key={index} 
                                                                className="bg-[#FDEEE7] p-3 rounded-xl border border-gray-700">
                                                                    <p className=' text-[1rem] font-semibold ' >{comment.name}</p>
                                                                    <span className=' flex  items-center gap-10 ' ><FaRegCommentDots /><p className=' text-[0.9rem] ' >{comment.comment}</p></span>
                                                                </div>
                                                            ))
                                                    }
                                                </div> 
                                                <div className=' justify-self-end flex justify-between items-center ' >
                                                    <input type="text" name='comment' placeholder='Add comment..........'
                                                        value={formdata.comment}
                                                        onChange={handlechange}
                                                        className="flex items-center gap-2 mt-3 border-t border-gray-700 pt-3"/>
                                                    <button 
                                                    className="bg-blue-600 hover:bg-blue-700 p-2.5 rounded-xl transition-all hover:scale-105 cursor-pointer"
                                                        onClick={() => commentPost(selectcommentpost._id)}
                                                    ><BiSolidSend /></button>
                                                </div>
                                            </div>
                                        }

                                    </div>

                                </div>

                                {/* Caption + Date */}
                                <div 
                                className="flex justify-between items-center px-4 py-2 text-sm">
                                    <p 
                                    className="line-clamp-1 text-black-200">
                                        {post.caption}
                                    </p>

                                    <p
                                    className="text-xs text-black-400"
                                    >{datetime(post.createdAt)}</p>
                                </div>

                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SavedPosts