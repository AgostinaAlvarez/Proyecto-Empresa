/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { BsFillInboxesFill } from "react-icons/bs";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LuEye } from "react-icons/lu";


const FacturaDeVentaDetalle = () => {
  
  const [ loading,setLoading ] = useState(true)
  const [ err,setErr ] = useState(false)

  const [ detail,setDeail ] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {    
    console.log(params.id)
    detalle()
  }, [])
  
  

  async function detalle(){
    try{
      const response = await axios.get(`http://localhost:3000/api/detalleFactura/${params.id}`)
      //console.log(response.data)
      if(response.data.factura.length === 0){
        setErr(true)
      }else{
        setDeail({
          detalleFactura: response.data.factura[0],
          productos: response.data.productos,
          cliente: response.data.cliente[0],
          remito: response.data.remitos[0]
        })
        console.log({
          detalleFactura: response.data.factura[0],
          productos: response.data.productos,
          cliente: response.data.cliente[0],
          remito: response.data.remitos[0]
        })
        setErr(false)
      }
    }catch(err){
      setErr(true)
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
    {
      loading === true ?
      <div>Cargando</div>
      :
      <>
      {
        err === true ?
        <div>Error</div>
        :
        <>
          <HeaderSection
            name={'Deatlle Facura'}
            IconS={<BsFillInboxesFill style={{fontSize:30}}/>}
          />
          {/*Detalles del cliente*/}
          <div style={{display:"flex",flexDirection:"column"}}>
            <h3>Datos del cliente</h3>
            <span>Nombre: {detail.cliente.nombre}</span>
            <span>{detail.cliente.idType}: {detail.cliente.id}</span>  
            <span>Mail: {detail.cliente.correo}</span>
            <span>Domicilio: {detail.cliente.domicilio}</span>
          </div>
          {/*Detalle de factura */}
          <div style={{display:"flex",flexDirection:"column"}}>
            <h3>Factura</h3>
            <span>Factura {detail.detalleFactura.tipo} Nro.{detail.detalleFactura.nmro}</span>
            <span>Estado {detail.detalleFactura.estado}</span>
            <span>Concepto: {detail.detalleFactura.concepto}</span>
            <span>Condicion {detail.detalleFactura.condicion}</span>
            <span>Plazo de pago: {detail.detalleFactura.plazoDePago} dias</span>
            <span>Creacion: {detail.detalleFactura.fecha.slice(0, 10)}</span>
            <span>Vencimiento: {detail.detalleFactura.vencimiento.slice(0, 10)}</span>
          </div>
          {/*Productos Facturados*/}
          <div style={{display:"flex",flexDirection:"column"}}>
            <h3>Detalle</h3>
            <table>
              <thead>
                <tr>
                  <th>Acciones</th>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>P. Unitario</th>
                  <th>% Bonif</th>
                  <th>IVA</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {
                  detail.productos.map((producto,index)=>
                  <tr key={index}>
                    <td>
                      <button onClick={()=>{navigate('')}}>Ver producto</button>
                    </td>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.cantidad}</td>
                    <td>$ {producto.precio}</td>
                    <td>{producto.bonificacion}</td>
                    <td>{producto.impuesto} %</td>
                    <td></td>
                  </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          
        </>

      }
      </>
    }
    </>
  )
}

export default FacturaDeVentaDetalle