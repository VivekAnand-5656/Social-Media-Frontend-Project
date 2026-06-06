import React, { useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import { CgCloseO } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import { toast, Slide, Bounce } from 'react-toastify';

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
            const datas = response.data
            login(datas.token)
            toast.success('☑️ Login Successfully', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Slide,
                  });
            setFormData({
                email: "",
                password: ""
            })
            navigate("/")

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
                    /* Standard Centered Tailwind Modal Box */
                    <div className='fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[400px] h-[420px] bg-[#F27734] border-[#ffffff] border text-white rounded-2xl p-4 flex flex-col items-center justify-center' >
                        <CgCloseO
                            onClick={() => setIsshowlogin(false)}
                            className='absolute top-4 right-4 text-3xl cursor-pointer' />
                        <div className='w-full flex justify-center items-center' >
                            <HashLoader 
                            loading={true}
                            color='#ffffff'
                            speedMultiplier={1}
                            />
                        </div>
                    </div>
                ) : (
                    /* Standard Centered Tailwind Modal Box */
                    <div className='fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[400px] h-[420px] bg-[#F27734] text-white rounded-2xl p-4 flex flex-col items-center justify-between pb-6' >
                        <CgCloseO
                            onClick={() => setIsshowlogin(false)}
                            className='absolute top-4 right-4 text-3xl cursor-pointer' />
                        <form
                            onSubmit={loginUser}
                            className='w-[85%] flex flex-col justify-center items-center gap-4 mt-10' >
                            <h1 className='text-2xl font-bold uppercase' >Login</h1>
                            <input type="email" name='email' placeholder='Enter email' required
                                value={formData.email}
                                onChange={handleChange}
                                className='bg-[#FDEEE7] w-full rounded text-black outline-none p-1.5'
                            />
                            <input type="password" name="password" placeholder='Enter Password' required
                                value={formData.password}
                                onChange={handleChange}
                                className='bg-[#FDEEE7] rounded text-black w-full outline-none p-1.5'
                            />
                            <button type='submit'
                                className='cursor-pointer bg-[#fd5304] border border-[#FDEEE7] font-semibold w-[50%] rounded text-white p-1.5'
                            >Login</button>
                        </form>

                        <div className='flex flex-col items-center gap-2 text-center w-full text-sm'>
                            <p>if don't have account ? <span className='cursor-pointer text-[#000000] font-semibold' onClick={() => (
                                navigate("/signup"),
                                setIsshowlogin(false)
                            )} >Create account</span></p>
                            <div className='w-[60%] text-[#000000] text-center cursor-pointer' >
                                <p>Forgot Passowrd</p>
                            </div>
                        </div>

                    </div>
                )
            }
        </>
    )
}

export default Login