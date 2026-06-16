import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import SignUp from "../pages/SignUp"
const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element = {<Landing/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<SignUp/>}/>
        
    </Routes>
    </>
  )
}

export default AppRoutes