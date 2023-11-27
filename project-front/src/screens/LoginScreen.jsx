/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Logo from '../assets/LogoLgn.png'
const LoginScreen = () => {
  const { setLogged,getDatos } = useContext(AppContext);

  const [userData,setUserData] = useState({email:"",password:""})

  function handleChangeEmail (e){
    setUserData({
      ...userData,email:e.target.value
    })
  }

  function handleChangePassword (e){
    setUserData({
      ...userData,password:e.target.value
    })
  }

  /*Hay que mejorar esto */

  function handleSubmit (e){
    e.preventDefault()
    if(userData.email === "a" && userData.password === "1" ){
      getDatos()    
    }
  }

  return (
    <>
      <main className='loginBg'>
        <div className='loginCont cardShadow'>
          <img src={Logo}/>
          <h1>Iniciar sesion</h1>
          <form onSubmit={handleSubmit} className='loginForm'>
            <div style={{display:"flex",flexDirection:"column",gap:5,width:"100%"}}>
              <label>Email</label>
              <input style={{padding:"5px"}} type='text' value={userData.email} onChange={handleChangeEmail}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:5,width:"100%"}}>
              <label>Contraseña</label>
              <input style={{padding:"5px"}} type='password' value={userData.password} onChange={handleChangePassword}/>
            </div>
            <button type='submit' className='loginBtn'>Ingresar</button>
          </form>
        </div>
      </main>
    </>
  )
}

export default LoginScreen