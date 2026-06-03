 

import axios from 'axios'
import React, { useContext, useState } from 'react'
import blankuser from '../assets/blankuser.png'
import { AuthContext } from '../Context/AuthContext'

const UpdateProfile = () => {
    const {token} = useContext(AuthContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "", 
    username: ""
  })
  const [file,setFile] = useState(null)

  const apibase = "https://socialmediaproject-6sl8.onrender.com"

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    console.log("Updating api");
    
      
    try {
        const formdata = new FormData();
        formdata.append("name",formData.name)
        formdata.append("email",formData.email)
        formdata.append("mobile",formData.mobile)
        formdata.append("username",formData.username)
        if(file){
            formdata.append("file",file)
        }
      const response = await axios.put(
        `${apibase}/user/updateprofile`,
        formdata,
        {
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        }
      )

      console.log("Response:", response.data)

      alert(`Account Updated Successfully: ${response.data.message}`)

      setFormData({
        name: "",
        email: "",
        mobile: "", 
        username: ""
      })
      setFile(null)

    } catch (error) {
      console.log("Error:", error)

      alert(
        error?.response?.data?.detail ||
        "Something went wrong"
      )
    }
  }

  return (
    <div className='w-[80vw] h-screen flex flex-col justify-center items-center'>
        <h1>Update Profile</h1>
      <form
        onSubmit={handleUpdate}
        className='w-[30%] flex flex-col gap-3'
      >
        <input type="file" name="file" 
        accept=".jpg, .jpeg, .png"
        onChange={(e)=>setFile(e.target.files[0])}
        className='border p-2' />
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
          Update Account
        </button>
      </form>
    </div>
  )
}

export default UpdateProfile