/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { MdTableView } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { FiPrinter } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";

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
      <table className='tableFactura' style={{marginBottom:30}}>
        <thead>
          <tr>
            <th>Nmro.</th>
            <th>Ref.</th>
            <th>Fecha inicial</th>
            <th>Fecha final</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            librosDiarios.length === 0? 
            <></>
            :
            <>
              {
                librosDiarios.map((item,index)=>
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.id.slice(0, 10)}</td>
                  <td>{item.fechaInicial.slice(0, 10)}</td>
                  <td>{item.fechaFinal.slice(0, 10)}</td>
                  <td>
                    <div style={{display:"flex",flexDirection:"row",gap:10}}>
                      <MdOutlineRemoveRedEye onClick={()=>{navigate(`/libro-diario/detalle/${item.id}`)}}/>
                      <FiPrinter/> 
                    </div>
                  </td>
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

export default LibroDiario