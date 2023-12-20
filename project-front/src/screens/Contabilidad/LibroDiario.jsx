/* eslint-disable no-unused-vars */
import React from 'react'
import HeaderSection from '../../components/HeaderSection'
import { MdTableView } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const LibroDiario = () => {
  const arr = [1,2,3,1,2,3,1,1,1,1,1,1,1]
  const navigate = useNavigate()
  function nuevoLibroDiario (){
    navigate('/libro-diario/nuevo')
  }
  return (
    <>
      <HeaderSection
        name='Libro Diario'
        IconS={<MdTableView style={{fontSize:28}}/>}
        actionName={'Nuevo Libro Diario'}
        action={nuevoLibroDiario}
      />
      <div>
        Filtrar
      </div>
      <table className='tableFactura' style={{marginBottom:30}}>
        <thead>
          <tr>
            <th>Nmro.</th>
            <th>Ref.</th>
            <th>Fecha inicial</th>
            <th>Fecha final</th>
          </tr>
        </thead>
      </table>
    </>
  )
}

export default LibroDiario