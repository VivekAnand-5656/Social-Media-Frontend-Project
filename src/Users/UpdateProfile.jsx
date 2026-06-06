import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import blankuser from '../assets/blankuser.png'
import { AuthContext } from '../Context/AuthContext'
import { SquareLoader } from 'react-spinners'
import { toast, Slide } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false) // Fixed: Added false as initial state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    username: ""
  })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(blankuser) // Image preview state

  const apibase = "https://socialmediaproject-6sl8.onrender.com"

  // Handle image preview generation
  useEffect(() => {
    if (!file) {
      setPreview(blankuser)
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)

    // Clean up memory when component unmounts or file changes
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

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
      toast.success(`Profile Updated Successfully`, {
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
      navigate("/profile") // Redirect back to profile on success

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
    <div className="min-h-screen w-full p-4 bg-white flex items-center justify-center">
      {/* Container Card - Fluid on mobile, fixed max-width on desktop */}
      <div className="w-full max-w-md sm:max-w-lg rounded-3xl bg-[#FDEEE7]/90 backdrop-blur-md p-5 sm:p-8 shadow-xl border border-orange-100">
        
        <h2 className="mb-4 text-center text-xl sm:text-2xl font-bold text-black">
          Update Profile
        </h2>

        <form onSubmit={handleUpdate} className='flex flex-col gap-4' >
          
          {/* Avatar Preview Box */}
          <div className="flex flex-col items-center justify-center gap-2 mb-2">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-500/30 shadow-md bg-white">
              <img src={preview} alt="Avatar Preview" className="w-full h-full object-cover" />
            </div>
            <label className="text-xs font-semibold text-orange-700 cursor-pointer hover:underline">
              Profile Picture Preview
            </label>
          </div>

          {/* File Input */}
          <input 
            type="file" 
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-xs sm:text-sm cursor-pointer rounded-xl border border-dashed border-orange-500/50 bg-white p-2 text-gray-700 file:mr-3 file:rounded-lg file:border-0 file:bg-orange-600 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white file:cursor-pointer hover:file:bg-orange-700 transition"
          />

          {/* Full Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full text-sm sm:text-base rounded-2xl border border-orange-500/40 bg-white p-3 text-black outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          {/* Email */}
          <input
            type="text" // Kept as text to match layout but handles email values safely
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full text-sm sm:text-base rounded-2xl border border-orange-500/40 bg-white p-3 text-black outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          {/* Mobile */}
          <input
            type="number"
            name="mobile"
            placeholder="Mobile"
            required
            value={formData.mobile}
            onChange={handleChange}
            className="w-full text-sm sm:text-base rounded-2xl border border-orange-500/40 bg-white p-3 text-black outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full text-sm sm:text-base rounded-2xl border border-orange-500/40 bg-white p-3 text-black outline-none transition-all placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 cursor-pointer rounded-2xl bg-orange-600 hover:bg-orange-700 py-3 text-base sm:text-lg font-semibold text-white shadow-md transition-all active:scale-[0.98]"
          >
            Update Account
          </button>
        </form>

        {/* Cleaned-up Fixed Loading Modal */}
        {loading && (
          <div className="fixed inset-0 text-white flex justify-center items-center bg-black/60 backdrop-blur-xs z-50 animate-fade-in">
            <div className="bg-slate-900/90 p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-4 shadow-2xl">
              <SquareLoader
                loading={true}
                color="#ea580c" // Matches your orange theme
                speedMultiplier={1}
                size={50}
              />
              <p className="text-sm font-medium tracking-wide text-gray-300">Uploading Profile Assets...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UpdateProfile