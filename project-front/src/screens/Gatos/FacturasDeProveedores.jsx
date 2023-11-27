/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { BsFillInboxesFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import PagoFactura from './PagoFactura';
import { FiPrinter } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const FacturasDeProveedores = () => {
  const { facturasDeProveedores,setFacturasDeProveedores } = useContext(AppContext);
 
  const navigate = useNavigate()
  
  function nuevaFactura (){
    navigate('/facturasDeProveedores/nueva')
  }

  const [ open,setOpen ] = useState(false);
  const [ selectedFactura,setSelectedFactura ] = useState(null);
  
  return (
    <>
      <HeaderSection
        name={'Facturas de Proveedores'}
        IconS={<BsFillInboxesFill style={{fontSize:30}}/>}
        actionName={'Nueva Factura de Proveedor'}
        action={nuevaFactura}
      />
      <table className='tableFactura' style={{marginBottom:30}}>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Numero</th>
            <th>Proveedor</th>
            <th>Creacion</th>
            <th>Vencimiento</th>
            <th>Total</th>
            <th>Pagado</th>
            <th>Por Pagar</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            facturasDeProveedores.length === 0 ?
            <></>
            :
            <>
              {
                
                facturasDeProveedores.map((item,index)=>
                  <tr className='tr-list' key={index}>
                    <td>{item.tipo}</td>
                    <td>001 - 000{item.nmro}</td>
                    <td>{item.nombre}</td>
                    <td>{item.fecha.slice(0, 10)}</td>
                    <td>{item.vencimiento.slice(0, 10)}</td>
                    <td className='tableFontBold'>${item.total.toFixed(2)}</td>
                    <td>${item.montoPagado.toFixed(2)}</td>
                    <td>${item.montoPendiente.toFixed(2)}</td>
                    <td style={item.estado === "Pendiente" ? {color:"#FF6C22",fontWeight:500} : {color:"green",fontWeight:500}}>{item.estado}</td>
                    <td>
                    <div style={{display:"flex",flexDirection:"row",gap:10}}>
                      <MdOutlineRemoveRedEye/>
                      <FiPrinter/>
                      {
                        item.estado === "Pendiente" ?
                        <button onClick={()=>{
                          setSelectedFactura(item)
                          console.log(item)  
                          setOpen(true)
                        }}>Registrar Pago</button>
                        :
                        <></>
                      }
                    </div>
                      
                    </td>
                  </tr>
                )
                
              }
            </>
          }
        </tbody>
      </table>
      {
        open === true ?
        <PagoFactura
          setOpen={setOpen}
          selectedFactura={selectedFactura}
        />
        :
        <></>
      }
    </>
  )
}

export default FacturasDeProveedores