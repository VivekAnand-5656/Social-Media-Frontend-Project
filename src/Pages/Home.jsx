import React, { useContext, useEffect, useState, } from 'react'
import axios from 'axios'

import { AuthContext } from '../Context/AuthContext'
import RightBar from './RightBar'

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
import { FaSearch } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { IoSaveSharp } from "react-icons/io5";

import blankuser from '../assets/blankuser.png'

// ---- Looties ----
// import {defaul as Lottie} from 'lottie-react'
// import spinner from '../assets/loading.json'

import { PacmanLoader } from 'react-spinners'
import { toast, Slide } from 'react-toastify'




const Home = () => {

  const { token, userdata,islogin, setUserdata, postUserId, setPostUserId } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [formdata, setFormdata] = useState({
    comment: ""
  })
  const navigate = useNavigate()

  const [posts, setPosts] = useState([])
  const [selectlikepost, setSelectlikepost] = useState(null)
  const [selectcommentpost, setSelectcommentpost] = useState(null)
  const apibase = "https://socialmediaproject-6sl8.onrender.com"

  // ------ Fetch User -------
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${apibase}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setUserdata(response.data)
      console.log("User Data", response.data);

    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }


  // -------- Get All Posts --------
  const getPosts = async () => {

    try {
      setLoading(true)
      const response = await axios.get(
        `${apibase}/public/allposts`
      )
      const curposts = response.data

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
      await getPosts()

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

      await getPosts()
    } catch (error) {
      console.log(`Error:- ${error}`);

    }
  }
  // ------------------ Save Post ------------
  const savePost = async (postId) => {
    try {
      const response = await axios.put(`${apibase}/user/savepost/${postId}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      getPosts()
      toast.success(`Post Saved`, {
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
    } catch (error) {
      console.log(`Error:- ${error}`)
      console.log("Post already saved");

    }
  }
  // ------------------- unsave post -----------
  const unSavePost = async (postId) => {
    try {
      const response = await axios.put(`${apibase}/user/unsavepost/${postId}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      getPosts()
      toast.success(`Post Saved`, {
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
    } catch (error) {
      console.log(`Error:- ${error}`)
      console.log("Already unsaved post");

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
      getPosts() 
      setFormdata({
        comment: ""
      })

    } catch (error) {
      console.log(`Error:- ${error}`) 
      toast.error('Please Login ❌!', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });

    }
  }
  // ------- Follow --------
  const followpost = async (userId, username) => {
    try {
      const response = await axios.put(`${apibase}/user/follow/${userId}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      getPosts()
      const followmsg = (username) => {
        toast.success(`You are following ${username}`, {
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
      }
      followmsg(username)
    } catch (error) {
      console.log(`Error:- ${error}`);
      toast.error('Please Login ❌!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  }
  // ----------- Unfollow -----------
  const unfollowPost = async (userId, username) => {
    try {
      const response = await axios.put(`${apibase}/user/unfollow/${userId}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      getPosts()
      const followmsg = (username) => {
        toast.success(`You are unFollowing ${username}`, {
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
      }
      followmsg(username)

    } catch (error) {
      console.log(`Error:- ${error}`);
      toast.error('Please Login ❌!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  }
  // ------------------- Search Users  --------------------
  const [searchUsers, setSearchUsers] = useState([])
  const [search, setSearch] = useState("")
  const [showUsers, setShowUsers] = useState(false)
  const searchUserData = async () => {
    try {
      const response = await axios.get(`${apibase}/user/findusers?name=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log("Search Data:- ", response.data)
      console.log("Search success")
      setSearchUsers(response.data)
      setShowUsers(true)
    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }

  // ------------------------------------
  useEffect(() => {
    getPosts()

    if (token) {
      fetchUser()
    }
    const handleClick = () => setShowUsers(false);

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [])


  // -------- Format Date --------
  const datetime = (time) => {
    return new Date(time).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  }

  return (
    <div className='sm:w-[85vw] sm:h-screen bg-[#ffffff] justify-between  flex gap-2 p-2 '>

      {/* ===== Center ===== */}
      <div className="center  w-[75%] flex flex-col gap-1.5   h-full">

        {/* Search */}
        <div className='bg-[#FDEEE7] w-full h-[8%] rounded flex justify-between items-center'>
          <input
            type="text"
            name='search'
            value={search}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchUserData()
              }
            }}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search users.....'
            className='rounded w-[75%] h-full p-2 bg-[#FDEEE7] text-black outline-none border-r-2 border-r-[#F27734]   '
          />
          <button
            onClick={searchUserData}
            className=' p-1.5 bg-[#c0b8b8] rounded-2xl cursor-pointer ' ><FaSearch /></button>
          {/* .------------ Show users ---------- */}
          {showUsers && (
            <div className="absolute top-12 left-60 w-[50%] bg-[#F27734] border border-[#F27734] rounded-2xl shadow-2xl max-h-72 overflow-y-auto z-50 p-2">

              {searchUsers.length > 0 ? (

                searchUsers.map((user) => {
                  const isFollows = user.followers?.some(
                    (fl) => fl.user_id === userdata?._id
                  )

                  return (
                    <div
                      key={user._id}
                      className="flex justify-between items-center p-3 rounded-xl hover:bg-[#FDEEE7] hover:border-[#F27734] border border-transparent transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={user.image_url || blankuser}
                          alt="user"
                          className="w-10 h-10 rounded-full object-cover border border-gray-600"
                        />

                        <div>
                          <p className="text-sm font-medium text-black">
                            {user.name}
                          </p>

                          <p className="text-xs text-black">
                            @{user.username}
                          </p>
                        </div>
                      </div>

                      {
                        isFollows ? (
                          <button
                            onClick={() => unfollowPost(user._id, user.name)}
                            className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg transition-all cursor-pointer"
                          >
                            Following
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              followpost(user._id, user.name)

                            }}
                            className="px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 rounded-lg transition-all cursor-pointer"
                          >
                            Follow
                          </button>
                        )
                      }
                    </div>
                  )
                })
              ) : (
                <p className="p-4 text-center text-gray-400">
                  No users found
                </p>
              )}

            </div>
          )}
          <button
            onClick={() => navigate("/createpost")}
            className="w-[20%] bg-[#FDEEE7] h-full my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-linear-to-r before:from-[#F27734] before:to-[#F27734] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#000000] font-semibold hover:text-[#ffffff]">
            Create Post
          </button>
        </div>

        {/* ------------- Feed ------------------- */}
        {
          loading ? (
            <div className="flex justify-center items-center h-full">

              <PacmanLoader
                loading={true}
                color='#F27734'
                speedMultiplier={1}
              />
            </div>
          ) : (
            <div className='feed bg-[#FDEEE7] p-2 w-full h-[90%] flex flex-col items-center gap-5 rounded overflow-scroll'>

              {posts?.map((post) => {

                const isLiked = post.likes?.some(
                  (like) => like.user_id === userdata?._id
                )
                const isFollow = post.user.followers?.some(
                  (fl) => fl.user_id === userdata?._id
                )
                const isSaved = userdata?.savedPosts?.some(
                  (save) => save.post_id === post._id
                )
                return (
                  <div
                    key={post._id}
                    className="bg-[#ffffff] w-[45%] h-90 flex flex-col rounded-xl shadow-md p-2"
                  >

                    {/* Header */}
                    <div className='flex gap-2 p-2 justify-between items-center'>

                      <span className='flex cursor-pointer items-center gap-2' onClick={() => {
                        setPostUserId(post.user._id),
                          navigate("/userprofile")
                      }} >
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
                        <p>{post.user.username || "Username"}</p>
                      </span>

                      {/* ----- Follow ------- */}
                      {
                        isFollow ? (
                          <button
                            onClick={() => unfollowPost(post.user_id, post.user.name)}
                            className='flex bg-[#a4a4a7] px-1.5 text-black font-semibold rounded items-center cursor-pointer  gap-1'>
                            Following
                          </button>
                        )
                          : (
                            <button
                              onClick={() => followpost(post.user_id, post.user.name)}
                              className='flex bg-[#0022ff] px-1.5 text-white font-semibold rounded items-center cursor-pointer gap-1'>
                              Follow
                            </button>
                          )
                      }



                    </div>

                    {/* Image */}
                    <div className='w-full  h-[80%] flex flex-col items-center'>
                      {
                        post.post_url.endsWith(".mp4") ? (

                          <video src={post.post_url} controls
                            className='w-full bg-[#aaa6a6] h-[70%] rounded-xl object-cover'></video>
                        ) : (
                          <img
                            src={post.post_url}
                            alt="post"
                            className="w-full bg-[#aaa6a6] h-[70%] rounded-xl object-conver"
                          />
                        )
                      }
                      {/* ---------------------------- Iska size acche se krn ahai image bos ka ---------------- */}
                      {/* Actions */}
                      <div className="p-2 w-full flex">
                        <div className=' flex w-full justify-between items-center ' >
                          <div className="flex w-[20%] gap-4 mt-2 items-center justify-between ">

                            {/* Like */}
                            <span className=' flex justify-center cursor-pointer items-center gap-2'>

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
                              <div className="feed  fixed top-25 right-95 z-50 flex h-[50%] w-[40%] flex-col overflow-y-auto rounded-2xl border border-orange-400 bg-linear-to-br from-orange-50 to-white p-5 shadow-2xl">

                                <button
                                  onClick={() => setSelectlikepost(null)}
                                  className="self-end text-3xl cursor-pointer text-orange-600 transition-all duration-300 hover:scale-110 hover:text-orange-800"
                                >
                                  <RiCloseCircleFill />
                                </button>

                                <h2 className="mb-4 border-b border-orange-200 pb-3 text-xl font-bold text-black">
                                  Likes
                                </h2>

                                {selectlikepost.likes.length === 0 ? (
                                  <div className="flex h-full items-center justify-center">
                                    <p className="text-lg font-medium text-black">
                                      No Likes Yet 💙
                                    </p>
                                  </div>
                                ) : (
                                  selectlikepost.likes.map((like, index) => (
                                    <div
                                      key={index}
                                      className="mb-3 cursor-pointer rounded-xl border border-orange-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-orange-400 hover:bg-orange-50 hover:shadow-md"
                                    >
                                      <p className="text-base font-semibold text-black">
                                        {like.name}
                                      </p>

                                      <p className="text-sm text-black ">
                                        @{like.username}
                                      </p>
                                    </div>
                                  ))
                                )}
                              </div>
                            }

                            {/* -------------------- Comments --------------------- */}
                            <span
                              onClick={() => setSelectcommentpost(post)}
                              className='flex justify-center cursor-pointer items-center gap-2'>
                              <FaComments />
                              {post.comments?.length || 0}
                            </span>
                            {/* ---- Show Comments Box ---- */}
                            {
                              selectcommentpost &&
                              <div className="feed fixed top-25 right-95 z-50 flex h-[50%] w-[40%] flex-col justify-between rounded-2xl border border-orange-500 bg-linear-to-br from-orange-50 to-white p-5 shadow-2xl">

                                <button
                                  onClick={() => setSelectcommentpost(null)}
                                  className="self-end cursor-pointer text-3xl text-orange-600 transition-all duration-300 hover:scale-110 hover:text-orange-800"
                                >
                                  <RiCloseCircleFill />
                                </button>

                                <div className="feed mb-4 flex-1 overflow-y-auto pr-2">
                                  {selectcommentpost.comments.length === 0 ? (
                                    <div className="flex h-full items-center justify-center">
                                      <p className="text-lg font-medium text-black">
                                        No Comments Yet 💬
                                      </p>
                                    </div>
                                  ) : (
                                    selectcommentpost.comments.map((comment, index) => (
                                      <div
                                        key={index}
                                        className="mb-3 cursor-pointer rounded-xl border border-orange-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-orange-400 hover:bg-orange-50 hover:shadow-md"
                                      >
                                        <p className="font-semibold text-black">
                                          {comment.name}
                                        </p>

                                        <div className="mt-2 flex items-center gap-3 text-black">
                                          <FaRegCommentDots className="text-lg" />
                                          <p className="text-sm">{comment.comment}</p>
                                        </div>
                                      </div>
                                    ))
                                  )}
                                </div>

                                <div className="flex items-center gap-3 border-t border-orange-200 pt-3">
                                  <input
                                    type="text"
                                    name="comment"
                                    placeholder="Add a comment..."
                                    value={formdata.comment}
                                    onChange={handlechange}
                                    className="w-full rounded-full border border-orange-300 bg-white px-4 py-2 outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                                  />

                                  <button
                                    onClick={() => commentPost(selectcommentpost._id)}
                                    className="cursor-pointer rounded-full p-2 text-4xl text-orange-600 transition-all duration-300 hover:scale-110 hover:text-orange-800"
                                  >
                                    <BiSolidSend />
                                  </button>
                                </div>

                              </div>
                            }

                          </div>
                          <div className=' w-[10%] flex justify-center items-center ' >
                            {
                              isSaved ? (
                                <IoSaveSharp
                                  onClick={() => unSavePost(post._id)}
                                  className=' cursor-pointer  ' />
                              ) : (

                                <FaRegSave
                                  onClick={() => savePost(post._id)}
                                  className=' cursor-pointer  ' />
                              )
                            }
                          </div>

                        </div>
                      </div>

                      {/* Caption + Date */}
                      <div className='flex w-full justify-between items-center '>
                        <p className="  text-[0.8rem] line-clamp-1 ">
                          {post.caption}
                        </p>

                        <p className=' text-[0.6rem] ' >{datetime(post.createdAt)}</p>
                      </div>

                    </div>

                  </div>
                )
              })}

            </div>
          )
        }


      </div>

      {/* ===== Right ===== */}
      <div className="right w-[30%] bg-[#FDEEE7] p-1.5 rounded h-full">
        <RightBar />
      </div>

    </div>
  )
}

export default Home