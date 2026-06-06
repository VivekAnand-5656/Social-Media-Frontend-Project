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
        <div className="w-full min-h-screen bg-white text-black p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
            <h1 className="text-xl sm:text-2xl uppercase font-semibold mb-6 tracking-wide text-center sm:text-left">
                Saved Posts
            </h1>
            
            {/* Main Fluid Grid Feed Layout */}
            {saveposts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <p className="text-lg">No saved posts found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {saveposts?.map((post) => {
                        const isLiked = post.likes?.some((like) => like.user_id === userdata?._id)
                        const isFollow = post.user?.followers?.some((fl) => fl.user_id === userdata?._id)
                        const targetUserId = post.user?._id || post.user_id

                        return (
                            <div
                                key={post._id}
                                className="bg-[#FDEEE7] w-full h-[380px] flex flex-col rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-orange-100/30"
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center p-3 shrink-0 bg-white/40 border-b border-orange-100/20">
                                    <span className="flex items-center gap-2 min-w-0">
                                        <img
                                            src={post.user?.image_url || blankuser}
                                            alt="userimage"
                                            className="w-8 h-8 rounded-full object-cover border border-gray-300 shrink-0"
                                        />
                                        <p className="text-xs font-semibold truncate text-gray-800">{post.user?.username || "Username"}</p>
                                    </span>

                                    {isFollow ? (
                                        <button
                                            onClick={() => unfollowPost(targetUserId)}
                                            className="px-2.5 py-1 text-[10px] sm:text-xs font-medium bg-gray-700 text-white hover:bg-gray-600 rounded-lg transition-all cursor-pointer shrink-0"
                                        >
                                            Following
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => followpost(targetUserId)}
                                            className="px-2.5 py-1 text-[10px] sm:text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all cursor-pointer shrink-0"
                                        >
                                            Follow
                                        </button>
                                    )}
                                </div>

                                {/* Media Display Body Area */}
                                <div className="w-full flex-1 bg-gray-50 flex items-center justify-center overflow-hidden relative group">
                                    {post.post_url?.endsWith(".mp4") ? (
                                        <video src={post.post_url} controls className="w-full h-full object-cover"></video>
                                    ) : (
                                        <img src={post.post_url} alt="post" className="w-full h-full object-cover" />
                                    )}
                                </div>

                                {/* Core Content Controls & Footer Details */}
                                <div className="bg-white p-3 flex flex-col gap-2 shrink-0">
                                    {/* Action Row */}
                                    <div className="flex gap-4 text-black text-sm items-center">
                                        {/* Like Button */}
                                        <span className="flex items-center gap-1 cursor-pointer select-none">
                                            {isLiked ? (
                                                <FcLike className="text-lg active:scale-90 transition-transform" onClick={() => unlikepost(post._id)} />
                                            ) : (
                                                <FaRegHeart className="text-lg hover:text-red-500 active:scale-90 transition-all" onClick={() => likepost(post._id)} />
                                            )}
                                            <span className="font-semibold text-xs text-gray-600 hover:underline" onClick={() => setActiveLikePostId(post._id)}>
                                                {post.likes?.length || 0}
                                            </span>
                                        </span>

                                        {/* Comment Trigger */}
                                        <span
                                            onClick={() => setActiveCommentPostId(post._id)}
                                            className="flex cursor-pointer items-center gap-1 text-gray-700 hover:text-blue-500 transition-colors"
                                        >
                                            <FaComments className="text-lg" />
                                            <span className="font-semibold text-xs text-gray-600">{post.comments?.length || 0}</span>
                                        </span>
                                    </div>

                                    {/* Caption & Date Row */}
                                    <div className="flex justify-between items-start gap-2 text-xs">
                                        <p className="line-clamp-1 text-gray-700 flex-1 min-w-0">
                                            <span className="font-semibold mr-1 text-gray-900">{post.user?.username}</span>
                                            {post.caption}
                                        </p>
                                        <p className="text-[10px] font-medium text-gray-400 whitespace-nowrap mt-0.5">{datetime(post.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* ================= MODALS SECTION (FULLY RESPONSIVE) ================= */}

            {/* Likes Overlay Box */}
            {currentLikePost && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center z-50 p-4">
                    <div className="text-black flex flex-col bg-[#FDEEE7] w-full max-w-md h-[400px] max-h-[85vh] rounded-3xl border border-orange-200/50 shadow-2xl p-4 sm:p-5 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex justify-between items-center border-b border-orange-200/40 pb-2 mb-3">
                            <h3 className="font-bold text-gray-900">Likes</h3>
                            <button
                                onClick={() => setActiveLikePostId(null)}
                                className="text-2xl cursor-pointer text-gray-400 hover:text-orange-600 transition-colors"
                            >
                                <RiCloseCircleFill />
                            </button>
                        </div>
                        <div className="overflow-y-auto flex-1 flex flex-col gap-2 pr-1">
                            {currentLikePost.likes?.length === 0 ? (
                                <p className="text-center text-gray-500 my-auto text-sm">No Likes yet 💙</p>
                            ) : (
                                currentLikePost.likes?.map((like, index) => (
                                    <div key={index} className="bg-white/80 p-3 rounded-xl border border-gray-100 hover:border-orange-300 transition-all">
                                        <p className="text-sm font-semibold text-gray-900">{like.name}</p>
                                        <p className="text-xs text-gray-500">@{like.username}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Comments Overlay Box */}
            {currentCommentPost && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-center items-center z-50 p-4">
                    <div className="text-black flex flex-col bg-[#FDEEE7] w-full max-w-lg h-[480px] max-h-[85vh] rounded-3xl border border-orange-200/50 shadow-2xl p-4 sm:p-5 animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex justify-between items-center border-b border-orange-200/40 pb-2 mb-3">
                            <h3 className="font-bold text-gray-900">Comments</h3>
                            <button
                                onClick={() => setActiveCommentPostId(null)}
                                className="text-2xl cursor-pointer text-gray-400 hover:text-orange-600 transition-colors"
                            >
                                <RiCloseCircleFill />
                            </button>
                        </div>
                        
                        {/* Dynamic Comments List */}
                        <div className="flex-1 overflow-y-auto flex flex-col gap-2 mb-3 pr-1">
                            {currentCommentPost.comments?.length === 0 ? (
                                <p className="text-center text-gray-500 my-auto text-sm">No Comments yet 💬</p>
                            ) : (
                                currentCommentPost.comments?.map((comment, index) => (
                                    <div key={index} className="bg-white/80 p-3 rounded-xl border border-gray-100">
                                        <p className="text-xs font-bold text-orange-600">@{comment.username || "user"}</p>
                                        <span className="flex items-start gap-2 mt-1">
                                            <FaRegCommentDots className="mt-0.5 text-gray-400 flex-shrink-0 text-sm" />
                                            <p className="text-xs sm:text-sm text-gray-800 break-all leading-relaxed">{comment.comment}</p>
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Input Submission Footer */}
                        <div className="flex gap-2 items-center border-t border-orange-200/40 pt-3">
                            <input
                                type="text"
                                name="comment"
                                placeholder="Add comment..."
                                value={formdata.comment}
                                onChange={handlechange}
                                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                                onKeyDown={(e) => e.key === 'Enter' && commentPost(currentCommentPost._id)}
                            />
                            <button
                                onClick={() => commentPost(currentCommentPost._id)}
                                className="bg-[#F27734] text-white hover:bg-orange-600 p-2.5 rounded-xl transition-all active:scale-95 cursor-pointer flex items-center justify-center text-lg shrink-0 shadow-xs"
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