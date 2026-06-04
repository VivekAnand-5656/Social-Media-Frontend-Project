import { useState } from 'react'  
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Pages/Layout';
import Home from './Pages/Home';
import Reels from './Users/Reels'; 
import { AuthProvider } from './Context/AuthContext';
import Signup from './Auths/Signup';
import Profile from './Users/Profile';
import CreatePost from './Users/CreatePost';
import SavedPosts from './Users/SavedPosts';
import UpdateProfile from './Users/UpdateProfile';
import Followers from './Users/Followers';
import Followings from './Users/Followings';
import CreateReel from './Users/CreateReel';
import UserProfile from './Users/UserProfile';
 


function App() {
  const [count, setCount] = useState(0)

  return (
    <> 
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path='/reels' element={<Reels/>} /> 
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/createpost' element={<CreatePost/>} />
          <Route path='/savedpost' element={<SavedPosts/>} />
          <Route path='/updateprofile' element={<UpdateProfile/>}/>
          <Route path='/followers' element={<Followers/>}/>
          <Route path='/followings' element={<Followings/>}/>
          <Route path='/createreel' element={<CreateReel/>}/>
          <Route path='/userprofile' element={<UserProfile/>}/>
                              
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    <ToastContainer/>

    </>
  )
}

export default App
