/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { BsFillInboxesFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { AiOutlineSearch } from "react-icons/ai";
import CobroFactura from './CobroFactura';
import { FiPrinter } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Button, Table, Tag } from 'antd';

const FacturasDeVenta = () => {
  const {facturas} = useContext(AppContext)
  const navigate = useNavigate();
  function nuevaFactura (){
    navigate('/facturas/nueva')
  }

  useEffect(() => {
    console.log(facturas)
  }, [])
  
  const [ filters,setFilters ] = useState([
    {
      name:"Cliente",
      selected:true,
      id:1
    },
    {
      name:"Tipo",
      selected:false,
      id:2
    },
    {
      name:"Numero",
      selected:false,
      id:3
    },
    {
      name:"Creacion",
      selected:false,
      id:4
    },
    {
      name:"Vencimiento",
      selected:false,
      id:5
    },
    {
      name:"Estado",
      selected:false,
      id:6
    },
  ]);

  function selectSearchType (id){
    const updateData = filters.map((item)=>{
      if(item.id === id){
        return {...item,selected:true}
      }
      return {...item,selected:false}
    })
    setFilters(updateData)
  }

  const [ open,setOpen ] = useState(false)
  const [ selectedFactura,setSelectedFactura ] = useState(null)

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
        const numero = text.slice(6)
        return `0001-${numero}`
      }
    },
    {
      title: 'Cliente',
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
      title: 'Cobrado',
      dataIndex: 'montoCobrado',
      key: 'montoCobrado',
      render: (text) => {
        const total = text.toFixed(2)
        return `$${total}`
      }
    },
    {
      title: 'Por Cobrar',
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
          <Tag color={text == "Pagada" ? 'green' : 'volcano'} >
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
          <Button style={{marginRight:"5px"}} onClick={()=>{navigate(`/facturas/imprimir/${record.idFactura}`)}}
          >Imprimir</Button>
          {record.estado === 'Pendiente' && ( // Verifica si el estado es "Pendiente"
            <Button onClick={() => { // Agrega el botón "Pagar" cuando el estado es "Pendiente"
              console.log(record);
              setSelectedFactura(record);
              setOpen(true);
            }}>
              Registrar Cobro
            </Button>
          )}
        </>

      ),
    },
  ]

  return (
    <>
      {/*HEADER */}
      <HeaderSection
        name={'Facturas de Venta'}
        IconS={<BsFillInboxesFill style={{fontSize:30}}/>}
        actionName={'Nueva Factura'}
        action={nuevaFactura}
      />
      {/*Filtro*/}
      <div className='filtro-container'>
        {
          filters.map((item,index)=>
            <div onClick={()=>{selectSearchType(item.id)}} key={index} className={item.selected === false ? 'filtro-item':'filtro-item-CTA'}>{item.name}</div>
          )
        }
        
      </div>
      <div className='filtro-search-container'>
        <div style={{width:"75%",border:"1px solid #555555",display:"flex",alignItems:"center",justifyContent:"center",gap:5,boxSizing:"border-box",padding:"5px 0px",borderRadius:7}}>
          <AiOutlineSearch style={{fontSize:27,marginLeft:10}}/>
          <input className='inp' placeholder='filtrar' style={{width:"calc(100% - 70px)",height:25,border:"none",paddingLeft:10}} type='text'/>
        </div>
      </div>
      {/*Tabla*/}
      <Table
        dataSource={facturas}
        columns={columns}
        pagination={{
          pageSize: 5,
          position: 'bottom',
          //showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`,
        }}
      />

     
      {
        open === true ?
        <CobroFactura 
          setOpen={setOpen}
          selectedFactura={selectedFactura}  
        />
        :
        <></>
      }
    </>
  )
}

export default FacturasDeVenta