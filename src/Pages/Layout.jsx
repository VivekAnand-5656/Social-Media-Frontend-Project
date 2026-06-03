import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <div className=' flex ' >
                <header><Navbar /></header>
                <main><Outlet /></main>
            </div>
        </>
    )
}

export default Layout