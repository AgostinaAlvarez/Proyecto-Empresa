/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { useNavigate } from 'react-router-dom'
import { MdAttachMoney } from "react-icons/md";
import { AppContext } from '../../context/AppContext';
import { Button, Table } from 'antd';

const Cobranzas = () => {
  const { cobranzas } = useContext(AppContext);

  const navigate = useNavigate();
  function nuevaCobranza (){
    navigate('/cobranzas/nueva')
  }

  useEffect(() => {
    console.log(cobranzas)
  }, [])
  
  const columns = [
    {
      title: 'Comcepto',
      dataIndex: 'concepto',
      key: 'concepto',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      render: (text) => {
        const date = text.slice(0,10);
        return date;
      },
    },
    {
      title: 'Cuenta',
      dataIndex: 'entidad',
      key: 'entidad',
    },
    {
      title: 'Nmro. de cuenta',
      dataIndex: 'nmroDeCuenta',
      key: 'nmroDeCuenta',
    },
    {
      title: 'Medio de pago',
      dataIndex: 'metodoDePago',
      key: 'metodoDePago',
    },
    {
      title: 'Monto',
      dataIndex: 'total',
      key: 'total',
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
          //onClick={() => navigate(`/productos/${record.id}`)}
          >Ver</Button>
        </>

      ),
    },
  ];


  return (
    <>
        <HeaderSection
        name={'Cobranzas'}
        IconS={<MdAttachMoney style={{fontSize:30}}/>}
        actionName={'Nueva Cobranza'}
        action={nuevaCobranza}
      />
      <Table
        dataSource={cobranzas}
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

export default Cobranzas