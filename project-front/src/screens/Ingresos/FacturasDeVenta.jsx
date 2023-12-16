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
      <table className='tableFactura' style={{marginBottom:30}}>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Numero</th>
            <th>Cliente</th>
            <th>Creacion</th>
            <th>Vencimiento</th>
            <th>Total</th>
            <th>Cobrado</th>
            <th>Por Cobrar</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            facturas.map((item,index)=>
            <tr className='tr-list' key={index}>
              <td>{item.tipo}</td>
              <td>0001-{item.nmro.slice(6)}</td>
              <td>{item.nombre}</td>
              <td>{item.fecha.slice(0, 10)}</td>
              <td>{item.vencimiento.slice(0, 10)}</td>
              <td className='tableFontBold'>${item.total.toFixed(2)}</td>
              <td>${item.montoCobrado.toFixed(2)}</td>
              <td>${item.montoPendiente.toFixed(2)}</td>
              <td style={item.estado === "Pendiente" ? {color:"#FF6C22",fontWeight:500} : {color:"green",fontWeight:500}}>{item.estado}</td>
              <td>
                <div style={{display:"flex",flexDirection:"row",gap:10}}>
                  
                  <MdOutlineRemoveRedEye/>
                  <FiPrinter onClick={()=>{navigate(`/facturas/imprimir/${item.idFactura}`)}}/>
                  {
                    item.estado === "Pendiente" ?
                    <button onClick={()=>{
                      console.log(item)
                      setSelectedFactura(item)  
                      setOpen(true)
                    }}>Registrar cobro</button>
                    :
                    <></>
                  }
                </div>
              </td>
            </tr>
            
            )
          }
        </tbody>
      </table>
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