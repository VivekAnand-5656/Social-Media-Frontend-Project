import React from 'react'
import RightBar from '../Pages/RightBar'

const Reels = () => {
  return (
    <>
      <div className=' sm:w-[85vw] sm:h-screen border-2 flex ' >
        {/* ===== Center ======== */}
        <div className="center w-[75%] border-r-2 h-full ">
          <div>Reels</div>
        </div>
        {/* ======= Right ======== */}
        <div className="right w-[25%] border-2 h-full ">
           <RightBar/>
        </div>
      </div>
    </>
  )
}

export default Reels