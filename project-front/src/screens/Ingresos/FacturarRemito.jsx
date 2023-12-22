/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import NuevaFactura from './NuevaFactura'

const FacturarRemito = ({setOpen,contacto,productosF,remito}) => {
  return (
    <div className='overlay'>
      <div className='overlayCard' style={{width:"95%"}}>
          <div style={{width:"100%",height:"55px",boxSizing:"border-box",borderBottom:"1px solid #00000031",display:"flex",alignItems:"center",padding:"0px 10px",position:"relative",gap:10,fontSize:23,justifyContent:"center"}}>
            <span>Facturar Remito</span>
            <button onClick={()=>{setOpen(false)}} style={{fontSize:16,position:"absolute",top:0,right:0,cursor:"pointer"}}>Cerrar</button>
          </div>
          <div style={{height:"calc(100% - 55px)",boxSizing:"border-box",overflowY:"scroll",padding:"0px 40px"}}>
            <NuevaFactura 
            propiedad={true}
            contacto={contacto}
            productosF={productosF}
            remito={remito}
            setOpen={setOpen}
            />
          </div>
      </div>
    </div>
  )
}

export default FacturarRemito