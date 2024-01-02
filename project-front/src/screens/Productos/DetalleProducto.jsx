/* eslint-disable no-unused-vars */
import React from 'react'
import HeaderSection from '../../components/HeaderSection'
import { FaClipboardList } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import img from '../../assets/filtro.png'

const DetalleProducto = () => {
  const params = useParams()
  const [ loading,setLoading ] = useState(true);
  const [ err,setErr ] = useState(false);
  const [ productDetails,setProductDetails ] = useState(null);
  const [ movimientos,setMovimientos ] = useState([])

  
  const [ vencimiento,setVencimiento ] = useState(null);
  const handleVencimientoChange = (date) =>{
    setVencimiento(date)
  };


  useEffect(() => {
    console.log(params)
    getDataProduct()
  }, [])
  
  async function getDataProduct(){
    try{
      const response =  await axios.get(`http://localhost:3000/api/producto/${params.id}`)
      if(response.data.producto.length === 0){
        setErr(true)
      }else{
        console.log(response.data.producto[0])
        setProductDetails(response.data.producto[0])
        setMovimientos(response.data.movimientos)
        setLoading(false)
        setErr(false)
      }
    }catch(err){
      setErr(true);
      console.log(err)
    }
  }

  function ordenDeTrabajo (){
    console.log('orden')
  }

  return (
    <>
      {
        loading === true ?
        <div>Loading</div>
        :
        <>
          {
            err === true ?
            <div>Producto no encontrado</div>
            :
            <>
              <HeaderSection
                name={`${productDetails.nombre}`}
                IconS={<FaClipboardList style={{fontSize:25}}/>    }
                actionName={'Nueva orden de trabajo'}
                action={ordenDeTrabajo}
              />
              <div style={{width:"100%",display:"flex",flexDirection:"row",boxSizing:"border-box",border:"1px solid #3d3d3da2",padding:15, alignItems:"flex-start",justifyContent:"flex-start",gap:10,marginBottom:30,borderRadius:5}}>
                {/*Imagen*/}
                <div style={{width:"fit-content",height:"fit-content",display:"flex",flexDirection:"column",gap:6,boxSizing:"border-box"}}>
                  <img style={{height:250}} src={img} />
                  <span style={{textAlign:"center"}}>Dimesiones: 230cm x 400cm</span>
                  <button>Ver plano</button>
                </div>
                {/*Detalle*/}
                <div style={{display:"flex",flexDirection:"column",gap:15,width:"100%",position:"relative"}}>
                  <button style={{position:"absolute",right:20,top:10}}>Editar</button>
                  <span style={{fontWeight:600}}>REF: {productDetails.id}</span>
                  <span>Unidad de medida: {productDetails.unidadDeMedida}</span>
                  <span>Stock: {productDetails.cantidad}</span>
                  <span>Deposito: Calle San Martin 231 - Pasillo 2</span>
                  <table className='tableFactura'>
                    <thead>
                      <tr>
                        <th style={{textAlign:"center",backgroundColor:"#CDFCF6"}}>Costo Inicial</th>
                        <th style={{textAlign:"center",backgroundColor:"#CDFCF6"}}>Impuesto</th>
                        <th style={{textAlign:"center",backgroundColor:"#CDFCF6"}}>Precio Base</th>
                        <th style={{textAlign:"center",backgroundColor:"#CDFCF6"}}>Precio de venta</th>
                        <th style={{textAlign:"center",backgroundColor:"#CDFCF6"}}>Ganancia bruta</th>
                        <th style={{textAlign:"center",backgroundColor:"#CDFCF6"}}>Ganancia neta</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{textAlign:"center"}}>${productDetails.costoInicial}</td>
                        <td style={{textAlign:"center"}}>{productDetails.impuesto}%</td>
                        <td style={{textAlign:"center"}}>${productDetails.precioBase.toFixed(2)}</td>
                        
                        <td style={{textAlign:"center"}}>${productDetails.precioTotal.toFixed(2)}</td>
                        <td style={{textAlign:"center"}}>${(productDetails.precioTotal - productDetails.costoInicial).toFixed(2)}</td>
                        <td style={{textAlign:"center"}}>${(productDetails.precioTotal - productDetails.precioBase).toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>
              <div>
                Materiales de produccion
              </div>
              <table className='tableFactura' style={{margin:"25px 0"}}>
                <thead>
                  <tr>
                    <th style={{textAlign:"center",backgroundColor:"#CDFCF6"}}>Material</th>
                    <th style={{textAlign:"center",backgroundColor:"#CDFCF6"}}>Proveedor</th>
                    <th style={{textAlign:"center",backgroundColor:"#CDFCF6"}}>Unidad de medida</th>
                    <th style={{textAlign:"center",backgroundColor:"#CDFCF6"}}>Stock</th>
                    <th style={{textAlign:"center",backgroundColor:"#CDFCF6"}}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{textAlign:"center"}}>Fibras sintéticas</td>
                    <td style={{textAlign:"center"}}>Empresa SRL</td>
                    <td style={{textAlign:"center"}}>Unidad</td>
                    <td style={{textAlign:"center"}}>250</td>
                    <td style={{textAlign:"center"}}>Pedir</td>
                  </tr>
                  <tr>
                    <td style={{textAlign:"center"}}>Maya metalica</td>
                    <td style={{textAlign:"center"}}>Empresa SRL</td>
                    <td style={{textAlign:"center"}}>Unidad</td>
                    <td style={{textAlign:"center"}}>250</td>
                    <td style={{textAlign:"center"}}>Pedir</td>
                  </tr>
                  <tr>
                    <td style={{textAlign:"center"}}>Cartón prensado</td>
                    <td style={{textAlign:"center"}}>Empresa SRL</td>
                    <td style={{textAlign:"center"}}>Unidad</td>
                    <td style={{textAlign:"center"}}>250</td>
                    <td style={{textAlign:"center"}}>Pedir</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h4>Movimientos</h4>
                <div style={{border:"1px solid green",display:"flex",gap:20}}>
                  <div style={{display:"flex",gap:5,alignItems:"center"}}>
                    <span>Desde</span>
                    <DatePicker
                      selected={vencimiento}
                      onChange={handleVencimientoChange}
                      dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de la fecha
                    />
                  </div>
                  <div style={{display:"flex",gap:5,alignItems:"center"}}>
                    <span>Hasta</span>
                    <DatePicker
                      selected={vencimiento}
                      onChange={handleVencimientoChange}
                      dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de la fecha
                    />
                  </div>
                </div>
              </div>

              <table className='tableFactura' style={{margin:"25px auto",width:"90%"}}>
                <thead>
                  <tr>
                    <th style={{backgroundColor:"#CDFCF6"}}>Fecha</th>
                    <th style={{backgroundColor:"#CDFCF6"}}>Tipo de movimiento</th>
                    <th style={{backgroundColor:"#CDFCF6"}}>Precio Total Apercibido</th>
                    <th style={{backgroundColor:"#CDFCF6"}}>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    movimientos.length === 0 ?
                    <></>
                    :
                    <>
                      {
                        movimientos.map((item,index)=>
                          <tr  key={index}>
                            <td>{item.fecha.slice(0,10)}</td>
                            <td>{item.tipo === "Incremento" ? <>Incremento de stock</> : (item.tipo === "ingreso" ? <>Creacion del producto</> : <>{item.tipo}</>)}</td>
                            <td>${item.precio.toFixed(2)}</td>
                            <td>{item.tipo === "Facturacion de producto" ? <span style={{color:"red"}}>- {item.cantidad}</span> : <span style={{color:"green"}}>+ {item.cantidad}</span>}</td>
                          </tr>
                        )
                      }
                    </>
                  }
                </tbody>
              </table>

              <div>
                <h4>Ordenes de trabajo</h4>
                <div style={{border:"1px solid green",display:"flex",gap:20}}>
                  <div style={{display:"flex",gap:5,alignItems:"center"}}>
                    <span>Desde</span>
                    <DatePicker
                      selected={vencimiento}
                      onChange={handleVencimientoChange}
                      dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de la fecha
                    />
                  </div>
                  <div style={{display:"flex",gap:5,alignItems:"center"}}>
                    <span>Hasta</span>
                    <DatePicker
                      selected={vencimiento}
                      onChange={handleVencimientoChange}
                      dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de la fecha
                    />
                  </div>
                </div>
              </div>
              
              <table className='tableFactura' style={{margin:"25px auto",width:"90%"}}>
                <thead>
                  <tr>
                    <th style={{backgroundColor:"#CDFCF6"}}>Fecha</th>
                    <th style={{backgroundColor:"#CDFCF6"}}>Tipo de movimiento</th>
                    <th style={{backgroundColor:"#CDFCF6"}}>Precio Total Apercibido</th>
                    <th style={{backgroundColor:"#CDFCF6"}}>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    movimientos.length === 0 ?
                    <></>
                    :
                    <>
                      {
                        movimientos.map((item,index)=>
                          <tr  key={index}>
                            <td>{item.fecha.slice(0,10)}</td>
                            <td>{item.tipo === "Incremento" ? <>Incremento de stock</> : (item.tipo === "ingreso" ? <>Creacion del producto</> : <>{item.tipo}</>)}</td>
                            <td>${item.precio.toFixed(2)}</td>
                            <td>{item.tipo === "Facturacion de producto" ? <span style={{color:"red"}}>- {item.cantidad}</span> : <span style={{color:"green"}}>+ {item.cantidad}</span>}</td>
                          </tr>
                        )
                      }
                    </>
                  }
                </tbody>
              </table>
            </>

          }
        </>
      }
    </>
  )
}

export default DetalleProducto