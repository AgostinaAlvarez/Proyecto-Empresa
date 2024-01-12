/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const SubMenuProfile = () => {
  
  const { setLogged,setOpenSubMenu } = useContext(AppContext);
  const navigate = useNavigate()

  const [cookies, setCookie, removeCookie] = useCookies(['tkn']);

  async function logOut(){
    removeCookie('tkn', { path: '/' });
    setLogged(false)
    navigate('/login')
  }

  function goToProfile(){
    setOpenSubMenu(false)
    navigate('/profile')
  }

  return (
    <div className='sub_menu_profile'>
      <div onClick={()=>{goToProfile()}} style={{border:"1px solid black",boxSizing:"border-box",cursor:"pointer"}}>Ir al perfil</div>
      <div onClick={()=>{logOut()}} style={{border:"1px solid black",boxSizing:"border-box",cursor:"pointer"}}>Salir</div>
    </div>
  )
}

export default SubMenuProfile