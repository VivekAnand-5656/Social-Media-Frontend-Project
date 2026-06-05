import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import blankuser from '../assets/blankuser.png'
import { toast, Slide } from 'react-toastify'


const RightBar = () => {
  const { token, islogin, allusers, setAllusers, userdata } = useContext(AuthContext)

  const apibase = "https://socialmediaproject-6sl8.onrender.com"
  const fetchallusers = async () => {
    try {
      const response = await axios.get(`${apibase}/public/users`)

      setAllusers(response.data)
    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }
  // ------------- Follow -----------
  const followpost = async (userId,username) => {
    try {
      const response = await axios.put(`${apibase}/user/follow/${userId}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      fetchallusers()
      const followmsg = (username)=>{
        toast.success(`You are following ${username}`, {
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
      }
      followmsg(username)


    } catch (error) {
      console.log(`Error:- ${error}`);
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
  // --------------- UnFollow ------------
  const unfollowPost = async (userId,username) => {
    try {
      const response = await axios.put(`${apibase}/user/unfollow/${userId}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      fetchallusers()
       const followmsg = (username)=>{
        toast.success(`You are unFollowing ${username}`, {
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
      }
      followmsg(username)

    } catch (error) {
      console.log(`Error:- ${error}`);
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
  useEffect(() => {
    fetchallusers()
  }, [])
  return (
    <div className="w-full bg-[#ffffff] rounded-2xl p-4 text-white flex flex-col gap-3   shadow-lg">

      <p className="font-semibold text-sm text-gray-300">
        Suggestions For You
      </p>

      {
        allusers.map((user) => {
          const isFollow = user.followers?.some(
            (fl) => fl.user_id === userdata?._id
          )

          return (
            <div
              key={user._id}
              className="w-full bg-[#F27734] rounded-xl   p-3 flex justify-between items-center transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                {
                  user && "image_url" in user ? (
                    <img
                      src={user.image_url}
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover border border-gray-600"
                    />
                  ) : (
                    <img
                      src={blankuser}
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover border border-gray-600"
                    />
                  )
                }

                <p className="text-sm font-medium">
                  {user.name}
                </p>
              </div>
              {
                isFollow ? (
                  <button
                    onClick={() => unfollowPost(user._id,user.name)}
                    className="px-3 py-1.5 text-xs bg-gray-700 hover:bg-gray-600 rounded-lg transition-all cursor-pointer"
                  >
                    Following
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      followpost(user._id,user.name)
                      
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
      }

    </div>
  )
}

export default RightBar