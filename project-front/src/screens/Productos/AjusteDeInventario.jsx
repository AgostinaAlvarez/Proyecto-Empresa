/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { IoSettingsOutline } from "react-icons/io5";
import { AppContext } from '../../context/AppContext';
import NuevoAjusteDeInventario from './NuevoAjusteDeInventario';
import { Button, Table } from 'antd';


const AjusteDeInventario = () => {
  const { ajustesDeInventario } = useContext(AppContext);
  const [ overlay,setOverlay ] = useState(false)

  useEffect(() => {
    console.log(ajustesDeInventario)
  }, [])
  
  function nuevoAjuste (){
    setOverlay(true)
  }

  const columns = [
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (text) => {
        const date = text.slice(0, 10);
        return date;
      },
    },
    {
      title: 'Hora',
      dataIndex: 'hora',
      key: 'hora',
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
    },
    
    {
      title: 'Nombre de producto',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Id producto',
      dataIndex: 'idProducto',
      key: 'idProducto',
    },
    {
      title: 'Cantidad Ajustada',
      dataIndex: 'cantidadAjustada',
      key: 'cantidadAjustada',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button style={{marginRight:"5px"}} 
          //</>onClick={() => handleButtonClick(record)}
          >Ver</Button>
        </>

      ),
    },
  ];


  return (
    <>
      <HeaderSection
        name={'Ajuste de Inventario'}
        IconS={<IoSettingsOutline style={{fontSize:25}}/>}
        actionName={'Nuevo Ajuste'}
        action={nuevoAjuste}
      />
      <div>
        Ajustes realizados
      </div>
      <Table
        dataSource={ajustesDeInventario}
        columns={columns}
        pagination={{
          pageSize: 6,
          position: 'bottom',
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`,
        }}
      />
      
      {
        overlay === true ?
        <NuevoAjusteDeInventario
          setOverlay={setOverlay}
        />
        :
        <></>
      }
    </>
  )
}

export default AjusteDeInventario