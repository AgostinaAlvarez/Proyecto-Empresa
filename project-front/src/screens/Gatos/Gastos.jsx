/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { MdOutlineArrowOutward } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';


const Gastos = () => {
  const navigate = useNavigate()
  const { pagos } = useContext(AppContext);

  function nuevoPago (){
    navigate('/pagos/nuevo')
  }

  useEffect(() => {
    console.log('estos son los pagos')
    console.log(pagos)
  }, [])
  
  return (
    <>
      <HeaderSection
        name={'Pagos'}
        IconS={<MdOutlineArrowOutward style={{fontSize:30}}/>}
        actionName={'Nuevo Pago'}
        action={nuevoPago}
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
                
                pagos.map((item,index)=>
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

export default Gastos