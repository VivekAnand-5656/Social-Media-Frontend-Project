import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import { CgCloseO } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const { token, login, logout, islogin, setIslogin, isshowlogin, setIsshowlogin } = useContext(AuthContext)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    const apibase = "https://socialmediaproject-6sl8.onrender.com"
    const loginUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${apibase}/public/login`, formData)
            console.log(`Token:- ${response.data["token"]}`)
            const datas = response.data
            login(datas.token)
            setFormData({
                email: "",
                password: ""
            })

        } catch (error) {
            console.log(`Error:- ${error}`);
        }
    }
    return (
        <>
            <div className=' w-100 h-100 fixed z-50 top-25 left-100 bg-[#ffffff] rounded-2xl p-2 flex flex-col   '  >
                <CgCloseO
                    onClick={() => setIsshowlogin(false)}
                    className=' fixed left-192 text-3xl ' />
                <form
                    onSubmit={loginUser}
                    className='w-full h-full flex flex-col justify-center items-center ' >
                    <h1>Login User</h1>
                    <input type="email" name='email' placeholder='Enter email' required
                        value={formData.email}
                        onChange={handleChange}
                        className=' border p-0.5 rounded '
                    />
                    <input type="password" name="password" placeholder='Enter Password' required
                        value={formData.password}
                        onChange={handleChange}
                        className=' border p-0.5 rounded '
                    />
                    <button type='submit'
                        className=' border p-0.5 rounded cursor-pointer '
                    >Login</button>
                </form>
                <p>if don't have account ? <span className=' cursor-pointer ' onClick={() => (
                    navigate("/signup"),
                    setIsshowlogin(false)

                )} >Create account</span></p>
            </div>
        </>

    )
}

export default Login