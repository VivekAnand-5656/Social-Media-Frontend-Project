import React, { useContext, useEffect, useState } from 'react' 
import axios from 'axios'

import { AuthContext } from '../Context/AuthContext'
import RightBar from './RightBar'

import { FaRegHeart, FaComments, FaSearch, FaRegSave } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { FaUserLarge, FaRegCommentDots } from "react-icons/fa6";
import { MdOutlineAddCircle } from "react-icons/md";
import { TbDots } from "react-icons/tb";
import { RiCloseCircleFill } from "react-icons/ri";
import { BiSolidSend } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { IoSaveSharp } from "react-icons/io5";

import blankuser from '../assets/blankuser.png'
import { PacmanLoader } from 'react-spinners'
import { toast, Slide } from 'react-toastify'

const Home = () => {
  const { token, userdata, islogin, setUserdata, postUserId, setPostUserId } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [formdata, setFormdata] = useState({ comment: "" })
  const navigate = useNavigate()

  const [posts, setPosts] = useState([])
  const [selectlikepost, setSelectlikepost] = useState(null)
  const [selectcommentpost, setSelectcommentpost] = useState(null)
  const [showMobileRightBar, setShowMobileRightBar] = useState(false) // State to toggle RightBar popup
  const apibase = "https://socialmediaproject-6sl8.onrender.com"

  // ------ Fetch User -------
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${apibase}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUserdata(response.data)
    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }

  // -------- Get All Posts --------
  const getPosts = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apibase}/public/allposts`)
      setPosts(response.data)
    } catch (error) {
      console.log("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  // -------- Like / Unlike --------
  const likepost = async (postId) => {
    try {
      await axios.put(`${apibase}/user/likepost/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await getPosts()
    } catch (error) {
      console.log("Error:", error)
      alert(`Login Please`)
    }
  }

  const unlikepost = async (postId) => {
    try {
      await axios.put(`${apibase}/user/unlikepost/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await getPosts()
    } catch (error) {
      console.log(`Error:- ${error}`);
    }
  }

  // ------------------ Save Post ------------
  const savePost = async (postId) => {
    try {
      await axios.put(`${apibase}/user/savepost/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      getPosts()
      toast.success(`Post Saved`, {
        position: "bottom-right",
        autoClose: 1000,
        theme: "colored",
        transition: Slide,
      });
    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }

  const unSavePost = async (postId) => {
    try {
      await axios.put(`${apibase}/user/unsavepost/${postId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      getPosts()
      toast.success(`Post Unsaved`, {
        position: "bottom-right",
        autoClose: 1000,
        theme: "colored",
        transition: Slide,
      });
    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }

  // ---------- Comment Post --------
  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value })
  }

  const commentPost = async (postId) => {
    try {
      await axios.put(`${apibase}/user/commentpost/${postId}`, formdata, {
        headers: { Authorization: `Bearer ${token}` }
      })
      getPosts()
      setFormdata({ comment: "" })
    } catch (error) {
      console.log(`Error:- ${error}`)
      toast.error('Please Login ❌!', {
        position: "bottom-right",
        autoClose: 1000,
        theme: "colored",
        transition: Slide,
      });
    }
  }

  // ------- Follow / Unfollow --------
  const followpost = async (userId, username) => {
    try {
      await axios.put(`${apibase}/user/follow/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      getPosts()
      toast.success(`You are following ${username}`, {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
        transition: Slide,
      });
    } catch (error) {
      console.log(`Error:- ${error}`);
      toast.error('Please Login ❌!', {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
        transition: Slide,
      });
    }
  }

  const unfollowPost = async (userId, username) => {
    try {
      await axios.put(`${apibase}/user/unfollow/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      getPosts()
      toast.success(`You are unFollowing ${username}`, {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
        transition: Slide,
      });
    } catch (error) {
      console.log(`Error:- ${error}`);
    }
  }

  // ------------------- Search Users --------------------
  const [searchUsers, setSearchUsers] = useState([])
  const [search, setSearch] = useState("")
  const [showUsers, setShowUsers] = useState(false)

  const searchUserData = async () => {
    try {
      const response = await axios.get(`${apibase}/user/findusers?name=${search}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSearchUsers(response.data)
      setShowUsers(true)
    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }

  useEffect(() => {
    getPosts()
    if (token) {
      fetchUser()
    }
    const handleClick = () => setShowUsers(false);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [token])

  const datetime = (time) => {
    return new Date(time).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col lg:flex-row gap-5 p-3 md:p-6 max-w-(screen-2xl) mx-auto">

      {/* ===== Center Content Feed ===== */}
      <div className="w-full lg:flex-1 flex flex-col gap-4">

        {/* Search Bar Block */}
        <div className="bg-[#FDEEE7] w-full rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center p-3 sm:p-4 gap-3 relative shadow-xs border border-orange-100">
          <div className="flex flex-1 items-center gap-2 bg-white rounded-xl px-3 border border-orange-200/60 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
            <input
              type="text"
              name='search'
              value={search}
              onKeyDown={(e) => { if (e.key === "Enter") searchUserData() }}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search users.....'
              className="flex-1 h-11 bg-transparent text-black outline-none text-sm"
            />
            <button onClick={searchUserData} className='p-2 text-gray-500 hover:text-[#F27734] transition-colors shrink-0 cursor-pointer'>
              <FaSearch className="text-base" />
            </button>
          </div>

          {/* Call to Action Row */}
          <div className="flex gap-2 w-full sm:w-auto">
            <button 
              onClick={() => navigate("/createpost")} 
              className="flex-1 sm:flex-none px-4 h-11 bg-[#F27734] text-white text-sm font-semibold rounded-xl hover:bg-orange-600 transition-all cursor-pointer shadow-sm text-center whitespace-nowrap"
            >
              Create Post
            </button>
            
            {/* Toggle Button for Mobile RightBar Dashboard PopUp */}
            <button 
              onClick={() => setShowMobileRightBar(true)} 
              className="lg:hidden flex-1 sm:flex-none px-4 h-11 bg-white text-gray-800 text-sm font-semibold rounded-xl border border-gray-200 hover:bg-gray-100 transition-all cursor-pointer shadow-xs text-center whitespace-nowrap"
            >
              View Insights
            </button>
          </div>

          {/* Search Dropdown Results */}
          {showUsers && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 p-2 max-h-[300px] overflow-y-auto">
              {searchUsers.length > 0 ? (
                searchUsers.map((user) => {
                  const isFollows = user.followers?.some((fl) => fl.user_id === userdata?._id)
                  return (
                    <div key={user._id} className="flex justify-between items-center p-2.5 rounded-xl hover:bg-orange-50 transition-all cursor-pointer gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={user.image_url || blankuser} alt="user" className="w-10 h-10 rounded-full object-cover border border-gray-100 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">@{user.username}</p>
                        </div>
                      </div>
                      {isFollows ? (
                        <button onClick={(e) => { e.stopPropagation(); unfollowPost(user._id, user.name); }} className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-all cursor-pointer shrink-0">
                          Following
                        </button>
                      ) : (
                        <button onClick={(e) => { e.stopPropagation(); followpost(user._id, user.name); }} className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all cursor-pointer shrink-0">
                          Follow
                        </button>
                      )}
                    </div>
                  )
                })
              ) : (
                <p className="p-4 text-center text-gray-500 font-medium text-sm">No users found</p>
              )}
            </div>
          )}
        </div>

        {/* Feed Loader / Content wrapper */}
        {loading ? (
          <div className="flex-1 flex justify-center items-center py-20">
            <PacmanLoader loading={true} color='#F27734' speedMultiplier={1} />
          </div>
          ) : (
              <div className="w-full flex flex-col items-center gap-5 bg-[#FDEEE7]/60 p-3 sm:p-5 md:p-6 rounded-2xl border border-orange-100/50">
              {posts?.map((post) => {
                const isLiked = post.likes?.some((like) => like.user_id === userdata?._id)
                const isFollow = post.user?.followers?.some((fl) => fl.user_id === userdata?._id)
                const isSaved = userdata?.savedPosts?.some((save) => save.post_id === post._id)

                return (
                <div key={post._id} className="bg-white w-full max-w-xl rounded-2xl shadow-sm border border-orange-100/30 p-4 flex flex-col gap-3 transition-transform duration-200 hover:shadow-md">

                  {/* Card Header */}
                  <div className='flex justify-between items-center pb-2 border-b border-gray-50 gap-2'>
                    <span className='flex cursor-pointer items-center gap-3 min-w-0' onClick={() => { setPostUserId(post.user?._id); navigate("/userprofile"); }}>
                      <img
                        src={post.user?.image_url || blankuser}
                        alt="userimage"
                        className="w-9 h-9 rounded-full object-cover border border-gray-100 shrink-0"
                      />
                      <p className="font-semibold text-gray-800 text-sm sm:text-base truncate hover:text-[#F27734] transition-colors">{post.user?.username || "Username"}</p>
                    </span>

                    {isFollow ? (
                      <button onClick={() => unfollowPost(post.user_id, post.user?.name)} className='text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer shrink-0'>
                        Following
                      </button>
                    ) : (
                      <button onClick={() => followpost(post.user_id, post.user?.name)} className='text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer shrink-0'>
                        Follow
                      </button>
                    )}
                  </div>

                  {/* Card Media Content */}
                  <div className='w-full overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center max-h-[480px] border border-gray-100'>
                    {post.post_url?.endsWith(".mp4") ? (
                      <video src={post.post_url} controls className='w-full max-h-[480px] object-cover'></video>
                    ) : (
                      <img src={post.post_url} alt="post" className="w-full max-h-[480px] object-cover" />
                    )}
                  </div>

                  {/* Card Interactions Container */}
                  <div className="flex justify-between items-center pt-1">
                    <div className="flex items-center gap-5">
                      {/* Like Action */}
                      <span className='flex items-center gap-1.5 text-xl cursor-pointer select-none'>
                        {isLiked ? (
                          <FcLike onClick={() => unlikepost(post._id)} className="transform scale-110 active:scale-95 transition-transform" />
                        ) : (
                          <FaRegHeart onClick={() => likepost(post._id)} className="text-gray-700 hover:text-red-500 active:scale-95 transition-all" />
                        )}
                        <span className="text-sm font-semibold text-gray-600 hover:underline" onClick={() => setSelectlikepost(post)}>
                          {post.likes?.length || 0}
                        </span>
                      </span>

                      {/* Comment Action trigger */}
                      <span onClick={() => setSelectcommentpost(post)} className='flex items-center gap-1.5 text-xl text-gray-700 hover:text-blue-500 cursor-pointer select-none transition-colors'>
                        <FaComments />
                        <span className="text-sm font-semibold text-gray-600">{post.comments?.length || 0}</span>
                      </span>
                    </div>

                    {/* Bookmark Save Action */}
                    <div className="text-xl text-gray-700 cursor-pointer">
                      {isSaved ? (
                        <IoSaveSharp onClick={() => unSavePost(post._id)} className="text-amber-500 transform scale-105" />
                      ) : (
                        <FaRegSave onClick={() => savePost(post._id)} className="hover:text-amber-600 transition-colors" />
                      )}
                    </div>
                  </div>

                  {/* Caption Text Section */}
                  <div className='flex justify-between items-start gap-4 pt-1'>
                    <p className="text-sm text-gray-700 leading-relaxed flex-1"><span className="font-semibold mr-1">{post.user?.username}</span>{post.caption}</p>
                    <p className='text-[10px] font-medium text-gray-400 mt-1 whitespace-nowrap'>{datetime(post.createdAt)}</p>
                  </div>

                </div>
              )
            } )}
          </div>
          )
        }
      </div>

      {/* ===== Responsive Modals & Drawers Section ===== */}

      {/* 1. Modal Likes Box Overlay */}
      {selectlikepost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md h-[400px] max-h-[90vh] rounded-2xl flex flex-col p-5 shadow-2xl border border-orange-100">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
              <h2 className="text-lg font-bold text-gray-900">Likes</h2>
              <button onClick={() => setSelectlikepost(null)} className="text-2xl text-gray-400 hover:text-orange-600 transition-colors cursor-pointer">
                <RiCloseCircleFill />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {selectlikepost.likes.length === 0 ? (
                <div className="h-full flex items-center justify-center"><p className="text-gray-500 text-sm">No Likes Yet 💙</p></div>
              ) : (
                selectlikepost.likes.map((like, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-gray-50 bg-gray-50/50 hover:bg-orange-50/60 transition-colors">
                    <p className="font-semibold text-sm text-gray-900">{like.name}</p>
                    <p className="text-xs text-gray-500">@{like.username}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Comments Box Overlay */}
      {selectcommentpost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md h-[450px] max-h-[90vh] rounded-2xl flex flex-col p-5 shadow-2xl border border-orange-100">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
              <h2 className="text-lg font-bold text-gray-900">Comments</h2>
              <button onClick={() => setSelectcommentpost(null)} className="text-2xl text-gray-400 hover:text-orange-600 transition-colors cursor-pointer">
                <RiCloseCircleFill />
              </button>
            </div>

            {/* Messages Stream list */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-3">
              {selectcommentpost.comments.length === 0 ? (
                <div className="h-full flex items-center justify-center"><p className="text-gray-500 text-sm">No Comments Yet 💬</p></div>
              ) : (
                selectcommentpost.comments.map((comment, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-gray-50 bg-gray-50/50">
                    <p className="font-bold text-xs text-gray-900">@{comment.username || "user"}</p>
                    <div className="mt-1 flex gap-2 items-start text-gray-700">
                      <p className="text-sm break-words flex-1 leading-relaxed">{comment.comment}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Sticky Lower Input form bar */}
            <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
              <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
                value={formdata.comment}
                onChange={handlechange}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
              />
              <button onClick={() => commentPost(selectcommentpost._id)} className="text-[#F27734] hover:text-orange-700 transition-transform active:scale-95 cursor-pointer text-3xl shrink-0">
                <BiSolidSend />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Mobile RightBar Slide-over Drawer Modal (Hidden on Desktop) */}
      {showMobileRightBar && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-xs flex justify-end">
          {/* Backdrop click dismiss boundary */}
          <div className="absolute inset-0" onClick={() => setShowMobileRightBar(false)} />
          
          <div className="relative w-[310px] sm:w-[360px] h-full bg-[#FDEEE7] shadow-2xl p-4 flex flex-col overflow-y-auto transform transition-transform duration-300 z-10">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-orange-200/60">
              <h3 className="font-bold text-gray-900 text-base">Dashboard Insights</h3>
              <button onClick={() => setShowMobileRightBar(false)} className="text-2xl text-gray-400 hover:text-orange-600 transition-colors cursor-pointer">
                <RiCloseCircleFill />
              </button>
            </div>
            
            <div className="flex-1">
              <RightBar />
            </div>
          </div>
        </div>
      )}

      {/* ===== Static Right Column Profile Panel (Visible only on Desktop) ===== */}
      <div className="hidden lg:block lg:w-[320px] xl:w-[360px] shrink-0 bg-[#FDEEE7] p-4 rounded-2xl border border-orange-100 h-fit sticky top-6">
        <RightBar />
      </div>

    </div>
  )
}

export default Home