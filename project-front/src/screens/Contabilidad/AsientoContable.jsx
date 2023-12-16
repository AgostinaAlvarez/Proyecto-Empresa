/* eslint-disable no-unused-vars */
import React from 'react'
import HeaderSection from '../../components/HeaderSection'
import { MdTableView } from "react-icons/md";

const AsientoContable = () => {
  return (
    <>
      <HeaderSection
        name='Contabilidad'
        IconS={<MdTableView style={{fontSize:28}}/>}
        //actionName={'Nuevo Presupuestos'}
        //action={newPresupuesto}
      />
    </>
  )
}

export default AsientoContable