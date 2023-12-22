/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import NuevoProducto from './NuevoProducto'
import { AppContext } from '../../context/AppContext'
import HeaderSection from '../../components/HeaderSection';
import { IoSettingsOutline } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Button, Table } from 'antd';


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
  

  const columns = [
    {
      title: 'Item',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Stock',
      dataIndex: 'cantidad',
      key: 'cantidad',
    },
    {
      title: 'Unidad de medida',
      dataIndex: 'unidadDeMedida',
      key: 'unidadDeMedida',
    },
    {
      title: 'Costo',
      dataIndex: 'costoInicial',
      key: 'costoInicial',
      render: (text) => {
        const roundedValue = parseFloat(text).toFixed(2);
        return `$${roundedValue}`;
      },
    },
    {
      title: 'Precio Base',
      dataIndex: 'precioBase',
      key: 'precioBase',
      render: (text) => {
        const roundedValue = parseFloat(text).toFixed(2);
        return `$${roundedValue}`;
      },
    },
    {
      title: 'Precio Total',
      dataIndex: 'precioTotal',
      key: 'precioTotal',
      render: (text) => {
        const roundedValue = parseFloat(text).toFixed(2);
        return `$${roundedValue}`;
      },
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button style={{marginRight:"5px"}} 
          onClick={() => navigate(`/productos/${record.id}`)}
          >Ver</Button>
        </>

      ),
    },
  ];



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
      
      <Table
        dataSource={productos}
        columns={columns}
        pagination={{
          pageSize: 5,
          position: 'bottom',
          //showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`,
        }}
      />
      
    </>
  )
}

export default ProductosDeVenta