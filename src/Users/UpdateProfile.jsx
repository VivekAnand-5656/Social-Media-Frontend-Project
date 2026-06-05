import axios from 'axios'
import React, { useContext, useState } from 'react'
import blankuser from '../assets/blankuser.png'
import { AuthContext } from '../Context/AuthContext'
import { SquareLoader } from 'react-spinners'
import { toast,Slide } from 'react-toastify'

const UpdateProfile = () => {
  const { token } = useContext(AuthContext)
  const [loading, setLoading] = useState()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    username: ""
  })
  const [file, setFile] = useState(null)

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
      setLoading(true)
      const formdata = new FormData();
      formdata.append("name", formData.name)
      formdata.append("email", formData.email)
      formdata.append("mobile", formData.mobile)
      formdata.append("username", formData.username)
      if (file) {
        formdata.append("file", file)
      }
      const response = await axios.put(
        `${apibase}/user/updateprofile`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          }
        }
      )
       toast.success(`Profile Update Successfully`, {
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
        username: ""
      })
      setFile(null)

    } catch (error) {
      console.log("Error:", error)

      alert(
        error?.response?.data?.detail ||
        "Something went wrong"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-[85vw] p-2 bg-[#ffffff] flex items-center justify-center ">
      <div
        className="w-[40%]  rounded-3xl  bg-[#FDEEE7]/90 backdrop-blur-md p-8 shadow-[0_0_40px_#FDEEE7]">
        <h2 className="mb-1.5  text-center text-2xl font-bold text-black">
          Update Profile
        </h2>
        <form
          onSubmit={handleUpdate}
          className=' flex flex-col gap-3'
        >
          <input type="file" name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full cursor-pointer rounded-xl border border-dashed border-orange-500/50 bg-[#FDEEE7] p-2 text-white-300 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-600 file:px-2 file:py-2 file:text-white file:cursor-pointer hover:file:bg-orange-700"
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full resize-none rounded-2xl border border-orange-500/40 bg-[#FDEEE7] p-2 text-black outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full resize-none rounded-2xl border border-orange-500/40 bg-[#FDEEE7] p-2 text-black outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40"
          />

          <input
            type="number"
            name="mobile"
            placeholder="Mobile"
            required
            value={formData.mobile}
            onChange={handleChange}
            className="w-full resize-none rounded-2xl border border-orange-500/40 bg-[#FDEEE7] p-2 text-black outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40"
          />



          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full resize-none rounded-2xl border border-orange-500/40 bg-[#FDEEE7] p-2 text-black outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/40"
          />

          <button
            type="submit"
            className="mt-1 cursor-pointer rounded-2xl bg-[#ffffff] py-2 text-lg font-semibold text-black shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-orange-700 hover:to-orange-600 hover:shadow-blue-500/40"
          >
            Update Account
          </button>
        </form>

        {
          loading ? (
            <div
              className="w-full fixed top-0 right-0 text-white flex justify-center items-center h-screen  max-w-xl rounded-3xl border border-blue-400/30 bg-[#0D121A]/90 backdrop-blur-md p-8 shadow-[0_0_40px_rgba(59,130,246,0.25)]">
              <SquareLoader
                loading={true}
                color="#ffffff"
                speedMultiplier={1}
              />
            </div>

          ) : (
            <div
              className=" hidden fixed w-full max-w-xl rounded-3xl border border-blue-400/30 bg-[#0D121A]/90 backdrop-blur-md p-8 shadow-[0_0_40px_rgba(59,130,246,0.25)]">

            </div>
          )
        }
      </div>
    </div>
  )
}

export default UpdateProfile