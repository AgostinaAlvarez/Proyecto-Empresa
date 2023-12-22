/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { MdTableView } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { FiPrinter } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Button, Table } from 'antd';

const LibroDiario = () => {
  const arr = [1,2,3,1,2,3,1,1,1,1,1,1,1]
  const { librosDiarios,setLibrosDiarios } = useContext(AppContext)
  const navigate = useNavigate()
  function nuevoLibroDiario (){
    navigate('/libro-diario/nuevo')
  }

  useEffect(() => {
    getDatos()
  }, [])
  
  async function getDatos (){
    try{
      const response = await axios.get('http://localhost:3000/api/libro-diario')
      console.log(response.data.librosDiarios)
      setLibrosDiarios(response.data.librosDiarios)
    }catch(err){
      console.log(err)
    }
  }

  const columns = [
    {
      title: 'Ref',
      dataIndex: 'id',
      key: 'id',
      render: (text) => {
        const ref = text.slice(0,10)
        return ref;
      },
    },
    {
      title: 'Fecha Inicial',
      dataIndex: 'fechaInicial',
      key: 'fechaInicial',
      render: (text) => {
        const ref = text.slice(0,10)
        return ref;
      },
    },
    {
      title: 'Fecha Final',
      dataIndex: 'fechaFinal',
      key: 'fechaFinal',
      render: (text) => {
        const ref = text.slice(0,10)
        return ref;
      },
    },
    
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button style={{marginRight:"5px"}} 
          onClick={()=>{navigate(`/libro-diario/detalle/${record.id}`)}}
          >Ver</Button>
          <Button 
          //onClick={() => navigate(`/productos/${record.id}`)}
          >Imprimir</Button>
        </>

      ),
    },
  ];



  return (
    <>
      <HeaderSection
        name='Libro Diario'
        IconS={<MdTableView style={{fontSize:28}}/>}
        actionName={'Nuevo Libro Diario'}
        action={nuevoLibroDiario}
      />
      <div>
        Filtrar
      </div>
      <Table
        dataSource={librosDiarios}
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

export default LibroDiario