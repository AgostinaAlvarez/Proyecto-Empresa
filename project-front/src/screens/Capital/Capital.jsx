/* eslint-disable no-unused-vars */
import React from 'react'
import HeaderSection from '../../components/HeaderSection'
import { TbPigMoney } from "react-icons/tb";

const Capital = () => {
  return (
    <>
      <HeaderSection
        name='Capital'
        IconS={<TbPigMoney style={{fontSize:28}}/>}
        //actionName={'Nuevo Presupuestos'}
        //action={newPresupuesto}
      />
    </>
  )
}

export default Capital