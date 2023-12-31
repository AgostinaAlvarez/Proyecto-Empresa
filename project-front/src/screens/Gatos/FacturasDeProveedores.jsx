/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { BsFillInboxesFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import PagoFactura from './PagoFactura';
import { FiPrinter } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Button, Table, Tag } from 'antd';

const FacturasDeProveedores = () => {
  const { facturasDeProveedores,setFacturasDeProveedores } = useContext(AppContext);
 
  useEffect(() => {
    console.log('factt')
    console.log(facturasDeProveedores)
  }, [])
  

  const navigate = useNavigate()
  
  function nuevaFactura (){
    navigate('/facturasDeProveedores/nueva')
  }

  const [ open,setOpen ] = useState(false);
  const [ selectedFactura,setSelectedFactura ] = useState(null);
  

  const columns = [
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
    },
    {
      title: 'Nmro',
      dataIndex: 'nmro',
      key: 'nmro',
      render: (text) => {
        const numero = text
        return `001 - 000-${numero}`
      }
    },
    {
      title: 'Proveedor',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Creacion',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (text) => {
        const fecha = text.slice(0, 10)
        return fecha
      }
    },
    {
      title: 'Vencimiento',
      dataIndex: 'vencimiento',
      key: 'vencimiento',
      render: (text) => {
        const fecha = text.slice(0, 10)
        return fecha
      }
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text) => {
        const total = text.toFixed(2)
        return `$${total}`
      }
    },
    {
      title: 'Pagado',
      dataIndex: 'montoPagado',
      key: 'montoPagado',
      render: (text) => {
        const total = text.toFixed(2)
        return `$${total}`
      }
    },
    {
      title: 'Por Pagar',
      dataIndex: 'montoPendiente',
      key: 'montoPendiente',
      
      render: (text) => {
        let total = text.toFixed(2)
        return `$${total}`
      }
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (text,record) =>{
        return(
          <Tag color={text === "Pagada" ? 'green' : 'volcano'} >
            {text}
          </Tag>
        )
      }
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button style={{marginRight:"5px"}} 
          >Ver</Button>
          <Button style={{marginRight:"5px"}} 
          //onClick={()=>{navigate(`/facturas/imprimir/${record.idFactura}`)}}
          >Imprimir</Button>
          {record.estado === 'Pendiente' && ( // Verifica si el estado es "Pendiente"
            <Button onClick={() =>{  // Agrega el botón "Pagar" cuando el estado es "Pendiente"
              setSelectedFactura(record)
              console.log(record)  
              setOpen(true)
            }}>
              Registrar Pago
            </Button>
          )}
        </>

      ),
    },
  ]




  return (
    <>
      <HeaderSection
        name={'Facturas de Proveedores'}
        IconS={<BsFillInboxesFill style={{fontSize:30}}/>}
        actionName={'Nueva Factura de Proveedor'}
        action={nuevaFactura}
      />
      <Table
        dataSource={facturasDeProveedores}
        columns={columns}
        pagination={{
          pageSize: 5,
          position: 'bottom',
          //showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`,
        }}
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