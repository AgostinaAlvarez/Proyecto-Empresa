/* eslint-disable no-unused-vars */
import React from 'react'
import HeaderSection from '../components/HeaderSection'
import { MdOutlineFileCopy } from "react-icons/md";

const NotasDeDebito = () => {
  return (
    <>
      <HeaderSection
        name={'Notas de Debito'}
        IconS={<MdOutlineFileCopy style={{fontSize:30}}/>}
        //actionName={'Nueva Factura'}
        //action={nuevaFactura}
      />
    </>
  )
}

export default NotasDeDebito