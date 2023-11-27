/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import LoginScreen from '../screens/LoginScreen'
import { AppContext } from '../context/AppContext'
import HomeScreen from '../screens/HomeScreen'

const AppRouter = () => {
  const { logged } = useContext(AppContext);
  return (
    <>
      {
        logged === true ?
        <HomeScreen/>
        :
        <Routes>
            <Route path='/login' element={<LoginScreen/>}/>
            <Route path='/*' element={<Navigate to='/login'/>}/>
        </Routes>
        
      }
    </>
  )
}

export default AppRouter