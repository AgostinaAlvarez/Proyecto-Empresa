

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { SlArrowDown } from "react-icons/sl";
import { LuUsers } from "react-icons/lu";
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const NewContact = ({setNewContact}) => {
  
  const { setContactos,contactos,clientes,setClientes,proveedores,setProveedores } = useContext(AppContext);

  const [ submenuIdentificacion,setSubmenuIdentificacion ] = useState(false);
  const [ submenuCondicionIVA,setSubmenuCondicionIVA ] = useState(false);
  const [typeContact,setTypeContact] = useState([{name:"proveedor",selected:false},{name:"cliente",selected:false}]);
  const [ identificacion,setIdentificacion ] = useState('');
  const [ condicionIVA,setCondicionIVA ] = useState('');

  const [ createdUContact,setCreatedContact ] = useState(false);
  const [ loading,setLoading ] = useState(false);
  const [ err,setErr ] = useState(false)

  const [ datos,setDatos ] = useState({
    id:'',idType:'', nombre:'',condicionIVA:'',localidad:'',domicilio:'',codigoPostal:'',correo:'',celular:'',telefono1:'',telefono2:''
  })


  function orderArray (data){
    const updateData = data
    updateData.sort((a, b) => {
      const nombreA = a.nombre.toUpperCase(); // Convierte a mayúsculas para ordenar sin distinción de mayúsculas/minúsculas
      const nombreB = b.nombre.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0; 
    });

    return updateData;
  }

  async function createContact (){
    const type = typeContact.filter((item)=>item.selected === true)
    let categoria;
    if(type.length === 1){
      categoria = type[0].name
    }else{
      categoria = 'Ambas'
    }

    const  obj = {...datos,categoria};
    console.log(obj)
    for (const prop in obj) {
      if (obj[prop] === "" ) {
        obj[prop] = null
      }
    }
    setLoading(true)
    try{
      const response = await axios.post('http://localhost:3000/api/createContact',obj);
      console.log(response.data);
      if(response.data.ok === true){
        const updateContactos = orderArray([...contactos,obj]);
        setContactos(updateContactos);

        if(obj.categoria === "Ambas"){
          const updateClientes = orderArray([...clientes,obj]);
          const updateProveedores = orderArray([...proveedores,obj]);
          setClientes(updateClientes);
          setProveedores(updateProveedores);
          setCreatedContact(true);
          setLoading(false);

        }else if(obj.categoria === "proveedor"){
          const updateProveedores = orderArray([...proveedores,obj]);
          setProveedores(updateProveedores);
          setCreatedContact(true);
          setLoading(false);
        }else if(obj.categoria === "cliente"){
          const updateClientes = orderArray([...clientes,obj]);
          setClientes(updateClientes);
          setCreatedContact(true);
          setLoading(false);
        }
      }else{
        setCreatedContact(true);
        setErr(true);
      }
    }catch(err){
      console.log(err)
    }

  }

  return (
    <div className='overlay'>
      {
        loading === true ?
        <div className='overlayCard'>
          <div>Loading</div>
        </div>
        :
        <>
          {
            createdUContact === false ?
            <div className='overlayCard'>
              <div style={{width:"100%",height:"55px",boxSizing:"border-box",borderBottom:"1px solid #00000031",display:"flex",alignItems:"center",padding:"0px 10px",position:"relative",gap:10,fontSize:23,justifyContent:"center"}}>
                <LuUsers/>
                <span>Nuevo contacto</span>
                <button onClick={()=>{setNewContact(false)}} style={{fontSize:16,position:"absolute",top:0,right:0,cursor:"pointer"}}>Cerrar</button>
              </div>
              <div style={{height:"calc(100% - 55px)",width:"100%",boxSizing:"border-box",overflowY:"scroll",padding:"10px 0px"}}>
    
                <div style={{boxSizing:"border-box",width:"90%",margin:"0 auto",display:"flex",flexDirection:"column",gap:15}}>
                  <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:9,marginBottom:5}}>
                    <span >Tipo de contacto</span>
                    <div style={{width:"100%",display:"flex",boxSizing:"border-box",gap:10,justifyContent:"center"}}>
                      <div style={typeContact[1].selected === false ? {width:"50%",border:"1px solid green",cursor:"pointer",boxSizing:"border-box",textAlign:"center",padding:"11px 0px"} : {width:"50%",border:"1px solid green",cursor:"pointer",boxSizing:"border-box",textAlign:"center",padding:"11px 0px",backgroundColor:"green"}}
                        onClick={()=>{
                          const updateData = typeContact.map((item)=>{
                            if(item.name === "cliente"){
                              return {...item,selected:!item.selected}
                            }
                            return item
                          })
                          setTypeContact(updateData)
                        }}
                      >
                        Cliente
                      </div>
                      <div style={typeContact[0].selected === false ? {width:"50%",border:"1px solid green",cursor:"pointer",boxSizing:"border-box",textAlign:"center",padding:"11px 0px"} : {width:"50%",border:"1px solid green",cursor:"pointer",boxSizing:"border-box",textAlign:"center",padding:"11px 0px",backgroundColor:"green"}}
                        onClick={()=>{
                          const updateData = typeContact.map((item)=>{
                            if(item.name === "proveedor"){
                              return {...item,selected:!item.selected}
                            }
                            return item
                          })
                          setTypeContact(updateData)
                        }}
                      >
                        Proveedor
                      </div>
                    </div>
                  </div>
    
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
                              setDatos({...datos,idType:'DNI'})
                              }} className='selectorItem'>DNI</span>
                            <span onClick={()=>{
                              setIdentificacion('CUIT')
                              setSubmenuIdentificacion(false)
                              setDatos({...datos,idType:'CUIT'})
                              }} className='selectorItem'>CUIT</span>
                            <span onClick={()=>{
                              setIdentificacion('Pasaporte')
                              setSubmenuIdentificacion(false)
                              setDatos({...datos,idType:'Pasaporte'})
                              }} className='selectorItem'>Pasaporte</span>
                            <span onClick={()=>{
                              setIdentificacion('CDI')
                              setSubmenuIdentificacion(false)
                              setDatos({...datos,idType:'CDI'})
                              }} className='selectorItem'>CDI</span>
                            <span onClick={()=>{
                              setIdentificacion('Otra Identificacion')
                              setSubmenuIdentificacion(false)
                              setDatos({...datos,idType:'Otra'})
                              }} className='selectorItem'>Otra Identificacion</span>
                          </div>
                          :
                          <></>
                        }
                      </div>
                    </div>
                    
                    <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                      <span>Identificacion</span>
                      <input 
                      value={datos.id}
                      onChange={(e)=>{setDatos({...datos,id:e.target.value})}}
                      style={{height:32,border:"1px solid black"}} 
                      type='text'/>
                    </div>
    
                    <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                      <span>Nombre</span>
                      <input 
                      value={datos.nombre}
                      onChange={(e)=>{setDatos({...datos,nombre:e.target.value})}}
                      style={{height:32,border:"1px solid black"}} 
                      type='text'/>
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
                              setDatos({...datos,condicionIVA:'Monotributo'})
                            }}>Monotributo</span>
                            <span className='selectorItem' onClick={()=>{
                              setCondicionIVA('IVA responsable inscripto')
                              setSubmenuCondicionIVA(false)
                              setDatos({...datos,condicionIVA:'IVA responsable inscripto'})
                            }}>IVA responsable inscripto</span>
                            <span className='selectorItem' onClick={()=>{
                              setCondicionIVA('IVA responsable no inscripto')
                              setSubmenuCondicionIVA(false)
                              setDatos({...datos,condicionIVA:'IVA responsable no inscripto'})
                            }}>IVA responsable no inscripto</span>
                            <span className='selectorItem' onClick={()=>{
                              setCondicionIVA('IVA sujeto externo')
                              setSubmenuCondicionIVA(false)
                              setDatos({...datos,condicionIVA:'IVA sujeto externo'})
                            }}>IVA sujeto externo</span>
                            <span className='selectorItem' onClick={()=>{
                              setCondicionIVA('Consumidor final')
                              setSubmenuCondicionIVA(false)
                              setDatos({...datos,condicionIVA:'Consumidor final'})
                            }}>Consumidor final</span>
                            <span className='selectorItem' onClick={()=>{
                              setCondicionIVA('Proveedor del exterior')
                              setSubmenuCondicionIVA(false)
                              setDatos({...datos,condicionIVA:'Proveedor del exterior'})
                            }}>Proveedor del exterior</span>
                            <span className='selectorItem' onClick={()=>{
                              setCondicionIVA('Cliente del exterior')
                              setSubmenuCondicionIVA(false)
                              setDatos({...datos,condicionIVA:'Cliente del exterior'})
                            }}>Cliente del exterior</span>
                            <span className='selectorItem' onClick={()=>{
                              setCondicionIVA('IVA Liberado - Ley 19.640')
                              setSubmenuCondicionIVA(false)
                              setDatos({...datos,condicionIVA:'IVA Liberado - Ley 19.640'})
                            }}>IVA Liberado - Ley 19.640</span>
                            <span className='selectorItem' onClick={()=>{
                              setCondicionIVA('Monotributista social')
                              setSubmenuCondicionIVA(false)
                              setDatos({...datos,condicionIVA:'Monotributista social'})
                            }}>Monotributista social</span>
                            <span className='selectorItem' onClick={()=>{
                              setCondicionIVA('IVA No alcanzado')
                              setSubmenuCondicionIVA(false)
                              setDatos({...datos,condicionIVA:'IVA No alcanzado'})
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
                    <input 
                    value={datos.localidad}
                    onChange={(e)=>{setDatos({...datos,localidad:e.target.value})}}
                    style={{height:32,border:"1px solid black"}}
                    type='text'
                    />
                  </div>
    
                  <div style={{width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr",gap:15,boxSizing:"border-box"}}>
                    <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                      <span>Domicilio</span>
                      <input 
                      value={datos.domicilio}
                      onChange={(e)=>{setDatos({...datos,domicilio:e.target.value})}}
                      style={{height:32,border:"1px solid black"}}
                      type='text'
                      />
                    </div>
                    <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                      <span>Codigo Postal</span>
                      <input 
                      value={datos.codigoPostal}
                      onChange={(e)=>{setDatos({...datos,codigoPostal:e.target.value})}}
                      style={{height:32,border:"1px solid black"}}
                      type='text'
                      />
                    </div>
    
                    <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                      <span>Correo Electronico</span>
                      <input 
                      value={datos.correo}
                      onChange={(e)=>{setDatos({...datos,correo:e.target.value})}}
                      style={{height:32,border:"1px solid black"}}
                      type='text'
                      />
                    </div>
                    <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                      <span>Celular</span>
                      <input 
                      value={datos.celular}
                      onChange={(e)=>{setDatos({...datos,celular:e.target.value})}}
                      style={{height:32,border:"1px solid black"}}
                      type='text'
                      />
                    </div>
    
                    <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                      <span>Telefono 1</span>
                      <input 
                      value={datos.telefono1}
                      onChange={(e)=>{setDatos({...datos,telefono1:e.target.value})}}
                      style={{height:32,border:"1px solid black"}}
                      type='text'
                      />
                    </div>
                    <div style={{width:"100%",boxSizing:"border-box",display:"flex",flexDirection:"column",gap:5}}>
                      <span>Telefono 2</span>
                      <input 
                      value={datos.telefono2}
                      onChange={(e)=>{setDatos({...datos,telefono2:e.target.value})}}
                      style={{height:32,border:"1px solid black"}}
                      type='text'
                      />
                    </div>
                  </div>
                    <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:10}}>
                      <div onClick={()=>{createContact()}} style={{width:"60%",borderRadius:5,padding:"11px 0px",textAlign:"center",cursor:"pointer",backgroundColor:"green"}}>Aceptar</div>
                    </div>
                </div>
              </div>
            </div>
            :
            <>
              {
                err === true ?
                <div className='overlayCard'>
                  <div>Hubo un error</div>
                  <button>Volver a intentar</button>
                  <button onClick={()=>{setNewContact(false)}} >Cerrar</button>
                </div>
                :
                <div className='overlayCard'>
                  <div>Contacto creado</div>
                  <button onClick={()=>{setNewContact(false)}}>Aceptar</button>
                </div>
              }
            </>
          }
        </> 
      }
    </div>
  )
}

export default NewContact