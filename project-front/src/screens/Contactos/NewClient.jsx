/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { SlArrowDown } from "react-icons/sl";
import { LuUsers } from "react-icons/lu";

const NewClient = ({setNewClient}) => {
  const [ submenuIdentificacion,setSubmenuIdentificacion ] = useState(false);
  const [ submenuCondicionIVA,setSubmenuCondicionIVA ] = useState(false);
  const [ identificacion,setIdentificacion ] = useState('');
  const [ condicionIVA,setCondicionIVA ] = useState('');

  const [ createdUContact,setCreatedContact ] = useState(false);

  return (
    <div className='overlay'>
      
      <div className='overlayCard'>
        <div style={{width:"100%",height:"55px",boxSizing:"border-box",borderBottom:"1px solid #00000031",display:"flex",alignItems:"center",padding:"0px 10px",position:"relative",gap:10,fontSize:23,justifyContent:"center"}}>
          <LuUsers/>
          <span>Nuevo Cliente</span>
          <button onClick={()=>{setNewClient(false)}} style={{fontSize:16,position:"absolute",top:0,right:0,cursor:"pointer"}}>Cerrar</button>
        </div>
        <div style={{height:"calc(100% - 55px)",width:"100%",boxSizing:"border-box",overflowY:"scroll",padding:"30px 0px"}}>

          <div style={{boxSizing:"border-box",width:"90%",margin:"0 auto",display:"flex",flexDirection:"column",gap:15}}>
            <div style={{width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:15,boxSizing:"border-box"}}>

              <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                <span>Tipo de identificacion</span>
                <div style={{height:37,position:"relative",border:"1px solid black",display:"flex",alignItems:"center",boxSizing:"border-box",padding:"0px 10px",justifyContent:"space-between"}}>
                  <div style={{width:"100%",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}} onClick={()=>{setSubmenuIdentificacion(!submenuIdentificacion)}}>
                    <span>{identificacion}</span>
                    <SlArrowDown style={{fontSize:12}}/>
                  </div>
                  {
                    submenuIdentificacion === true ?
                    <div style={{position:"absolute",top:"100%",left:0,width:"100%",zIndex:100,border:"1px solid black",boxSizing:"border-box",backgroundColor:"#ffff",display:"flex",flexDirection:"column"}}>
                      <span onClick={()=>{
                        setIdentificacion('DNI')
                        setSubmenuIdentificacion(false)
                        }} className='selectorItem'>DNI</span>
                      <span onClick={()=>{
                        setIdentificacion('CUIT')
                        setSubmenuIdentificacion(false)
                        }} className='selectorItem'>CUIT</span>
                      <span onClick={()=>{
                        setIdentificacion('Pasaporte')
                        setSubmenuIdentificacion(false)
                        }} className='selectorItem'>Pasaporte</span>
                      <span onClick={()=>{
                        setIdentificacion('CDI')
                        setSubmenuIdentificacion(false)
                        }} className='selectorItem'>CDI</span>
                      <span onClick={()=>{
                        setIdentificacion('Otra Identificacion')
                        setSubmenuIdentificacion(false)
                        }} className='selectorItem'>Otra Identificacion</span>
                    </div>
                    :
                    <></>
                  }
                </div>
              </div>
              
              <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                <span>Identificacion</span>
                <input style={{height:32,border:"1px solid black"}} type='text'/>
              </div>

              <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                <span>Nombre</span>
                <input style={{height:32,border:"1px solid black"}} type='text'/>
              </div>
              <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                <span>Condicion de IVA</span>
                {/** */}
                <div style={{height:37,position:"relative",border:"1px solid black",display:"flex",alignItems:"center",boxSizing:"border-box",padding:"0px 10px",justifyContent:"space-between"}}>
                  <div style={{width:"100%",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}} onClick={()=>{setSubmenuCondicionIVA(!submenuCondicionIVA)}}>
                    <span>{condicionIVA}</span>
                    <SlArrowDown style={{fontSize:12}}/>
                  </div>
                  {
                    submenuCondicionIVA === true ?
                    <div style={{position:"absolute",top:"100%",left:0,width:"100%",zIndex:100,border:"1px solid black",boxSizing:"border-box",backgroundColor:"#ffff",display:"flex",flexDirection:"column",gap:5}}>
                      <span className='selectorItem' onClick={()=>{
                        setCondicionIVA('Monotributo')
                        setSubmenuCondicionIVA(false)
                      }}>Monotributo</span>
                      <span className='selectorItem' onClick={()=>{
                        setCondicionIVA('IVA responsable inscripto')
                        setSubmenuCondicionIVA(false)
                      }}>IVA responsable inscripto</span>
                      <span className='selectorItem' onClick={()=>{
                        setCondicionIVA('IVA responsable no inscripto')
                        setSubmenuCondicionIVA(false)
                      }}>IVA responsable no inscripto</span>
                      <span className='selectorItem' onClick={()=>{
                        setCondicionIVA('IVA sujeto externo')
                        setSubmenuCondicionIVA(false)
                      }}>IVA sujeto externo</span>
                      <span className='selectorItem' onClick={()=>{
                        setCondicionIVA('Consumidor final')
                        setSubmenuCondicionIVA(false)
                      }}>Consumidor final</span>
                      <span className='selectorItem' onClick={()=>{
                        setCondicionIVA('Proveedor del exterior')
                        setSubmenuCondicionIVA(false)
                      }}>Proveedor del exterior</span>
                      <span className='selectorItem' onClick={()=>{
                        setCondicionIVA('Cliente del exterior')
                        setSubmenuCondicionIVA(false)
                      }}>Cliente del exterior</span>
                      <span className='selectorItem' onClick={()=>{
                        setCondicionIVA('IVA Liberado - Ley 19.640')
                        setSubmenuCondicionIVA(false)
                      }}>IVA Liberado - Ley 19.640</span>
                      <span className='selectorItem' onClick={()=>{
                        setCondicionIVA('Monotributista social')
                        setSubmenuCondicionIVA(false)
                      }}>Monotributista social</span>
                      <span className='selectorItem' onClick={()=>{
                        setCondicionIVA('IVA No alcanzado')
                        setSubmenuCondicionIVA(false)
                      }}>IVA No alcanzado</span>
                    </div>
                    :
                    <></>
                  }
                </div>

                {/** */}
              </div>
            </div>
            
            <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
              <span>Localidad/Provincia</span>
              <input style={{height:32,border:"1px solid black"}} type='text'/>
            </div>

            <div style={{width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:15,boxSizing:"border-box"}}>
              <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                <span>Domicilio</span>
                <input style={{height:32,border:"1px solid black"}} type='text'/>
              </div>
              <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                <span>Codigo Postal</span>
                <input style={{height:32,border:"1px solid black"}} type='text'/>
              </div>

              <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                <span>Correo Electronico</span>
                <input style={{height:32,border:"1px solid black"}} type='text'/>
              </div>
              <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                <span>Celular</span>
                <input style={{height:32,border:"1px solid black"}} type='text'/>
              </div>

              <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                <span>Telefono 1</span>
                <input style={{height:32,border:"1px solid black"}} type='text'/>
              </div>
              <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                <span>Telefono 2</span>
                <input style={{height:32,border:"1px solid black"}} type='text'/>
              </div>
            </div>
              <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:10}}>
                <div style={{width:"60%",borderRadius:5,padding:"11px 0px",textAlign:"center",cursor:"pointer",backgroundColor:"green"}}>Aceptar</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewClient