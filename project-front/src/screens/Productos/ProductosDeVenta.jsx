/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import NuevoProducto from './NuevoProducto'
import { AppContext } from '../../context/AppContext'
import HeaderSection from '../../components/HeaderSection';
import { IoSettingsOutline } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const ProductosDeVenta = () => {
  const { productos,setProductos } = useContext(AppContext);
  const navigate = useNavigate()
  const [createNewProduct,setCreateNewProduct] = useState(false);

  function openModal (){
    setCreateNewProduct(true)
  }

  function valorDeInventario (){
    let total = 0;
    productos.forEach(element => {
      total = total + parseFloat((element.cantidad * element.costoInicial).toFixed(2))
    });
    return <>{total}</>
  }

  useEffect(() => {
    console.log(productos)
  }, [])
  
  return (
    <>
      <HeaderSection
        name={'Inventario'}
        IconS={<FaClipboardList style={{fontSize:25}}/>    }
        actionName={'Nuevo Producto'}
        action={openModal}
      />
      {
        createNewProduct === true ?
        <NuevoProducto
          setCreateNewProduct = {setCreateNewProduct}
        />
        :
        <></>
      }
      <div className='section'>
        <div style={{textAlign:"center"}}>
          <span style={{display:"block",fontSize:17,fontWeight:500}}>Valor de inventiario</span>
          <h2 style={{fontSize:30}}>${valorDeInventario()}</h2>
        </div>
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
            <th>Acciones</th>
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
                <tr className='tr-list' key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.id}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.unidadDeMedida}</td>
                  <td>${item.costoInicial}</td>
                  <td>${parseFloat((item.cantidad * item.costoInicial).toFixed(2))}</td>
                  <td><button onClick={()=>{navigate(`/productos/${item.id}`)}}>Ver</button></td>
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

export default ProductosDeVenta