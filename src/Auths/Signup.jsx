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
          /* Responsive Loading Viewport Wrapper */
          <div className='w-full min-h-screen bg-white p-4 flex flex-col justify-center items-center' >
            <div className='flex justify-center items-center' >
              <HashLoader
                loading={true}
                color='#F27734'
                speedMultiplier={1}
              />
            </div>
          </div>

        ) : (
          /* Responsive Signup Viewport Wrapper */
          <div className='w-full min-h-screen bg-white flex items-center justify-center p-4'>

            {/* Responsive Form Container Card */}
            <form
              onSubmit={handleSignup}
              className='w-full max-w-md bg-[#F27734] text-white rounded-2xl flex flex-col items-center gap-4 p-6 sm:p-10 shadow-xl'
            >
              <h1 className='text-2xl font-bold uppercase tracking-wider mb-2' >Sign Up</h1>
              
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                className='bg-[#FDEEE7] w-full max-w-xs rounded text-black outline-none p-2'
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className='bg-[#FDEEE7] w-full max-w-xs rounded text-black outline-none p-2'
              />

              <input
                type="number"
                name="mobile"
                placeholder="Mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                className='bg-[#FDEEE7] w-full max-w-xs rounded text-black outline-none p-2'
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className='bg-[#FDEEE7] w-full max-w-xs rounded text-black outline-none p-2'
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleChange}
                className='bg-[#FDEEE7] w-full max-w-xs rounded text-black outline-none p-2'
              />

              <button
                type="submit"
                className='cursor-pointer bg-white font-semibold w-full max-w-xs rounded text-black hover:bg-[#fd5304] hover:text-white transition-all duration-500 ease-in-out p-2 mt-2 shadow-md'
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