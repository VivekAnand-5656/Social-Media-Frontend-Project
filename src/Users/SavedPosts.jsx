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
            console.log(response.data);
            setSaveposts(response.data)
            console.log("Post mil gi bhai ");


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
            console.log("Post liked");
            fetchsaveposts(userdata._id)

        } catch (error) {
            console.log("Error:", error)
            alert(`Login Please`)
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
            console.log("Unliked Post");
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
            console.log("Comment Successfully")
            alert("Comment Successfully")
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
            fetchsaveposts(userdata._id)
            console.log("Unfollow Successfully");
            alert("Unfollow Successfully")

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
        <div className=" w-[80vw] h-screen flex flex-col justify-center items-center " >
            <h1>Saved Posts</h1>
            <div className='feed w-[80%] border flex gap-2 overflow-scroll ' >
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
                            className="bg-white w-[30%] h-90 flex flex-col rounded-xl shadow-md p-2"
                        >

                            {/* Header */}
                            <div className='flex gap-2 p-2 justify-between items-center'>

                                <span className='flex items-center gap-2'>
                                    {
                                        post.user && "image_url" in post.user ? (
                                            <img
                                                src={post.user.image_url}
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
                                    <p className='text-[0.8rem]' >{post.user.username || "Username"}</p>
                                </span>

                                {/* ----- Follow ------- */}
                                {
                                    isFollow ? (
                                        <button
                                            onClick={() => unfollowPost(post.user_id)}
                                            className='flex items-center cursor-pointer  gap-1'>
                                            Following
                                        </button>
                                    )
                                        : (
                                            <button
                                                onClick={() => followpost(post.user_id)}
                                                className='flex items-center cursor-pointer gap-1'>
                                                Follow
                                            </button>
                                        )
                                }



                            </div>

                            {/* Image */}
                            <div className='w-full h-[80%] flex flex-col items-center'>

                                {
                                    post.post_url.endsWith(".mp4") ? (

                                        <video src={post.post_url} controls
                                            className='w-full h-[70%] rounded-xl object-contain'></video>
                                    ) : (
                                        <img
                                            src={post.post_url}
                                            alt="post"
                                            className="w-full h-[70%] rounded-xl object-contain"
                                        />
                                    )
                                }

                                {/* Actions */}
                                <div className="p-4 w-full flex">

                                    <div className="flex gap-4 mt-2">

                                        {/* Like */}
                                        <span className='flex justify-center cursor-pointer items-center gap-2'>

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
                                            <div className=' feed flex flex-col justify-between  fixed z-50 top-25 shadow-xl right-60 p-2 overflow-scroll bg-[#ffffff] w-[40%] h-[50%] rounded-2xl border ' >
                                                <button
                                                    onClick={() => setSelectcommentpost(null)}
                                                    className=' self-end-safe text-2xl cursor-pointer ' ><RiCloseCircleFill /></button>
                                                <div className=' feed h-[80%] overflow-scroll ' >
                                                    {
                                                        selectcommentpost.comments.length === 0
                                                            ? <p>No Comments</p>
                                                            : selectcommentpost.comments.map((comment, index) => (
                                                                <div key={index} className='    ' >
                                                                    <p className=' text-[1rem] font-semibold ' >{comment.name}</p>
                                                                    <span className=' flex  items-center gap-10 ' ><FaRegCommentDots /><p className=' text-[0.9rem] ' >{comment.comment}</p></span>
                                                                </div>
                                                            ))
                                                    }
                                                </div>
                                                {/* =========== Comment baki hia ===== */}
                                                <div className=' justify-self-end flex justify-between items-center ' >
                                                    <input type="text" name='comment' placeholder='Add comment..........'
                                                        value={formdata.comment}
                                                        onChange={handlechange}
                                                        className=' border w-[90%] p-1.5 rounded-2xl ' />
                                                    <button className=' cursor-pointer  rounded-full text-4xl '
                                                        onClick={() => commentPost(selectcommentpost._id)}
                                                    ><BiSolidSend /></button>
                                                </div>
                                            </div>
                                        }

                                    </div>

                                </div>

                                {/* Caption + Date */}
                                <div className='flex w-full justify-between'>
                                    <p className="text-[0.8rem] line-clamp-1 ">
                                        {post.caption}
                                    </p>

                                    <p>{datetime(post.createdAt)}</p>
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