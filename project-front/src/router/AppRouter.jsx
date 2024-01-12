/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import PrivateStructure from './PrivateStrucure'
import PublicRoutes from './PublicRoutes'

const AppRouter = () => {
  const { logged } = useContext(AppContext);
  return (
    <>{ logged === true ? <PrivateStructure/> : <PublicRoutes/>}</>
  )
}

export default AppRouter