import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FaRegHeart, FaComments } from "react-icons/fa";
import { TbDots } from "react-icons/tb";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa6"; 
import { BiSolidSend as SendIcon } from "react-icons/bi";
import Followers from './Followers';
import Followings from './Followings';
import { toast, Slide } from 'react-toastify';

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
            const response = await axios.get(`${apibase}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const datas = response.data
            setUserdata(datas)
        } catch (error) {
            console.log(`Error:- ${error}`);
        }
    }

    const fetchmyposts = async () => {
        try {
            const response = await axios.get(`${apibase}/user/posts`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const datas = response.data
            setMyposts(datas)
        } catch (error) {
            console.log(`Error:- ${error}`);
        }
    }

    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apibase}/user/deletepost/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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

    const [isEdit, setIsEdit] = useState(false)
    const handlechange = (e) => {
        setEditform({
            ...editform, [e.target.name]: e.target.value
        })
    }

    const editPost = async (postId) => {
        try {
            const response = await axios.put(`${apibase}/user/updatepost/${postId}`, editform, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            fetchmyposts()
            setEditform({
                caption: ""
            })
            setIsEdit(false)
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
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

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
            <div className='w-full max-w-6xl min-h-screen md:h-screen bg-white flex flex-col gap-4 p-2 sm:p-4 mx-auto' >
                {/* ---------- User Data & Posts Wrapper ------ */}
                <div className='w-full h-full flex flex-col bg-[#FDEEE7] text-black gap-4 rounded-2xl shadow-xl p-3 sm:p-4 overflow-hidden' >

                    {/* ---------- Profile Header Component ------ */}
                    <div className='w-full flex flex-col sm:flex-row bg-white rounded-xl justify-between items-center p-4 gap-4 border-b border-orange-700 shadow-sm'>
                        <div className='flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full sm:w-auto'>
                            <img src={userdata?.image_url} alt="userimage" className='w-20 h-20 rounded-full border-4 border-blue-500 object-cover shadow-md' />
                            <div className='w-full sm:w-auto'>
                                <p className='text-xl sm:text-2xl font-bold break-all'>{userdata?.username}</p>
                                <p className='text-sm text-gray-600 p-0.5'>{userdata?.name}</p>
                            </div>
                        </div>

                        {/* Stats Panel */}
                        <div className='bg-[#FDEEE7] w-full sm:w-auto px-6 py-2 rounded-xl flex gap-6 justify-around sm:justify-center items-center text-center'>
                            <p className='flex flex-col text-sm sm:text-base font-bold'>0 <span className='text-xs sm:text-sm font-normal text-gray-700'>Posts</span></p>
                            <p className='flex flex-col text-sm sm:text-base font-bold cursor-pointer' onClick={() => setIsPage("followers")}>{userdata?.numOfFollowers || 0}<span className='text-xs sm:text-sm font-semibold text-gray-700 hover:text-orange-600 transition'>Followers</span></p>
                            <p className='flex flex-col text-sm sm:text-base font-bold cursor-pointer' onClick={() => setIsPage("followings")}>{userdata?.numOfFollowings === null ? 0 : userdata?.numOfFollowings}<span className='text-xs sm:text-sm font-semibold text-gray-700 hover:text-orange-600 transition'>Following</span></p>
                        </div>
                        
                        <button onClick={() => navigate("/updateprofile")} className='w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-sm' >Edit Profile</button>
                    </div>

                    {/* --------- My Posts Feed Grid --------- */}
                    <div className='feed bg-white p-3 w-full h-full rounded-xl overflow-y-auto' >
                        {
                            myposts.length === 0 ? (
                                <div className="w-full flex justify-center items-center min-h-[200px]">
                                    <p className="text-center text-gray-400 font-medium">No Posts Yet</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                                    {myposts?.map((post) => (
                                        <div key={post.public_id} className="bg-[#FDEEE7] w-full min-h-[380px] flex flex-col rounded-xl shadow-md overflow-hidden border border-orange-100 relative">
                                            
                                            {/* ---- 3 dots Action Panel --- */}
                                            <div className="absolute top-2 right-2 z-30">
                                                <button className='p-1.5 bg-white/80 backdrop-blur-xs rounded-full shadow-sm text-lg cursor-pointer hover:bg-white transition' onClick={() => setOpendots(opendots?._id === post._id ? null : post)} ><TbDots /></button>
                                                {
                                                    opendots?._id === post._id &&
                                                    <div className='absolute top-9 right-0 w-28 text-xs text-white bg-black/90 backdrop-blur-xs rounded-xl flex flex-col gap-1 p-1.5 shadow-xl z-40 animate-fade-in'>
                                                        <button onClick={() => deletePost(opendots._id)} className='py-1 px-2 rounded-md hover:bg-red-600 text-left transition' >Delete Post</button>
                                                        <button onClick={() => setIsEdit(true)} className='py-1 px-2 rounded-md hover:bg-gray-700 text-left transition' >Edit Post</button>
                                                    </div>
                                                }
                                            </div>

                                            {/* ---- Edit Post Modal (Centered & Responsive Overlay) ---- */}
                                            {isEdit && opendots?._id === post._id && (
                                                <div className='fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center z-50 p-4' >
                                                    <div className="bg-white text-black rounded-2xl w-full max-w-sm flex flex-col gap-3 p-4 relative shadow-2xl animate-scale-up">
                                                        <button className='absolute right-3 top-3 text-2xl text-gray-400 hover:text-red-500 transition' onClick={() => setIsEdit(false)}>
                                                            <RiCloseCircleFill />
                                                        </button>
                                                        <h3 className="text-md font-bold border-b pb-1">Edit Caption</h3>
                                                        <img src={opendots.post_url} alt="image" className='w-full h-44 object-cover rounded-xl shadow-inner' />
                                                        <form
                                                            onSubmit={(e) => {
                                                                e.preventDefault();
                                                                editPost(opendots._id);
                                                            }}
                                                            className='w-full flex flex-col gap-3'
                                                        >
                                                            <input type="text" name='caption' placeholder='Write your thoughts...'
                                                                value={editform.caption}
                                                                onChange={handlechange}
                                                                className='bg-gray-100 w-full rounded-xl p-3 border text-sm outline-none focus:border-orange-500 transition'
                                                            />
                                                            <button type='submit' className='w-full py-2.5 rounded-xl font-semibold bg-[#ff6a00] hover:bg-[#e05d00] text-white transition shadow-md'>Update Post</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}

                                            {/* ---------------- Post Media Player/Viewer -------------- */}
                                            <div className="w-full h-60 bg-black/5 flex items-center justify-center overflow-hidden">
                                                {
                                                    post.post_url.endsWith(".mp4") ? (
                                                        <video src={post.post_url} controls className='w-full h-full object-cover'></video>
                                                    ) : (
                                                        <img src={post.post_url} alt="post" className="w-full h-full object-cover" />
                                                    )
                                                }
                                            </div>

                                            {/* --- Media Meta Actions --- */}
                                            <div className="p-3 flex-1 flex flex-col justify-between">
                                                <div className="flex gap-4 items-center mb-2">
                                                    {/* --------- Likes ------- */}
                                                    <span className='flex items-center gap-1.5 text-sm font-semibold cursor-pointer group text-gray-700 hover:text-red-500 transition' onClick={() => setSelectlikepost(post)}>
                                                        <FaRegHeart className="text-base group-hover:scale-110 transition" /> 
                                                        <span>{post.likes.length}</span>
                                                    </span>
                                                    
                                                    {/* ------- Comments ------- */}
                                                    <span className='flex items-center gap-1.5 text-sm font-semibold cursor-pointer group text-gray-700 hover:text-blue-500 transition' onClick={() => setSelectpost(post)}>
                                                        <FaComments className="text-base group-hover:scale-110 transition" /> 
                                                        <span>{post.comments.length}</span>
                                                    </span>
                                                </div>

                                                <div className='flex flex-col gap-1'>
                                                    <h2 className="font-semibold text-sm line-clamp-2 text-gray-800">{post.caption}</h2>
                                                    <p className='text-[10px] text-gray-500 uppercase tracking-wider font-medium' >{datetime(post.createdAt)}</p>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* ---- Dynamic Likes Popup Overlay ---- */}
                {selectlikepost && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center z-50 p-4">
                        <div className="text-black bg-[#FDEEE7] w-full max-w-md h-[50vh] rounded-3xl border border-gray-200 shadow-2xl p-4 flex flex-col relative animate-scale-up">
                            <button onClick={() => setSelectlikepost(null)} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 transition cursor-pointer">
                                <RiCloseCircleFill />
                            </button>
                            <h3 className="text-base font-bold border-b border-orange-200 pb-2 mb-3">Liked By</h3>
                            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
                                {selectlikepost.likes.length === 0 ? (
                                    <p className="text-center text-gray-400 my-auto">No Likes Yet</p>
                                ) : selectlikepost.likes.map((like, index) => (
                                    <div key={index} className="bg-white p-2.5 rounded-xl border border-orange-100 shadow-xs">
                                        <p className="text-sm font-bold text-gray-800">{like.name}</p>
                                        <p className="text-xs text-gray-500">@{like.username}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ---- Dynamic Comments Popup Overlay ---- */}
                {selectpost && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center z-50 p-4">
                        <div className="text-black bg-[#FDEEE7] w-full max-w-lg h-[65vh] rounded-3xl border border-gray-200 shadow-2xl p-4 flex flex-col relative animate-scale-up">
                            <button onClick={() => setSelectpost(null)} className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 transition cursor-pointer">
                                <RiCloseCircleFill />
                            </button>
                            <h3 className="text-base font-bold border-b border-orange-200 pb-2 mb-3">Comments</h3>
                            
                            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
                                {selectpost.comments.length === 0 ? (
                                    <p className="text-center text-gray-400 my-auto">No Comments Yet</p>
                                ) : selectpost.comments.map((comment, index) => (
                                    <div key={index} className="bg-white p-3 rounded-xl border border-orange-100 shadow-xs">
                                        <p className="text-xs font-bold text-orange-600">{comment.name}</p>
                                        <div className="flex items-start gap-2 mt-1 text-gray-700">
                                            <FaRegCommentDots className="text-xs mt-0.5 flex-shrink-0 text-gray-400" />
                                            <p className="text-xs sm:text-sm">{comment.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="flex items-center gap-2 mt-3 border-t border-orange-200 pt-3">
                                <input type="text" name="comment" placeholder="Write a comment..." className="flex-1 bg-white border border-orange-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-black placeholder:text-gray-400 outline-none focus:border-orange-500 transition shadow-inner" />
                                <button className="bg-orange-600 hover:bg-orange-700 p-2.5 rounded-xl transition hover:scale-105 cursor-pointer">
                                    <SendIcon className="text-base text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ---------- Dynamic Followers & Followings Popup Modal ---------- */}
                {isPage && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center z-50 p-4">
                        <div className="text-black bg-[#FDEEE7] w-full max-w-md h-[55vh] rounded-3xl border border-gray-200 shadow-2xl p-4 flex flex-col relative animate-scale-up">
                            <button 
                                onClick={() => setIsPage("")} 
                                className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                            >
                                <RiCloseCircleFill />
                            </button>
                            
                            <h2 className="text-lg font-bold border-b border-orange-700 pb-2 mb-3 capitalize">
                                {isPage}
                            </h2>
                            
                            <div className="flex-1 overflow-y-auto pr-1">
                                {renderfollow()}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Profile