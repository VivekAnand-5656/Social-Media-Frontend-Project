import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'

const Followers = () => {
    const { token, userdata } = useContext(AuthContext)
    const [myfollowers, setMyfollowers] = useState([])




    const apibase = "https://socialmediaproject-6sl8.onrender.com"
    const fetchFollowers = async () => {
        try {
            const response = await axios.get(`${apibase}/user/myfollowers`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Data:- ", response.data);
            setMyfollowers(response.data)

        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }
    useEffect(() => {
        if (token) {
            fetchFollowers()
        }
    }, [token])

    return (
        <div className=' w-full flex flex-col gap-3 p-1.5 ' >
            {
                myfollowers?.length > 0 ? (
                    myfollowers.map((user) => (
                        <div key={user._id}>
                            <p>{user.name}</p>
                        </div>
                    ))
                ) : (
                    <p>No followers found</p>
                )
            }
        </div>
    )
}
export default Followers