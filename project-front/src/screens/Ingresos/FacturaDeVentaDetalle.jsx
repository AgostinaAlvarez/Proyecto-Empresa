/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { BsFillInboxesFill } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FacturaDeVentaDetalle = () => {
  
  const params = useParams()
  

  
  useEffect(() => {
    
    console.log(params.id)
    detalle()
  }, [])
  

  async function detalle(){
    try{
      const response = await axios.get(`http://localhost:3000/api/detalleFactura/${params.id}`)
      console.log(response.data)
    }catch(err){
      console.log(err)
    }finally{
      console.log('final de la peticion')
    }
  }

  return (
    <>
      <HeaderSection
        name={'Deatlle Facura'}
        IconS={<BsFillInboxesFill style={{fontSize:30}}/>}
      />
    </>
  )
}

export default FacturaDeVentaDetalle