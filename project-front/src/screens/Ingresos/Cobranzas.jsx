/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { useNavigate } from 'react-router-dom'
import { MdAttachMoney } from "react-icons/md";
import { AppContext } from '../../context/AppContext';

const Cobranzas = () => {
  const { cobranzas } = useContext(AppContext);

  const navigate = useNavigate();
  function nuevaCobranza (){
    navigate('/cobranzas/nueva')
  }

  useEffect(() => {
    console.log(cobranzas)
  }, [])
  
  return (
    <>
        <HeaderSection
        name={'Cobranzas'}
        IconS={<MdAttachMoney style={{fontSize:30}}/>}
        actionName={'Nueva Cobranza'}
        action={nuevaCobranza}
      />
      <table className='tableFactura'>
        <thead>
          <tr>
            <th>Nmro</th>
            <th>Concepto</th>
            <th>Fecha</th>
            <th>Nmro. de Cuenta</th>
            <th>Medio de pago</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            
            cobranzas.map((item,index)=>
            <tr className='tr-list' key={index}>
              <td>{index + 1}</td>
              <td>{item.concepto}</td>
              <td>{item.fecha.slice(0,10)}</td>
              <td>({item.entidad}) {item.nmroDeCuenta}</td>
              <td>{item.metodoDePago}</td>
              <td className='tableFontBold'>${item.total.toFixed(2)}</td>
              <td><button>Ver</button></td>
            </tr>
            
            )
            
          }
        </tbody>
      </table>
    </>
  )
}

export default Cobranzas