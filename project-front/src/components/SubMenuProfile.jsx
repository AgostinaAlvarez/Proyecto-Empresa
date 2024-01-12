/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const SubMenuProfile = () => {
  
  const { setLogged } = useContext(AppContext);

  async function logOut(){
    
  }
  
  return (
    <div className='sub_menu_profile'>
        <div style={{border:"1px solid black",boxSizing:"border-box",cursor:"pointer"}}>Ir al perfil</div>
        <div style={{border:"1px solid black",boxSizing:"border-box",cursor:"pointer"}}>Salir</div>
    </div>
  )
}

export default SubMenuProfile