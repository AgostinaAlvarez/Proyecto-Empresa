/* eslint-disable no-unused-vars */
import React from 'react'
import HeaderSection from '../../components/HeaderSection'
import { FaClipboardList } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const DetalleProducto = () => {
  const params = useParams()
  const [ loading,setLoading ] = useState(true);
  const [ err,setErr ] = useState(false);
  const [ productDetails,setProductDetails ] = useState(null);
  const [ movimientos,setMovimientos ] = useState([])
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
                name={`Producto de Inventario: ${productDetails.nombre}`}
                IconS={<FaClipboardList style={{fontSize:25}}/>    }
                //actionName={'Nuevo Producto'}
                //action={openModal}
              />
              <div>Id de producto {productDetails.id}</div>
              <table className='tableFactura' style={{margin:"25px 0"}}>
                <thead>
                  <tr>
                    <th style={{textAlign:"center",backgroundColor:"#EED7CE"}}>Stock</th>
                    <th style={{textAlign:"center",backgroundColor:"#EED7CE"}}>Unidad de Medida</th>
                    <th style={{textAlign:"center",backgroundColor:"#EED7CE"}}>Costo Inicial</th>
                    <th style={{textAlign:"center",backgroundColor:"#EED7CE"}}>Impuesto</th>
                    <th style={{textAlign:"center",backgroundColor:"#EED7CE"}}>Precio Base</th>
                    <th style={{textAlign:"center",backgroundColor:"#EED7CE"}}>Deposito</th>
                    <th style={{textAlign:"center",backgroundColor:"#EED7CE"}}>Precio de venta</th>
                    <th style={{textAlign:"center",backgroundColor:"#EED7CE"}}>Ganancia neta</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{textAlign:"center"}}>{productDetails.cantidad}</td>
                    <td style={{textAlign:"center"}}>{productDetails.unidadDeMedida}</td>
                    <td style={{textAlign:"center"}}>${productDetails.costoInicial}</td>
                    <td style={{textAlign:"center"}}>{productDetails.impuesto}%</td>
                    <td style={{textAlign:"center"}}>${productDetails.precioBase}</td>
                    <td style={{textAlign:"center"}}>{productDetails.deposito}</td>
                    <td style={{textAlign:"center"}}>${productDetails.precioTotal}</td>
                    <td style={{textAlign:"center"}}>${productDetails.precioTotal - productDetails.costoInicial}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                Movimientos relacionados
              </div>
              <table className='tableFactura' style={{margin:"25px auto",width:"90%"}}>
                <thead>
                  <tr>
                    <th style={{backgroundColor:"#EED7CE"}}>Fecha</th>
                    <th style={{backgroundColor:"#EED7CE"}}>Tipo de movimiento</th>
                    <th style={{backgroundColor:"#EED7CE"}}>Precio Total Apercibido</th>
                    <th style={{backgroundColor:"#EED7CE"}}>Cantidad</th>
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