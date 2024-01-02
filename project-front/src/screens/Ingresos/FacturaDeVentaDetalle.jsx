/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { BsFillInboxesFill } from "react-icons/bs";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LuEye } from "react-icons/lu";
import { IoInformationCircleOutline } from "react-icons/io5";


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


  function imprimir (){
    navigate(`/facturas/imprimir/${params.id}`)
  }

  function totalPieFactura (){
    let subtotal = 0;
    let bonificacion = 0;
    let iva21 = 0;
    let iva27 = 0;
    let iva10 = 0;
    
    const updateData = detail.productos.map((item)=>{
      return {...item,IVAPes : ((  ( (item.cantidad * item.precio) - (((item.cantidad * item.precio)* item.bonificacion) / 100)  )* item.impuesto)/ 100)}
    })
    
    updateData.forEach((element)=>{
      subtotal = subtotal + (element.precio * element.cantidad)
      bonificacion = bonificacion + (((element.cantidad * element.precio)* element.bonificacion) / 100)
      if(element.impuesto === 21){
        iva21 = parseFloat((iva21 + element.IVAPes).toFixed(2))
      }else if(element.impuesto === 27){
        iva27 = parseFloat((iva27 + element.IVAPes).toFixed(2))
      }else if(element.impuesto === 10.5){
        iva10 = parseFloat((iva10 + element.IVAPes).toFixed(2))
      }
    })



    return(
      <div className='nuevaFactura-section' style={{flexDirection:"column",alignItems:"flex-end",marginTop:"40px"}}>
       
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
            <span style={{width:200,textAlign:"right"}}>SubTotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
            <span style={{width:200,textAlign:"right"}}>Bonificacion</span>
            <span> - ${bonificacion.toFixed(2)}</span>
          </div>
          <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
            <span style={{width:200,textAlign:"right"}}>Subtotal</span>
            <span>${(subtotal - bonificacion).toFixed(2)}</span>
          </div>
          {
            iva21 !== 0?
            <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
              <span style={{width:200,textAlign:"right"}}>IVA (21%)</span>
              <span>${iva21.toFixed(2)}</span>
            </div>
            :
            <></>
          }
          {
            iva27 !== 0?
            <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
              <span style={{width:200,textAlign:"right"}}>IVA (27%)</span>
              <span>${iva27.toFixed(2)}</span>
            </div>
            :
            <></>
          }
          {
            iva10 !== 0?
            <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
              <span style={{width:200,textAlign:"right"}}>IVA (10.5%)</span>
              <span>${iva10.toFixed(2)}</span>
            </div>
            :
            <></>
          }
          
          <div style={{width:"100%",height:"1px",backgroundColor:"black"}}></div>
          <div style={{display:"flex",gap:16,alignItems:"center",fontSize:30,justifyContent:"flex-end"}}>
            <span style={{width:100,textAlign:"center"}}>Total:</span>
            <span>${parseFloat((subtotal - bonificacion + iva21 + iva10 + iva27).toFixed(2))}</span>
          </div>
        </div>
      </div>
    )
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
            name={`Factura ${detail.detalleFactura.tipo} Nro.${detail.detalleFactura.nmro}`}
            IconS={<BsFillInboxesFill style={{fontSize:30}}/>}
            actionName={'Imprimir factura'}
            action={imprimir}
          />
          {/*Detalles del cliente*/}
          <div style={{display:"flex",flexDirection:"column"}}>
            <h3>Datos del cliente</h3>
            <span>Nombre: {detail.cliente.nombre}</span>
            <span>{detail.cliente.idType}: {detail.cliente.id}</span>  
            <span>Mail: {detail.cliente.correo}</span>
            <span>Localidad: {detail.cliente.localidad}</span>
            <span>Domicilio: {detail.cliente.domicilio}</span>

          </div>
          {/*Detalle de factura */}
          <div style={{display:"flex",flexDirection:"column"}}>
            <h3>Factura</h3>
            <span>Factura {detail.detalleFactura.tipo} Nro.{detail.detalleFactura.nmro}</span>
            <div>
              <span>Estado {detail.detalleFactura.estado}</span>
              {
                detail.detalleFactura.estado === "Pagada" ?
                <button style={{width:"fit-content"}}>Ver pago</button>
                :
                <></>
              }
            </div>
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
                  <th>Nombre</th>
                  <th>Codigo</th>
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
                      <button onClick={()=>{navigate(`/productos/${producto.id}`)}}>Ver producto</button>
                    </td>
                    <td>{producto.nombre}</td>
                    <td>{producto.id}</td>
                    <td>{producto.cantidad}</td>
                    <td>$ {producto.precio.toFixed(2)}</td>
                    <td>{producto.bonificacion}</td>
                    <td>{producto.impuesto} %</td>
                    <td>{((producto.precio*producto.cantidad) - ((producto.bonificacion*(producto.precio * producto.cantidad))/100)).toFixed(2)}</td>
                  </tr>
                  )
                }
              </tbody>
            </table>
            
            {
              totalPieFactura()
            }
          </div>
          {
            detail.remito ? 
            <div style={{display:"flex",flexDirection:"column"}}>
              <h3>Remito asociado</h3>
              <button style={{width:"fit-content"}}>Ver detalle del remito</button>
              <span>Creacion {detail.remito.remito_creacion.slice(0,10)}</span>
              <span>Vencimiento {detail.remito.remito_vencimiento.slice(0,10)}</span>

            </div>
            :
            <div style={{display:"flex",flexDirection:"row",margin:"70px 0px",alignItems:"center",justifyContent:"center"}}>
              <span>No hay remitos asociados </span>
              <IoInformationCircleOutline/>
            </div>
          }

          
        </>

      }
      </>
    }
    </>
  )
}

export default FacturaDeVentaDetalle