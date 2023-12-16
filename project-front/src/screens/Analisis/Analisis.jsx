/* eslint-disable no-unused-vars */
import React from 'react'
import HeaderSection from '../../components/HeaderSection'
import { BsGraphUp } from "react-icons/bs";


const Analisis = () => {
  return (
    <>
      <HeaderSection
        name='Analisis'
        IconS={<BsGraphUp style={{fontSize:28}}/>}
        //actionName={'Nuevo Presupuestos'}
        //action={newPresupuesto}
      />
    </>
  )
}

export default Analisis