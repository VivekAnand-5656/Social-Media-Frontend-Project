import axios from 'axios'
import React, { useState } from 'react'
import { HashLoader } from 'react-spinners'
import { toast, Slide } from 'react-toastify'

const Signup = () => {
  const [loading, setLoading] = useState()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    username: ""
  })

  const apibase = "https://socialmediaproject-6sl8.onrender.com"

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    const payload = {
      ...formData,
      createdAt: new Date().toISOString()
    }

    try {
      setLoading(true)
      const response = await axios.post(
        `${apibase}/public/createUser`,
        payload
      )
      toast.success('☑️ Account Created Successfully', {
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

      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        username: ""
      })

    } catch (error) {
      console.log("Error:", error)
      toast.error('Something Wwnt wrong ❌!', {
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
       
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {
        loading ? (
          <div className=' w-[85vw] h-screen    bg-[#ffffff]  text-black   p-2 flex flex-col justify-center items-center  '  >
            <div className=' w-[40%] h-[60%]    flex justify-center items-center  ' >


              <HashLoader
                loading={true}
                color='#F27734'
                speedMultiplier={1}
              />
            </div>
          </div>

        ) : (
          <div className='w-[80vw] bg-[#ffffff] h-screen flex justify-center items-center'>

            <form
              onSubmit={handleSignup}
              className='w-[40%] h-[80%] rounded-lg bg-[#F27734] flex flex-col justify-center items-center gap-4 '
            >
              <h1 className=' text-2xl font-bold uppercase ' >Sign Up</h1>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className=' bg-[#FDEEE7] w-[50%]  rounded text-black  outline-0 p-1.5 '
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className=' bg-[#FDEEE7] w-[50%]  rounded text-black  outline-0 p-1.5 '
              />

              <input
                type="number"
                name="mobile"
                placeholder="Mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                className=' bg-[#FDEEE7] w-[50%]  rounded text-black  outline-0 p-1.5 '
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className=' bg-[#FDEEE7] w-[50%]  rounded text-black  outline-0 p-1.5 '
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleChange}
                className=' bg-[#FDEEE7] w-[50%]  rounded text-black  outline-0 p-1.5 '
              />

              <button
                type="submit"
                className=' cursor-pointer bg-[#ffffff]     font-semibold  w-[50%]  rounded text-black hover:bg-[#fd5304] hover:text-white transition-all duration-500 ease-in-out   p-1.5 '
              >
                Create Account
              </button>
            </form>
          </div>
        )
      }
    </>

  )
}

export default Signup