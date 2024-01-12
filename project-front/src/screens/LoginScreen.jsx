/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Logo from '../assets/LogoLgn.png'
import axios from 'axios';
import { serverURL } from '../../protectedRoutes';
import Swal from 'sweetalert2'
import Loading from '../components/Loading';


const LoginScreen = () => {
  const { setLogged } = useContext(AppContext);
  const [ loading,setLoading ] = useState(false)
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
    userData.email.trim() !== '' && userData.password.trim() !== '' ? loginApp() : Swal.fire({
      title: "Error!",
      text: "Debes rellenar todos los campos y no dejar espacios vacios",
      icon: "error"
    })
  }

  async function loginApp (){
    setLoading(true)
    try{
      const response = await axios.post(`${serverURL}/api/login`,userData,{ withCredentials: true })
      console.log(response)
      document.cookie =  `tkn=${response.data.token};path=/`
      setLogged(true)
    }catch(err){
      console.log(err)
      console.log(err.response.data)
      Swal.fire({
        title: "Error!",
        text: err.response.data.message,
        icon: "error"
      })
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
    {
      loading === true ?
      <Loading/>
      :
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
    }
    </>
  )
}

export default LoginScreen