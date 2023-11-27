/* eslint-disable no-unused-vars */
import React from 'react'
import HeaderSection from '../../components/HeaderSection'
import { PiWarehouse } from "react-icons/pi";

const Depositos = () => {
  return (
    <>
      <HeaderSection
        name={'Depositos'}
        IconS={<PiWarehouse style={{fontSize:30}}/>}
        //actionName={'Nueva Factura'}
        //action={nuevaFactura}
      />
    </>
  )
}

export default Depositos