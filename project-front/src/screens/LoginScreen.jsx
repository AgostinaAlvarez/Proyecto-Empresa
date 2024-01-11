/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Logo from '../assets/LogoLgn.png'
import axios from 'axios';
import { serverURL } from '../../protectedRoutes';
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

  function handleSubmit (e){
    e.preventDefault()
    userData.email.trim() !== '' && userData.password.trim() !== '' ? loginApp() : alert('debes rellenar todos los campos') 
  }

  async function loginApp (){
    try{
      const response = await axios.post(`${serverURL}/api/login`,userData,{ withCredentials: true })
      if(response.data.ok === true){
        setLogged(true)
        const expires = new Date();
        expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000);
        document.cookie = `tkn=${response.tkn};expires=${expires.toUTCString()};path=/`;
      }else{
        alert('Datos de usuario incorrectos')
      }
    }catch(err){
      alert('Error del servidor')
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