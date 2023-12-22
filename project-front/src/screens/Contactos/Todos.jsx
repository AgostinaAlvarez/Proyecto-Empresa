/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { LuUsers } from "react-icons/lu";
import NewContact from './NewContact';
import { AiOutlineEye,AiOutlineEdit,AiOutlineSearch } from "react-icons/ai";
import { AppContext } from '../../context/AppContext';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Button, Table } from 'antd';

const Todos = () => {
  const { contactos,setContactos } = useContext(AppContext);

  const [ newContact,setNewContact ] = useState(false);
  function openOverlay(){
    setNewContact(true)
  }

  const test = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

  const total = test.length

  const [primerosDiezRegistros,setPrimerosDiezRegistros] = useState(test.slice(0, 10));

  const [ filters,setFilters ] = useState([
    {
      name:"Nombre",
      selected:true,
      id:1
    },
    {
      name:"Identificacion",
      selected:false,
      id:2
    },
    {
      name:"Telefono",
      selected:false,
      id:3
    },
    {
      name:"Localidad",
      selected:false,
      id:4
    },
    {
      name:"Domicilio",
      selected:false,
      id:5
    },
    {
      name:"Correo",
      selected:false,
      id:6
    },
    {
      name:"Condicion IVA",
      selected:false,
      id:7
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


   
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Identificacion',
      dataIndex: 'idType',
      key: 'idType',
    },
    {
      title: 'Nmro',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Mail',
      dataIndex: 'correo',
      key: 'correo',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button style={{marginRight:"5px"}} 
          //</>onClick={() => handleButtonClick(record)}
          >Ver</Button>
          <Button 
          //onClick={() => handleButtonClick(record)}
          >Editar</Button>
        </>

      ),
    },
  ];

  useEffect(() => {
    console.log(contactos)
  }, [])
  


  return (
    <>
      <HeaderSection
        name='Contactos'
        IconS={<LuUsers style={{fontSize:28}}/>}
        actionName={'Nuevo Contacto'}
        action={openOverlay}
      />
      {
        newContact === true ?
        <NewContact
          setNewContact = {setNewContact}
        />
        :
        <></>
      }
      {/** */}
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
      <Table
        dataSource={contactos}
        columns={columns}
        pagination={{
          pageSize: 6,
          position: 'bottom',
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} de ${total} elementos`,
        }}
      />
      
    </>
  )
}

export default Todos