/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import NuevaCobranza from './NuevaCobranza'

const CobroFactura = ({setOpen,selectedFactura}) => {
  return (
    <div className='overlay'>
      <div style={{width:"90%"}} className='overlayCard'>
        <div style={{width:"100%",height:"55px",boxSizing:"border-box",borderBottom:"1px solid #00000031",display:"flex",alignItems:"center",padding:"0px 10px",position:"relative",gap:10,fontSize:23,justifyContent:"center"}}>
          <span>Cobranza de la factura</span>
          <button onClick={()=>{setOpen(false)}} style={{fontSize:16,position:"absolute",top:0,right:0,cursor:"pointer"}}>Cerrar</button>
        </div>

        <div style={{height:"calc(100% - 55px)",width:"100%",boxSizing:"border-box",overflowY:"scroll",padding:"10px 0px"}}>
          <NuevaCobranza
            prop={true}
            selectedFactura={selectedFactura}
            setOpen={setOpen}
          />
        </div>
      </div>
    </div>
  )
}

export default CobroFactura