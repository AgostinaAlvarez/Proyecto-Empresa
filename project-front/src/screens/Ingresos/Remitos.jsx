/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { IoMdCheckboxOutline } from "react-icons/io";
import HeaderSection from '../../components/HeaderSection';
import { MdOutlineCheckBox } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { AiOutlineSearch } from "react-icons/ai";
import FacturarRemito from './FacturarRemito';
import axios from 'axios';
import { FiPrinter } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Remitos = () => {
  //const [ nuevoRemito,setNuevoRemito ] = useState(false)
  const { remitos } = useContext(AppContext);
  const [ open,setOpen ] = useState(false)
  
  const navigate = useNavigate()

  function nuevoRemito (){
    navigate('/remitos/nuevo')
  }

  useEffect(() => {
    console.log(remitos)
  }, [])
  
  const [ filters,setFilters ] = useState([
    {
      name:"Cliente",
      selected:true,
      id:1
    },
    {
      name:"Folio",
      selected:false,
      id:2
    },
    {
      name:"Creacion",
      selected:false,
      id:3
    },
    {
      name:"Vencimiento",
      selected:false,
      id:4
    },
    {
      name:"Estado",
      selected:false,
      id:5
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

  const [ contacto,setContacto ] = useState(null)
  const [ productos,setProductos ] = useState([])
  const [ remito,setRemito ] = useState(null)

  async function facturarRemito (id,item){
    try{
      const response = await axios.get(`http://localhost:3000/api/detalleRemitoFacturar/${id}`)
      setContacto(response.data.contacto[0])
      setProductos(response.data.productos)
      console.log(item)
      setRemito(item)
      console.log(response.data.contacto[0])
      console.log(response.data.productos)
      setOpen(true)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <HeaderSection
        name={'Remitos'}
        IconS={<MdOutlineCheckBox style={{fontSize:28}}/>    }
        actionName={'Nuevo Remito'}
        action={nuevoRemito}
      />
      
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

      <table className='tableFactura'>
        <thead>
          <tr>
            <th>Folio</th>
            <th>Cliente</th>
            <th>Creacion</th>
            <th>Vencimiento</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {  
            remitos.map((item,index)=>
              <tr className='tr-list' key={index}>
                <td>0001-000000{index+1}</td>
                <td>{item.nombre}</td>
                <td>{item.creacion.slice(0, 10)}</td>
                <td>{item.vencimiento.slice(0, 10)}</td>
                <td>{item.estado}</td>
                <td className='tableFontBold'>${item.total.toFixed(2)}</td>
                <td>
                  <div style={{display:"flex",flexDirection:"row",gap:10}}>
                    <MdOutlineRemoveRedEye/>
                    <FiPrinter onClick={()=>{navigate(`/remitos/imprimir/${item.idRemito}`)}}/>
                    {
                      item.estado === "No facturado" ?
                      <button onClick={()=>{
                        facturarRemito(item.idRemito,item)
                      }}>Facturar</button>
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
        <FacturarRemito 
        setOpen={setOpen}
        contacto={contacto}
        productosF={productos}
        remito={remito}
        />
        :
        <></>
      }
    </>
  )
}

export default Remitos