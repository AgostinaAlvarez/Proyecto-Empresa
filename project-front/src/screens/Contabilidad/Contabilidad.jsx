/* eslint-disable no-unused-vars */
import React from 'react'
import HeaderSection from '../../components/HeaderSection'
import { TbAbacus } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const Contabilidad = () => {
  const navigate = useNavigate()
  return (
    <>
      <HeaderSection
        name='Contabilidad'
        IconS={<TbAbacus style={{fontSize:28}}/>}
        //actionName={'Nuevo Presupuestos'}
        //action={newPresupuesto}
      />
      <h2>Reportes contables</h2>
      <div className='contabilidadGrid'>
        <div className='contabilidadItem' onClick={()=>{navigate('/libro-diario')}}>Libro diario</div>
        <div className='contabilidadItem' onClick={()=>{navigate('/libro-mayor')}}>Libro Mayor</div>
        <div className='contabilidadItem' onClick={()=>{navigate('/balance-de-sumas-y-saldos')}}>Balance de sumas y saldos</div>
        <div className='contabilidadItem' onClick={()=>{navigate('/saldos-mensuales')}}>Saldos mensuales</div>
        <div className='contabilidadItem' >Asientos contables</div>
        <div className='contabilidadItem' >Estado de resultados</div>
      </div>
    </>
  )
}

export default Contabilidad