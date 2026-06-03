import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import blankuser from '../assets/blankuser.png'

const RightBar = () => {
  const { token, allusers, setAllusers, userdata } = useContext(AuthContext)

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
  const followpost = async (userId) => {
    try {
      const response = await axios.put(`${apibase}/user/follow/${userId}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      fetchallusers()
      console.log("Follow Successfull");
      alert("Follow Successfully")
    } catch (error) {
      console.log(`Error:- ${error}`);
    }
  }
  // --------------- UnFollow ------------
  const unfollowPost = async (userId) => {
    try {
      const response = await axios.put(`${apibase}/user/unfollow/${userId}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      fetchallusers()
      console.log("Unfollow Successfully");
      alert("Unfollow Successfully")

    } catch (error) {
      console.log(`Error:- ${error}`);
    }
  }
  useEffect(() => {
    fetchallusers()
  }, [])
  return (
    <div className=' w-full bg-white  ' >
      {
        allusers.map((user) => {
          const isFollow = user.followers?.some(
            (fl) => fl.user_id === userdata?._id
          )
          return (
            <div className='w-full p-1.5 flex justify-between items-center ' >
              {
                user && "image_url" in user ? (
                  <img
                    src={user.image_url}
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
              <p>{user.name}</p>
              {
                isFollow ? (
                  <button
                    onClick={() => unfollowPost(user._id)}
                    className='flex items-center cursor-pointer  gap-1'>
                    Following
                  </button>
                )
                  : (
                    <button
                      onClick={() => followpost(user._id)}
                      className='flex items-center cursor-pointer gap-1'>
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