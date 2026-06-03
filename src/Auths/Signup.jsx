import axios from 'axios'
import React, { useState } from 'react'

const Signup = () => {
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
      const response = await axios.post(
        `${apibase}/public/createUser`,
        payload
      )

      console.log("Response:", response.data)

      alert(`Account Created Successfully: ${response.data.message}`)

      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        username: ""
      })

    } catch (error) {
      console.log("Error:", error)

      alert(
        error?.response?.data?.detail ||
        "Something went wrong"
      )
    }
  }

  return (
    <div className='w-[80vw] h-screen flex justify-center items-center'>
      <form
        onSubmit={handleSignup}
        className='w-[30%] flex flex-col gap-3'
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
          className='border p-2'
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className='border p-2'
        />

        <input
          type="number"
          name="mobile"
          placeholder="Mobile"
          required
          value={formData.mobile}
          onChange={handleChange}
          className='border p-2'
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          className='border p-2'
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={formData.username}
          onChange={handleChange}
          className='border p-2'
        />

        <button
          type="submit"
          className='cursor-pointer bg-[#069b0b] text-white p-2 rounded'
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default Signup