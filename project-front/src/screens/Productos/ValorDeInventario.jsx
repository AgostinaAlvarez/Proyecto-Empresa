/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { IoSettingsOutline } from "react-icons/io5";
import { AppContext } from '../../context/AppContext';

const ValorDeInventario = () => {
  const { productos } = useContext(AppContext);
  useEffect(() => {
    console.log(productos)
  }, [])
  
  return (
    <>
      <HeaderSection
      name={'Valor de Inventario'}
      IconS={<IoSettingsOutline style={{fontSize:25}}/>    }
      actionName={''}
      //action={nuevoRemito}
      />
      <div className='section'>
        <h2>Total $</h2>
      </div>
      <table className='tableFactura'>
        <thead>
          <tr>
            <th>Item</th>
            <th>Id</th>
            <th>Stock</th>
            <th>Unidad de Medida</th>
            <th>Costo</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {
            productos.length === 0 ?
            <></>
            :
            <>
              {
                productos.map((item,index)=>
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.id}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.unidadDeMedida}</td>
                  <td>{item.costoInicial}</td>
                  <td>${parseFloat((item.cantidad * item.costoInicial).toFixed(2))}</td>
                </tr>
                )
              }
            </>
          }
        </tbody>
      </table>
    </>
  )
}

export default ValorDeInventario