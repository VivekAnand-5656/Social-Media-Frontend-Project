import React, { useContext, useEffect, useState } from 'react'
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





const Home = () => {
  const { token, userdata, setUserdata, postUserId, setPostUserId } = useContext(AuthContext)
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
      const response = await axios.get(
        `${apibase}/public/allposts`
      )
      const curposts = response.data

      setPosts(response.data)


    } catch (error) {
      console.log("Error:", error)
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
      console.log("Post saved")
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
      console.log("Post UnSaved")
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
      getPosts()
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
      getPosts()
      console.log("Unfollow Successfully");
      alert("Unfollow Successfully")

    } catch (error) {
      console.log(`Error:- ${error}`);
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
    <div className='sm:w-[80vw] sm:h-screen bg-white flex p-2 overflow-scroll'>

      {/* ===== Center ===== */}
      <div className="center w-[75%] bg-[#F5F9FC] border-r-2 h-full">

        {/* Search */}
        <div className='bg-white w-full h-[10%] rounded-2xl flex justify-around items-center'>
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
            className='rounded-2xl w-[60%] p-2 border-2'
          />
          <button
            onClick={searchUserData}
            className=' p-1.5 bg-[#c0b8b8] rounded-2xl cursor-pointer ' ><FaSearch /></button>
          {/* .------------ Show users ---------- */}
          {showUsers && (
            <div className="absolute top-12 left-50 w-[50%] bg-white border rounded shadow-lg max-h-60 overflow-y-auto z-50">
              {searchUsers.length > 0 ? (
                searchUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <p>{user.name}</p>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                      Follow
                    </button>
                  </div>
                ))
              ) : (
                <p className="p-2 text-center">No users found</p>
              )}
            </div>
          )}

          <button
            onClick={() => navigate("/createpost")}
            className='rounded-2xl w-[20%] p-2 border-2'>
            Create Post
          </button>
        </div>

        {/* ------------- Feed ------------------- */}
        <div className='feed bg-[#b8fff8] p-2 w-[80%] h-[90%] flex flex-col items-center gap-5 rounded-2xl overflow-scroll'>

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
                className="bg-white w-[70%] h-90 flex flex-col rounded-xl shadow-md p-2"
              >

                {/* Header */}
                <div className='flex gap-2 p-2 justify-between items-center'>

                  <span className='flex items-center gap-2' onClick={() => {
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

                    <div className="flex gap-4 mt-2 items-center justify-between w-full ">

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

      {/* ===== Right ===== */}
      <div className="right w-[25%] border-2 h-full">
        <RightBar />
      </div>

    </div>
  )
}

export default Home