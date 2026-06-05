import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <div className=' flex lg:flex-row flex-col ' >
                <header><Navbar /></header>
                <main><Outlet /></main>
            </div>
        </>
    )
}

export default Layout