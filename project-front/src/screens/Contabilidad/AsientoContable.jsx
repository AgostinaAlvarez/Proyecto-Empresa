/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { MdTableView } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useSearchParams } from 'react-router-dom';
import NuevoAsiento from './Asientos/NuevoAsiento';

const AsientoContable = () => {
  function nuevoAsieto (){
    console.log('nuevo')
    setOpenModal(true)
  }

  const [ openModal,setOpenModal ] = useState(false)
  return (
    <>
      <HeaderSection
        name='Asientos Contables'
        IconS={<MdTableView style={{fontSize:28}}/>}
        actionName={'Nuevo Asiento'}
        action={nuevoAsieto}
      />
      <table className='tableFactura'>
        <thead>
          <tr>
            <th style={{width:"130px"}}>Contabilizado</th>
            <th>Nmro.</th>
            <th>Fecha</th>
            <th>Concepto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr className='tr-list'>
            <td></td>
            <td>A0001</td>
            <td>10-25-2023</td>
            <td>Asiento de apertura</td>
            <td>
              <div style={{display:"flex",fontSize:16,gap:5,alignItems:"center",boxSizing:"border-box",padding:"0px 10px"}}>
                <MdOutlineRemoveRedEye/>
              </div>
            </td>

          </tr>
        </tbody>
      </table>
      {
        openModal === true ?
        <div className='overlay'>
          <div style={{width:"90%"}} className='overlayCard'>
            <NuevoAsiento setOpenModal={setOpenModal}/>
          </div>
        </div>
        :
        <></>
      }
    </>
  )
}

export default AsientoContable