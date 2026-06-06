import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import { FaRegHeart, FaComments } from "react-icons/fa"
import { FcLike } from "react-icons/fc"
import { RiCloseCircleFill } from "react-icons/ri"
import { FaRegCommentDots } from "react-icons/fa6"
import { BiSolidSend } from "react-icons/bi"
import blankuser from '../assets/blankuser.png'

const SavedPosts = () => {
    const { token, userdata } = useContext(AuthContext)
    const [saveposts, setSaveposts] = useState([])
    const [formdata, setFormdata] = useState({ comment: "" })
    
    // Track ONLY the IDs of the active modals to prevent stale data bugs
    const [activeLikePostId, setActiveLikePostId] = useState(null)
    const [activeCommentPostId, setActiveCommentPostId] = useState(null)

    const apibase = "https://socialmediaproject-6sl8.onrender.com"

    const fetchsaveposts = async (userId) => {
        if (!userId) return
        try {
            const response = await axios.get(`${apibase}/user/savedposts/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setSaveposts(response.data)
        } catch (error) {
            console.error("Error fetching saved posts:", error)
        }
    }

    useEffect(() => {
        if (token && userdata?._id) {
            fetchsaveposts(userdata._id)
        }
    }, [token, userdata?._id])

    // -------- Like / Unlike --------
    const likepost = async (postId) => {
        try {
            await axios.put(`${apibase}/user/likepost/${postId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchsaveposts(userdata?._id)
        } catch (error) {
            console.error("Error liking post:", error)
        }
    }

    const unlikepost = async (postId) => {
        try {
            await axios.put(`${apibase}/user/unlikepost/${postId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchsaveposts(userdata?._id)
        } catch (error) {
            console.error("Error unliking post:", error)
        }
    }

    // ---------- Comment Post --------
    const handlechange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const commentPost = async (postId) => {
        if (!formdata.comment.trim()) return
        try {
            await axios.put(`${apibase}/user/commentpost/${postId}`, formdata, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchsaveposts(userdata?._id)
            setFormdata({ comment: "" })
        } catch (error) {
            console.error("Comment not posted:", error)
        }
    }

    // ------- Follow / Unfollow --------
    const followpost = async (userId) => {
        try {
            await axios.put(`${apibase}/user/follow/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchsaveposts(userdata?._id)
        } catch (error) {
            console.error("Error following user:", error)
        }
    }

    const unfollowPost = async (userId) => {
        try {
            await axios.put(`${apibase}/user/unfollow/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchsaveposts(userdata?._id)
        } catch (error) {
            console.error("Error unfollowing user:", error)
        }
    }

    const datetime = (time) => {
        return new Date(time).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }

    // Derive the currently selected post data from the fresh saveposts state array
    const currentLikePost = saveposts.find(p => p._id === activeLikePostId)
    const currentCommentPost = saveposts.find(p => p._id === activeCommentPostId)

    return (
        <div className="w-[85vw] h-screen mx-auto flex flex-col justify-center items-center bg-[#ffffff] text-black relative">
            <h1 className="text-2xl uppercase font-semibold mb-6">Saved Posts</h1>
            
            {/* Main Grid Feed */}
            <div className="feed w-[80%] h-[80vh] flex flex-wrap gap-5 overflow-y-auto p-2">
                {saveposts?.map((post) => {
                    const isLiked = post.likes?.some((like) => like.user_id === userdata?._id)
                    const isFollow = post.user?.followers?.some((fl) => fl.user_id === userdata?._id)
                    const targetUserId = post.user?._id || post.user_id

                    return (
                        <div
                            key={post._id}
                            className="bg-[#FDEEE7] w-[31%] h-90 flex flex-col rounded-3xl shadow-lg hover:border-orange-500 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center p-3">
                                <span className="flex items-center gap-2">
                                    <img
                                        src={post.user?.image_url || blankuser}
                                        alt="userimage"
                                        className="w-9 h-9 rounded-full object-cover border border-gray-600"
                                    />
                                    <p className="text-[0.8rem] font-medium">{post.user?.username || "Username"}</p>
                                </span>

                                {isFollow ? (
                                    <button
                                        onClick={() => unfollowPost(targetUserId)}
                                        className="px-3 text-white py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg transition-all cursor-pointer"
                                    >
                                        Following
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => followpost(targetUserId)}
                                        className="px-3 py-1 text-white text-xs bg-blue-600 hover:bg-blue-700 rounded-lg transition-all cursor-pointer"
                                    >
                                        Follow
                                    </button>
                                )}
                            </div>

                            {/* Media Body */}
                            <div className="w-full bg-[#FDEEE7] h-[80%] flex flex-col items-center justify-between">
                                {post.post_url?.endsWith(".mp4") ? (
                                    <video src={post.post_url} controls className="w-full h-[65%] rounded-xl object-contain"></video>
                                ) : (
                                    <img src={post.post_url} alt="post" className="w-full h-[65%] object-cover" />
                                )}

                                {/* Actions Row */}
                                <div className="w-full flex gap-5 px-4 py-1 text-black text-sm items-center">
                                    {/* Like Toggle Asset */}
                                    <span className="flex items-center gap-1.5 cursor-pointer implementation-row">
                                        {isLiked ? (
                                            <FcLike className="text-lg" onClick={() => unlikepost(post._id)} />
                                        ) : (
                                            <FaRegHeart className="text-lg" onClick={() => likepost(post._id)} />
                                        )}
                                        <span className="font-medium" onClick={() => setActiveLikePostId(post._id)}>
                                            {post.likes?.length || 0}
                                        </span>
                                    </span>

                                    {/* Comment trigger */}
                                    <span
                                        onClick={() => setActiveCommentPostId(post._id)}
                                        className="flex cursor-pointer items-center gap-1.5"
                                    >
                                        <FaComments className="text-lg text-neutral-700" />
                                        <span className="font-medium">{post.comments?.length || 0}</span>
                                    </span>
                                </div>

                                {/* Caption & Date Footer */}
                                <div className="w-full flex justify-between items-center px-4 pb-3 pt-1 text-sm">
                                    <p className="line-clamp-1 text-neutral-700 flex-1 pr-2">{post.caption}</p>
                                    <p className="text-xs text-neutral-500 whitespace-nowrap">{datetime(post.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* ================= MODALS SECTION (LIFTED OUTSIDE LOOP) ================= */}

            {/* Likes Overlay Box */}
            {currentLikePost && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="text-black flex flex-col bg-[#FDEEE7] w-[40%] h-[50%] rounded-3xl border border-gray-700 shadow-2xl p-4">
                        <button
                            onClick={() => setActiveLikePostId(null)}
                            className="self-end text-2xl cursor-pointer text-neutral-700 hover:text-black mb-2"
                        >
                            <RiCloseCircleFill />
                        </button>
                        <div className="overflow-y-auto flex-1 flex flex-col gap-2 pr-1">
                            {currentLikePost.likes?.length === 0 ? (
                                <p className="text-center text-neutral-500 my-auto">No Likes yet</p>
                            ) : (
                                currentLikePost.likes?.map((like, index) => (
                                    <div key={index} className="bg-white/60 p-3 rounded-xl border border-gray-200 hover:border-orange-400 transition-all">
                                        <p className="text-[1rem] font-semibold">{like.name}</p>
                                        <p className="text-[0.9rem] text-neutral-600">@{like.username}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Comments Overlay Box */}
            {currentCommentPost && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="text-black flex flex-col justify-between bg-[#FDEEE7] w-[45%] h-[60%] rounded-3xl border border-gray-700 shadow-2xl p-4">
                        <button
                            onClick={() => setActiveCommentPostId(null)}
                            className="self-end text-2xl cursor-pointer text-neutral-700 hover:text-black"
                        >
                            <RiCloseCircleFill />
                        </button>
                        
                        {/* Dynamic Comments List */}
                        <div className="h-[70%] overflow-y-auto flex flex-col gap-2 my-2 pr-1">
                            {currentCommentPost.comments?.length === 0 ? (
                                <p className="text-center text-neutral-500 my-auto">No Comments yet</p>
                            ) : (
                                currentCommentPost.comments?.map((comment, index) => (
                                    <div key={index} className="bg-white/60 p-3 rounded-xl border border-gray-200">
                                        <p className="text-[1rem] font-semibold text-orange-600">{comment.name}</p>
                                        <span className="flex items-start gap-2 mt-1">
                                            <FaRegCommentDots className="mt-1 text-neutral-500 flex-shrink-0" />
                                            <p className="text-[0.9rem] text-neutral-800">{comment.comment}</p>
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Input Submission Footer */}
                        <div className="flex gap-2 items-center border-t border-gray-300 pt-3">
                            <input
                                type="text"
                                name="comment"
                                placeholder="Add comment..."
                                value={formdata.comment}
                                onChange={handlechange}
                                className="flex-1 bg-white border border-gray-400 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
                                onKeyDown={(e) => e.key === 'Enter' && commentPost(currentCommentPost._id)}
                            />
                            <button
                                onClick={() => commentPost(currentCommentPost._id)}
                                className="bg-blue-600 text-white hover:bg-blue-700 p-2.5 rounded-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center"
                            >
                                <BiSolidSend />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SavedPosts