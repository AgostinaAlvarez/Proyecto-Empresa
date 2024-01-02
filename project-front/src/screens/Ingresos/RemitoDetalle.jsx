/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import HeaderSection from '../../components/HeaderSection'
import { BsFillInboxesFill } from "react-icons/bs";


const RemitoDetalle = () => {
  const [ loading,setLoading ] = useState(true)
  const [ err,setErr ] = useState(false)

  useEffect(() => {
    
  }, [])
  
  async function getRemito(){
    try{
      const response = await axios.get('/')
      console.log(response.data)
      
    }catch(err){
      setErr(true)
    }finally{
      setLoading(false)
    }
  }

  return (
    <>
      {
        loading === true ?
        <div>Loading</div>
        :
        <>
          {
            err === true ?
            <div>Error</div>
            :
            <>
              <HeaderSection
                name={`Remito Detalle`}
                IconS={<BsFillInboxesFill style={{fontSize:30}}/>}
                //actionName={'Imprimir factura'}
                //action={imprimir}
              />
            </>
          }
        </>
      }
    </>
  )
}

export default RemitoDetalle