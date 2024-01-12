/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { IoLogOutOutline } from "react-icons/io5";
import SubMenuProfile from './SubMenuProfile';


const NavBar = () => {
  const [ openSubMenu,setOpenSubMenu ] = useState(false);

  return (
    <header className='header'>
      <div onClick={()=>{setOpenSubMenu(!openSubMenu)}} style={{cursor:"pointer",height:35,width:35,backgroundColor:"violet",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>I</div>
      {
        openSubMenu === true ?
        <SubMenuProfile/>
        :
        <></>
      }
    </header>
  )
}

export default NavBar