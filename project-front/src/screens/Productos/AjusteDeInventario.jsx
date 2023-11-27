/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { IoSettingsOutline } from "react-icons/io5";
import { AppContext } from '../../context/AppContext';
import NuevoAjusteDeInventario from './NuevoAjusteDeInventario';


const AjusteDeInventario = () => {
  const { ajustesDeInventario } = useContext(AppContext);
  const [ overlay,setOverlay ] = useState(false)

  useEffect(() => {
    console.log(ajustesDeInventario)
  }, [])
  
  function nuevoAjuste (){
    setOverlay(true)
  }

  return (
    <>
      <HeaderSection
        name={'Ajuste de Inventario'}
        IconS={<IoSettingsOutline style={{fontSize:25}}/>}
        actionName={'Nuevo Ajuste'}
        action={nuevoAjuste}
      />
      <div>
        Ajustes realizados
      </div>
      <table className='tableFactura'>
        <thead>
          <tr>
            <th style={{width:100}}>Fecha</th>
            <th>Hora</th>
            <th style={{width:130}}>Tipo</th>
            <th style={{width:350}}>Id de Producto</th>
            <th>Nombre</th>
            <th>Cantidad Ajustada</th>
            <th>Precio Base</th>
            <th>Impuesto</th>
            <th>Precio Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            ajustesDeInventario.length === 0 ?
            <></>
            :
            <>
              {
                ajustesDeInventario.map((item,index)=>
                  <tr className='tr-list' key={index}>
                    <td style={{width:100}}>{item.fecha.slice(0, 10)}</td>
                    <td>{item.hora}</td>
                    <td style={{width:130,textAlign:"center"}}>{item.tipo}</td>
                    <td style={{width:350}}>{item.idProducto}</td>
                    <td>{item.nombre}</td>
                    <td>{item.cantidadAjustada}</td>
                    <td>${item.precioBase}</td>
                    <td>{item.impuesto}%</td>
                    <td>${item.precioTotal.toFixed(2)}</td>
                    <td><button>Ver</button></td>
                  </tr>
                )
              }
            </>
          }
        </tbody>
      </table>
      {
        overlay === true ?
        <NuevoAjusteDeInventario
          setOverlay={setOverlay}
        />
        :
        <></>
      }
    </>
  )
}

export default AjusteDeInventario