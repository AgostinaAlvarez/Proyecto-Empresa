/* eslint-disable no-unused-vars */
import React from 'react'
import HeaderSection from '../components/HeaderSection'
import { MdOutlineFileCopy } from "react-icons/md";

const NotasDeCredito = () => {
  return (
    <>
      <HeaderSection
        name={'Notas de Credito'}
        IconS={<MdOutlineFileCopy style={{fontSize:30}}/>}
        //actionName={'Nueva Factura'}
        //action={nuevaFactura}
      />
    </>
  )
}

export default NotasDeCredito