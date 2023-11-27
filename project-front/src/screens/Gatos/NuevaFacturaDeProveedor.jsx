/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AppContext } from '../../context/AppContext';
import { SlArrowDown } from "react-icons/sl";
import { BsFillPersonPlusFill,BsPlusCircle } from "react-icons/bs";
import NewClient from '../Contactos/NewClient';
import { tiposDeCobranzas } from '../../data/data';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const NuevaFacturaDeProveedor = () => {

  const { proveedores,productos,facturasDeProveedores,setFacturasDeProveedores,ordenarFechas } = useContext(AppContext);

  const navigate = useNavigate();

  const [ proveedorSearchBy,setProveedorSearchBy ] = useState('Nombre');
  const [ openSubmenuSearch,setOpenSubmenuSeacrh ] = useState(false);
  const [ productSearchBy,setProductSearchBy ] = useState('Nombre');
  const [ selectedUser,setSelectedUser ] = useState(null)
  const [ searchTerm1,setSearchTerm1 ] = useState('')
  const [ openInputClient,setOpenInputClient ] = useState(false);
  const [ usersFilter,setUsersFilter ] = useState([])
  const [newClient,setNewClient] = useState(false);
  const [ creacion,setCreacion ] = useState(null);

  const [ nmroFactura,setNmroFactura ] = useState(0);

  const [ plazo,setPlazo ] = useState(null);
  const [ openMenuPlazo,setOpenMenuPlazo ] = useState(false);

  const handleChangeCreacion = (date) =>{
    setCreacion(date)
  }

  const [ vencimiento,setVencimiento ] = useState(null)
  const handleChangeVencimiento = (date) =>{
    setVencimiento(date)
  }

  const [ tipo,setTipo ] = useState('A')
  const [ submenutipo,setSubmenutipo ] = useState(false)

  const [ openMenuCondicion,setOpenMenuCondicion ] = useState(false);
  const [ condicion,setCondicion ] = useState(null)

  const handleChangeClient = (e) =>{
    if(e.target.value.trim() === ""){
      console.log('borrado')
      setOpenInputClient(false)
      setUsersFilter([])
      setSelectedUser(null)
    }else{
      if(proveedorSearchBy === "Nombre"){
        const updateData = proveedores.filter((item)=>item.nombre.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()));
        if(updateData.length !== 0){
          setOpenInputClient(true)
          setUsersFilter(updateData)
        }
      }
      if(proveedorSearchBy === "Identificacion"){
        const updateData = proveedores.filter((item)=>item.id.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()));
        if(updateData.length !== 0){
          setOpenInputClient(true)
          setUsersFilter(updateData)
        }
      }
      if(proveedorSearchBy === "Domicilio"){
        const updateData = proveedores.filter((item)=>item.domicilio.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()));
        if(updateData.length !== 0){
          setOpenInputClient(true)
          setUsersFilter(updateData)
        }
      }
    }
    setSearchTerm1(e.target.value)
  }

  const itemStructure = {
    id:0,
    openSubMenuItem:false,
    openSubMenuImp:false,
    item:null,
    precio:0,
    impuesto:0,
    cantidad:1,
    total:0,
    descuento:0,
    idItemInventariable:null,
    detalle:"",
    concepto:""
  }
  const [ items,setItems ] = useState([itemStructure]);


  function totalPieFactura (){
    let subtotal = 0;
    let bonificacion = 0;
    let iva21 = 0;
    let iva27 = 0;
    let iva10 = 0;
    
    items.forEach(element => {
      subtotal = subtotal + (parseInt(element.cantidad) * parseFloat(element.precio))
      bonificacion = bonificacion + ((parseInt(element.cantidad) * parseFloat(element.precio))*(parseFloat(element.descuento))/100)
      if(element.impuesto === 21){
        //
        let total = (parseInt(element.cantidad) * parseFloat(element.precio))-( ((parseInt(element.cantidad) * parseFloat(element.precio))*parseFloat(element.descuento))/100 )
        iva21 = iva21 + (total*parseFloat(element.impuesto)/100)
      }else if(element.impuesto === 10.5){
        //
        let total = (parseInt(element.cantidad) * parseFloat(element.precio))-( ((parseInt(element.cantidad) * parseFloat(element.precio))*parseFloat(element.descuento))/100 )
        iva10 = iva10 + (total*parseFloat(element.impuesto)/100)
      }else if(element.impuesto === 27){
        ///
        let total = (parseInt(element.cantidad) * parseFloat(element.precio))-( ((parseInt(element.cantidad) * parseFloat(element.precio))*parseFloat(element.descuento))/100 )
        iva27 = iva27 + (total*parseFloat(element.impuesto)/100)
      }
    });


    return(
      <div className='nuevaFactura-section' style={{flexDirection:"column",alignItems:"flex-end"}}>
       
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
            <span style={{width:200,textAlign:"right"}}>SubTotal</span>
            <span>${subtotal}</span>
          </div>
          <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
            <span style={{width:200,textAlign:"right"}}>Bonificacion</span>
            <span> - ${bonificacion}</span>
          </div>
          <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
            <span style={{width:200,textAlign:"right"}}>Subtotal</span>
            <span>${subtotal - bonificacion}</span>
          </div>
          {
            iva21 !== 0?
            <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
              <span style={{width:200,textAlign:"right"}}>IVA (21%)</span>
              <span>${iva21}</span>
            </div>
            :
            <></>
          }
          {
            iva27 !== 0?
            <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
              <span style={{width:200,textAlign:"right"}}>IVA (27%)</span>
              <span>${iva27}</span>
            </div>
            :
            <></>
          }
          {
            iva10 !== 0?
            <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
              <span style={{width:200,textAlign:"right"}}>IVA (10.5%)</span>
              <span>${iva10}</span>
            </div>
            :
            <></>
          }
          
          <div style={{width:"100%",height:"1px",backgroundColor:"black"}}></div>
          <div style={{display:"flex",gap:16,alignItems:"center",fontSize:30,justifyContent:"flex-end"}}>
            <span style={{width:100,textAlign:"center"}}>Total:</span>
            <span>${parseFloat((subtotal - bonificacion + iva21 + iva10 + iva27).toFixed(2))}</span>
          </div>
        </div>
      </div>
    )
  }

  async function sendData (){
    const id = uuidv4();
    let subtotal = 0;
    let bonificacion = 0;
    let iva21 = 0;
    let iva27 = 0;
    let iva10 = 0;
    
    items.forEach(element => {
      subtotal = subtotal + (parseInt(element.cantidad) * parseFloat(element.precio))
      bonificacion = bonificacion + ((parseInt(element.cantidad) * parseFloat(element.precio))*(parseFloat(element.descuento))/100)
      if(element.impuesto === 21){
        //
        let total = (parseInt(element.cantidad) * parseFloat(element.precio))-( ((parseInt(element.cantidad) * parseFloat(element.precio))*parseFloat(element.descuento))/100 )
        iva21 = iva21 + (total*parseFloat(element.impuesto)/100)
      }else if(element.impuesto === 10.5){
        //
        let total = (parseInt(element.cantidad) * parseFloat(element.precio))-( ((parseInt(element.cantidad) * parseFloat(element.precio))*parseFloat(element.descuento))/100 )
        iva10 = iva10 + (total*parseFloat(element.impuesto)/100)
      }else if(element.impuesto === 27){
        ///
        let total = (parseInt(element.cantidad) * parseFloat(element.precio))-( ((parseInt(element.cantidad) * parseFloat(element.precio))*parseFloat(element.descuento))/100 )
        iva27 = iva27 + (total*parseFloat(element.impuesto)/100)
      }
    });
    const obj = {
      id,
      idFactura:id,
      nmro:nmroFactura,
      total : (subtotal - bonificacion + iva21 + iva10 + iva27),
      montoPagado:0,
      montoPendiente: (subtotal - bonificacion + iva21 + iva10 + iva27),
      contactId: selectedUser.id,
      nombre:selectedUser.nombre,
      tipo:tipo,
      condicion: condicion,
      concepto: items[0].concepto,
      estado:"Pendiente",
      tipoDePlazo:plazo > 1 ? "Vencimiento estandar" : (plazo === -1 ? "Vencimiento manual" : "De Contado"),
      plazoDePago:plazo === -1 ? 0 : plazo ,
      fecha: `${creacion.getFullYear()}-${String(creacion.getMonth() + 1).padStart(2, '0')}-${String(creacion.getDate()).padStart(2, '0')}`,
      vencimiento:`${vencimiento.getFullYear()}-${String(vencimiento.getMonth() + 1).padStart(2, '0')}-${String(vencimiento.getDate()).padStart(2, '0')}`,
      items:items
    }
    //console.log(obj)
    //console.log('id,nmro,tipo,contactId,fecha,condicion,plazoDePago,vencimiento,concepto,estado,tipoDePlazo,total,montoPagado,montoPendiente,items')
    //console.log('idFactura,detalle,precio,cantidad,impuesto,bonificacion')
    
    try{
      await axios.post('http://localhost:3000/api/facturasdeproveedores',obj)
      const updateData = ordenarFechas([...facturasDeProveedores,obj]);
      console.log(updateData);
      setFacturasDeProveedores(updateData);
      navigate('/facturasDeProveedores');
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Factura de Proveedor creada!",
        showConfirmButton: false,
        timer: 1500
      });
      
    }catch(err){
      console.log(err)
    }
  }


  return (
    <>
      <div className='headerSection'>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <h1>Nueva Factura de proveedor</h1>
        </div>
      </div>
      <div style={{textAlign:"center",marginBottom:30}}>
        <div style={{display:"flex",alignItems:"center",width:"fit-content",margin:"0 auto"}}>
          <h2 style={{fontSize:30}}>No.</h2>
          <input
          value={nmroFactura}
          onChange={(e)=>{setNmroFactura(e.target.value)}}
          type='number'
          style={{height:30}}
          />
        </div>
        <div style={{width:"120px",margin:"0 auto",height:30}} className='selectorContainer'>
          <div className='selectorLabel' onClick={()=>{setSubmenutipo(!submenutipo)}}>Tipo {tipo}</div>
          {
            submenutipo === true ?
            <div className='selectorSubMenu' style={{textAlign:"start"}}>
              <span className='selectorItem' onClick={()=>{
                setTipo('A')
                setSubmenutipo(false)  
              }}>A</span>
              <span className='selectorItem' onClick={()=>{
                setTipo('B')
                setSubmenutipo(false)  
              }}>B</span>
              <span className='selectorItem' onClick={()=>{
                setTipo('C')
                setSubmenutipo(false)  
              }}>C</span>
            </div>
            :
            <></>
          }
        </div>
      </div>
      <div className='formGrid' >
        {/**/}
        <div>
          {/*-------------------------------*/}
          <div style={{display:"flex",alignItems:"center",boxSizing:"border-box",gap:2}}>
            <div style={{width:"180px",height:24.39,position:"relative",boxSizing:"border-box"}}>
              <div onClick={()=>{setOpenSubmenuSeacrh(!openSubmenuSearch)}} className='selectorLabelCont'>
                <span>{proveedorSearchBy}</span>
                <SlArrowDown style={{fontSize:12}}/>
              </div>
              {
                openSubmenuSearch === true ?
                <div className='selectorSubMenu'>
                  <div className='selectorItem' onClick={()=>{
                    setProveedorSearchBy('Nombre')
                    setOpenSubmenuSeacrh(false);
                    setSelectedUser(null);
                    setSearchTerm1('');
                  }}>Nombre</div>
                  <div className='selectorItem' onClick={()=>{
                    setProveedorSearchBy('Identificacion')
                    setOpenSubmenuSeacrh(false);
                    setSelectedUser(null);
                    setSearchTerm1('');
                  }}>Identificacion</div>
                  <div className='selectorItem' onClick={()=>{
                    setProveedorSearchBy('Domicilio')
                    setOpenSubmenuSeacrh(false);
                    setSelectedUser(null);
                    setSearchTerm1('');
                  }}>Domicilio</div>
                </div>
                :
                <></>
              }
            </div>            
            <div style={{width:"100%",position:"relative"}}>
              <input 
              type='text' 
              placeholder='buscar' 
              value={searchTerm1}
              onChange={handleChangeClient}
              style={{width:"99%"}}/>
              
              {
                openInputClient === true ?
                
                <div className='selectorSubMenu' style={{maxHeight:"120px",overflowY:"scroll"}}>
                  {
                    usersFilter.map((item,index)=>
                      <div className='selectorItem'  onClick={()=>{
                          setSearchTerm1('')
                          setOpenInputClient(false)
                          setUsersFilter([])
                          setSelectedUser(item)
                        }} 
                        key={index}>
                          {item.nombre}
                          {
                            proveedorSearchBy === "Domicilio" ?
                            <span style={{fontWeight:"500"}}> {item.domicilio}</span>
                            :
                            <></>
                          }
                          {
                            proveedorSearchBy === "Identificacion" ?
                            <span style={{fontWeight:"500"}}> {item.id}</span>
                            :
                            <></>
                          }  
                      </div>
                    )
                  }
                  
                </div>
                :
                <></>
              }
            </div>
          </div>

          {
            selectedUser === null ?
            <></>
            :
            <div>
              
              <div>Nombre: {selectedUser.nombre}</div>
              <div>{selectedUser.idType} {selectedUser.id}</div>
              <div>Domicilio: {selectedUser.domicilio}</div>
            </div>
          }
          {/** */}
          <div onClick={()=>{
            setNewClient(true)
            setSelectedUser(null);
            setSearchTerm1('')
            }} style={{display:"flex",width:"fit-content",marginTop:20 ,alignItems:"center",border:"1px solid black",padding:"7px 20px",gap:10,cursor:"pointer"}}>
            <BsFillPersonPlusFill/>
            <span>
              Agregar nuevo cliente
            </span>
          </div>
          {/*-------------------------------*/}
        </div>
        {/***/}
        <div style={{display:"flex",flexDirection:"column",gap:10, width:"90%",alignItems:"flex-end"}}>
          <div className='formGidRow'>
            <span>Creacion</span>
            <DatePicker
              selected={creacion}
              onChange={handleChangeCreacion}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className='formGidRow'>
            <span>Vencimiento</span>
            <DatePicker
              selected={vencimiento}
              onChange={handleChangeVencimiento}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className='formGrid' style={{alignItems:"center",justifyContent:"flex-end"}}>
            <span style={{width:"100%",textAlign:"end"}}>Condicion</span>
            <div style={{width:"200px",height:28}} className='selectorContainer'>
              <div onClick={()=>{setOpenMenuCondicion(!openMenuCondicion)}} className='selectorLabel'>{condicion === null ? <>Seleccionar</> : <>{condicion}</>}</div>
              {
                openMenuCondicion === true ?
                <div className='selectorSubMenu'>
                  <span className='selectorItem' onClick={()=>{
                    setCondicion('Contado')
                    setOpenMenuCondicion(false)
                  }}>Contado</span>
                  <span className='selectorItem' onClick={()=>{
                    setCondicion('Tarjeta de Credito')
                    setOpenMenuCondicion(false)
                  }}>Tarjeta de Credito</span>
                  <span className='selectorItem' onClick={()=>{
                    setCondicion('Tarjeta de Debito')
                    setOpenMenuCondicion(false)
                  }}>Tarjeta de Debito</span>
                  <span className='selectorItem' onClick={()=>{
                    setCondicion('Deposito')
                    setOpenMenuCondicion(false)
                  }}>Deposito</span>
                  <span className='selectorItem' onClick={()=>{
                    setCondicion('Transferencia')
                    setOpenMenuCondicion(false)
                  }}>Transferencia</span>
                </div>
                :
                <></>
              }
            </div>
          </div>
          <div className='formGrid' style={{alignItems:"center",justifyContent:"flex-end"}}>
            <span style={{width:"100%",textAlign:"end"}}>Plazo de pago</span>
            <div style={{width:"200px",height:28}} className='selectorContainer'>
              <div onClick={()=>{setOpenMenuPlazo(!openMenuPlazo)}} className='selectorLabel'>
                {plazo === null ? <>Seleccionar</> : (plazo > 0 ? <>Plazo {plazo}</> : (plazo === 0 ? <>De contado</> : <>Vencimiento manual</>) )}
              </div>
              {
                openMenuPlazo === true ?
                <div className='selectorSubMenu'>
                  <span className='selectorItem' onClick={()=>{
                    setPlazo(0)
                    setOpenMenuPlazo(false)
                  }}>De contado</span>
                  <span className='selectorItem' onClick={()=>{
                    setPlazo(8)
                    setOpenMenuPlazo(false)
                  }}>8 dias</span>
                  <span className='selectorItem' onClick={()=>{
                    setPlazo(10)
                    setOpenMenuPlazo(false)
                  }}>10 dias</span>
                  <span className='selectorItem' onClick={()=>{
                    setPlazo(15)
                    setOpenMenuPlazo(false)
                  }}>15 dias</span>
                  <span className='selectorItem' onClick={()=>{
                    setPlazo(30)
                    setOpenMenuPlazo(false)
                  }}>30 dias</span>
                  <span className='selectorItem' onClick={()=>{
                    setPlazo(60)
                    setOpenMenuPlazo(false)
                  }}>60 dias</span>
                  <span className='selectorItem' onClick={()=>{
                    setPlazo(-1)
                    setOpenMenuPlazo(false)
                  }}>Vencimiento manual</span>
                </div>
                :
                <></>
              }
            </div>
          </div>
        </div>
      </div>
      <table className='tableFactura' style={{marginTop:30}}>
        <thead>
          <tr>
            <th style={{width:380}}>Descripcion</th>
            <th style={{width:140}}>Precio</th>
            <th style={{width:140}}>Desc%</th>
            <th style={{width:200}}>Impuesto</th>
            <th style={{width:90}}>Cantidad</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            items.map((element,index)=>
            <tr key={index}>
              <td>
                <div className='selectorContainer' style={{width:380,height:30}}>
                  <div onClick={()=>{
                    const updateData = items.map((it)=>{
                      if(it.id === element.id){
                        return {...it,openSubMenuItem:!it.openSubMenuItem,openSubMenuImp:false}
                      }
                      return {...it,openSubMenuItem:false,openSubMenuImp:false}
                    })
                    setItems(updateData)
                  }} className='selectorLabel'>{element.item === null ? <>Seleccionar</> : <>{element.item}</>}</div>
                  {
                    element.openSubMenuItem === true ?
                    <div className='selectorSubMenu' style={{height:200,overflowY:"scroll"}}>
                        <span>Productos Inventariables</span>
                        {
                          productos.map((prod,index)=>
                            <span className='selectorItem' key={index}
                              onClick={()=>{
                                const updateData = items.map((itt)=>{
                                  if(itt.id === element.id){
                                    return {...itt,item:prod.nombre,idItemInventariable:prod.id,openSubMenuItem:false,precio:prod.precioBase,impuesto:prod.impuesto,concepto:"Producto Inventariable",detalle:prod.id}
                                  }
                                  return itt
                                })
                                setItems(updateData)
                                
                              }}
                            >{prod.nombre}</span>
                          )
                        }
                        {
                          tiposDeCobranzas.map((tip)=>
                            <>
                              {
                                tip.id > 1 ?
                                <>
                                  <span>{tip.categoria}</span>
                                  {
                                    tip.items.map((tipIt,index)=>
                                      <span className='selectorItem' key={index}
                                        onClick={()=>{
                                          const updateData = items.map((itt)=>{
                                            if(itt.id === element.id){
                                              return {...itt,item:tipIt,idItemInventariable:null,openSubMenuItem:false,precio:0,impuesto:0,concepto:tip.categoria,detalle:tipIt}
                                            }
                                            return itt
                                          })
                                          setItems(updateData)
                                        }}
                                      
                                      >{tipIt}</span>
                                    )
                                  }
                                </>
                                :
                                <></>
                              }
                            </>
                          )
                        }
                    </div>
                    :
                    <></>
                  }
                </div>
              </td>
              <td>
                <input 
                  value={element.precio}
                  onChange={(e)=>{
                    const updateData = items.map((elt)=>{
                      if(elt.id === element.id){
                        return {...elt,precio:e.target.value}
                      }
                      return elt
                    })
                    setItems(updateData)
                  }}
                  style={{width:140}} type='number'
                  min={1}
                />
              </td>
              <td>
                <input 
                  value={element.descuento}
                  min={0}
                  onChange={(e)=>{
                    const updateData = items.map((elt)=>{
                      if(elt.id === element.id){
                        return {...elt,descuento:e.target.value}
                      }
                      return elt
                    })
                    setItems(updateData)
                  }}
                  style={{width:140}} type='number'/>
              </td>
              <td>
                <div className='selectorContainer' style={{width:200,height:30}}>
                  <div className='selectorLabel'
                    onClick={()=>{
                      const updateData = items.map((itt)=>{
                        if(itt.id === element.id){
                          return {...itt, openSubMenuImp:!itt.openSubMenuImp}
                        }
                        return {...itt,openSubMenuImp:false}
                      })
                      setItems(updateData)
                    }}
                  >{element.impuesto}%</div>
                  {
                    element.openSubMenuImp === true ?
                    <div className='selectorSubMenu'>
                      <span className='selectorItem'
                        onClick={()=>{
                          const updateData = items.map((itt)=>{
                            if(itt.id === element.id){
                              return {...itt,impuesto:0,openSubMenuImp:false}
                            }
                            return itt
                          })
                          setItems(updateData);
                        }}
                      >0%</span>
                      <span className='selectorItem'
                        onClick={()=>{
                          const updateData = items.map((itt)=>{
                            if(itt.id === element.id){
                              return {...itt,impuesto:21,openSubMenuImp:false}
                            }
                            return itt
                          })
                          setItems(updateData);
                        }}
                      >21%</span>
                      <span className='selectorItem'
                        onClick={()=>{
                          const updateData = items.map((itt)=>{
                            if(itt.id === element.id){
                              return {...itt,impuesto:27,openSubMenuImp:false}
                            }
                            return itt
                          })
                          setItems(updateData);
                        }}
                      >27%</span>
                      <span className='selectorItem'
                        onClick={()=>{
                          const updateData = items.map((itt)=>{
                            if(itt.id === element.id){
                              return {...itt,impuesto:10.5,openSubMenuImp:false}
                            }
                            return itt
                          })
                          setItems(updateData);
                        }}
                      >10.5%</span>
                    </div>
                    :
                    <></>
                  }
                </div>
              </td>
              <td >
                <input 
                  onChange={(e)=>{
                    const updateData = items.map((elt)=>{
                      if(elt.id === element.id){
                        return {...elt,cantidad:e.target.value}
                      }
                      return elt
                    })
                    setItems(updateData)
                  }}
                  value={element.cantidad}
                  style={{width:90}} type='number'
                  min={1}
                />
              </td>
              <td>$ {(parseInt(element.cantidad) * parseFloat(element.precio))-( ((parseInt(element.cantidad) * parseFloat(element.precio))*parseFloat(element.descuento))/100 )}</td>
              <td>
                {
                  items.length > 1 ?
                  <button onClick={()=>{
                    const updateData = items.filter((itt)=>itt.id !== element.id)
                    setItems(updateData)
                  }}>quitar</button>
                  :
                  <></>
                }
              
              </td>
            </tr>
            )
          }
        </tbody>
      </table>
      <button onClick={()=>{
        setItems([...items, {...itemStructure,id:items.length+1}])
      }}>Agregar</button>
      <button onClick={()=>{
        console.log(items)
        console.log(items[0].concepto)
      }}>Ver</button>
      {totalPieFactura()}
      <button onClick={()=>{sendData()}}>Guardar</button>
      {
        newClient === true ?
        <NewClient
          setNewClient={setNewClient}
        />
        :
        <></>
      }
    </>
  )
}

export default NuevaFacturaDeProveedor