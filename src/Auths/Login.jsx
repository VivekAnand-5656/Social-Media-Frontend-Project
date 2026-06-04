import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import { CgCloseO } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';


const Login = () => {
    const { token, login, logout, islogin, setIslogin, isshowlogin, setIsshowlogin } = useContext(AuthContext)
    const [loading, setLoading] = useState()
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
            setLoading(true)
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
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            {
                loading ? (
                    <div className=' w-100 h-100 fixed z-50 top-25 left-100 bg-[#0D121A] border-[#ffffff] border text-white rounded-2xl p-2 flex flex-col  items-center  '  >
                        <CgCloseO
                            onClick={() => setIsshowlogin(false)}
                            className=' self-end-safe left-192 text-3xl cursor-pointer ' />
                        <div className=' w-full mt-35  flex justify-center items-cente  ' >
                            
                            <HashLoader 
                            loading={true}
                            color='#ffffff'
                            speedMultiplier={1}
                            />
                        </div>
                    </div>
                ) : (
                    <div className=' w-100 h-100 fixed z-50 top-25 left-100 bg-[#0D121A] border-[#ffffff] border text-white rounded-2xl p-2 flex flex-col  items-center  '  >
                        <CgCloseO
                            onClick={() => setIsshowlogin(false)}
                            className=' self-end-safe left-192 text-3xl cursor-pointer ' />
                        <form
                            onSubmit={loginUser}
                            className='w-[60%] h-[60%] flex flex-col justify-center items-center gap-4 ' >
                            <h1 className=' text-2xl font-bold uppercase ' >Login</h1>
                            <input type="email" name='email' placeholder='Enter email' required
                                value={formData.email}
                                onChange={handleChange}
                                className=' bg-[#383963] w-full  rounded text-white  outline-0 p-1.5 '
                            />
                            <input type="password" name="password" placeholder='Enter Password' required
                                value={formData.password}
                                onChange={handleChange}
                                className=' bg-[#383963]  rounded text-white w-full outline-0 p-1.5 '
                            />
                            <button type='submit'
                                className=' cursor-pointer bg-[#0004ff] font-semibold  w-[50%]  rounded text-white   p-1.5 '
                            >Login</button>
                        </form>

                        <p>if don't have account ? <span className=' cursor-pointer text-[#040cff] ' onClick={() => (
                            navigate("/signup"),
                            setIsshowlogin(false)

                        )} >Create account</span></p>
                        <div className=' w-[60%] text-[#040cff] text-center cursor-pointer  ' >
                            <p>Forgot Passowrd</p>
                        </div>

                    </div>
                )
            }
        </>

    )
}

export default Login