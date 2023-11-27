/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState,useContext,useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SlArrowDown } from "react-icons/sl";
import { AiOutlineSearch } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import { IoCheckmark } from "react-icons/io5";
import { tiposDeCobranzas } from '../../data/data.js';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const NuevaCobranza = ({prop,selectedFactura,setOpen}) => {
  const { ingresos,setIngresos,facturas,setFacturas,cobranzas,setCobranzas,ordenarFechas,bancos,setBancos } = useContext(AppContext);
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [submenuConcepto,setSubmenuConcepto] = useState(false);
  const [ concepto,setConcepto ] = useState('Seleccionar');
  const [ submenuCuentaBancaria,setSubmenuCuentaBancaria ] = useState(false);
  const [ cuenta,setCuenta ] = useState('Seleccionar');
  const [ cobranzaPorFactura,setCobranzaPorFactura ] = useState(null)
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
      name:"Numero de factura",
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
  const ingresoStructure = {
    id:1,
    concepto: null,
    valor: 0,
    impuesto: 0,
    cantidad:0,
    //observaciones
    total:0,
    openSubMenu: false,
  }
  const [ ingresoss,setIngresoss ] = useState([ingresoStructure])
  function selectSearchType (id){
    const updateData = filters.map((item)=>{
      if(item.id === id){
        return {...item,selected:true}
      }
      return {...item,selected:false}
    })
    setFilters(updateData)
  }
  const [ conceptoCobranza,setConceptoDeCobranza ] = useState(null)
  const [ submenuconceptoCobranza, setSubmenuconceptoCobranza ] = useState(false)
  const [ submenuImpuesto,setSubmenuImpuesto ] = useState(false)
  const [ submenuFacturas,setSubmenuFacturas ] = useState(false);
  const [ facturasFilter,setFacturasFilter ] = useState([]);

  function buscarFactura (e){
    //console.log(facturas)
    if(e.target.value.trim() === ""){
      setSubmenuFacturas(false)
    }else{
      setSubmenuFacturas(true)
      const filterType = filters.find((item)=>item.selected === true);
      const tipoB = filterType.name
      if(tipoB === "Cliente"){
        const facturasFiltradas = facturas.filter((item)=>item.nombre.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()) && item.estado === "Pendiente");
        setFacturasFilter(facturasFiltradas)
      }else if(tipoB === "Tipo"){
        const facturasFiltradas = facturas.filter((item)=>item.tipo.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()) && item.estado === "Pendiente");
        setFacturasFilter(facturasFiltradas)
      }else if(tipoB === "Numero de factura"){
        const facturasFiltradas = facturas.filter((item)=>item.nmro.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()) && item.estado === "Pendiente");
        setFacturasFilter(facturasFiltradas)
      }else if(tipoB === "Creacion"){
        const facturasFiltradas = facturas.filter((item)=>item.fecha.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()) && item.estado === "Pendiente");
        setFacturasFilter(facturasFiltradas)
      }
    }
  } 

  const [ facturaSeleccionada,setFacturaSeleccionada ] = useState(null)
  const [ montoPagadoF,setMontoPagadoF ] = useState(0)
  const [ selectedBanco,setSelectedBanco ] = useState(null)

  async function sendDatos (){
    if(cobranzaPorFactura === true ){
      console.log('registramos una cobranza por factura')
      const id = uuidv4()
      const data = {
        id:id,
        idCobranza:id,
        //esto es importante cuando actualicemos los bancos
        entidad: selectedBanco.entidad,
        nmroDeCuenta:selectedBanco.nmroDeCuenta,
        total: facturaSeleccionada.total,
        fecha: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
        metodoDePago: concepto,
        ctaBancaria: selectedBanco.id, //Cuenta bancaria
        concepto: "cobro de factura de venta",
        valor: null,
        impuesto: null,
        cantidad: null,
        observaciones: null,
        notas:null,
        idFactura: facturaSeleccionada.idFactura
      }

      console.log(data)
      try{
        await axios.post('http://localhost:3000/api/cobranzas',data)
        
        const updateFacturas = facturas.map((item)=>{
          if(item.idFactura === facturaSeleccionada.idFactura){
            return {...item,estado:"Pagada",montoCobrado:facturaSeleccionada.total,montoPendiente:0}
          }
          return item
        })

        const updateCobranzas = ordenarFechas([data,...cobranzas])
        setCobranzas(updateCobranzas)
        setFacturas(updateFacturas)
        setIngresos(ingresos + data.total)
        
        const updateBancos = bancos.map((item)=>{
          if(item.id === data.ctaBancaria){
            return {...item,saldo:item.saldo+data.total}
          }
          return item
        })
        
        setBancos(updateBancos)

        if(prop){
          setOpen(false)
          navigate('/facturas')
        }else{
          navigate('/cobranzas')
        }       
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Cobranza registrada!",
          showConfirmButton: false,
          timer: 1500
        });
      }catch(err){
        console.log(err)
      }
    }else if(cobranzaPorFactura === false){
      console.log('registramos otro tipo de cobranza')
    }
  }


  useEffect(() => {
    if(prop){
      setCobranzaPorFactura(true)
      setConcepto(selectedFactura.condicion)
      setFacturaSeleccionada(selectedFactura)
    }
  }, [])
  

  return (
    <>
      <div className='headerSection'>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <h1>Nueva Cobranza</h1>
        </div>
      </div>
      
      <div className='nuevaFactura-section' style={{marginTop:20}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span>Fecha</span>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de la fecha
            />
          </div>
          
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span>Metodo de pago</span>
            <div style={{width:"300px",position:"relative",fontSize:15,height:24.39,boxSizing:"border-box",border:"1px solid black",display:"flex",alignItems:"center"}}>
              <div onClick={()=>{
                  setSubmenuCuentaBancaria(false)
                  setSubmenuConcepto(!submenuConcepto)
                }} 
                style={{padding:"0px 5px",width:"100%",boxSizing:"border-box",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span>{concepto}</span>
                <SlArrowDown style={{fontSize:12}}/>
              </div>
              {
                submenuConcepto === true ?
                <div style={{width:"100%",boxSizing:"border-box",position:"absolute",top:"100%",left:0,zIndex:300,backgroundColor:"white",border:"1px solid black"}}>
                  <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                    setConcepto('Contado')
                    setSubmenuConcepto(false)
                    const cajaChica = bancos.find((item)=>item.tipo === "caja chica");
                    setSelectedBanco(cajaChica)
                  }}>Contado</div>
                  <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                    setConcepto('Tarjeta de credito')
                    setSubmenuConcepto(false)
                  }}>Tarjeta de credito</div>
                  <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                    setConcepto('Tarjeta de debito')
                    setSubmenuConcepto(false)
                  }}>Tarjeta de debito</div>
                  <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                    setConcepto('Deposito')
                    setSubmenuConcepto(false)
                  }}>Deposito</div>
                  <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                    setConcepto('Transferencia')
                    setSubmenuConcepto(false)
                  }}>Transferencia</div>
                </div>
                :
                <></>
              }
            </div>
            
          </div>
          
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span>Cuenta Bancaria</span>
            <div style={{width:"300px",position:"relative",fontSize:15,height:24.39,boxSizing:"border-box",border:"1px solid black",display:"flex",alignItems:"center"}}>
              <div onClick={()=>{
                setSubmenuConcepto(false)
                setSubmenuCuentaBancaria(!submenuCuentaBancaria)
                }} style={{padding:"0px 5px",width:"100%",boxSizing:"border-box",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span>
                  {
                    selectedBanco === null ?
                    <>Seleccionar</>
                    :
                    <>{selectedBanco.tipo} {selectedBanco.entidad}</>
                  }
                </span>
                <SlArrowDown style={{fontSize:12}}/>
              </div>
              {
                submenuCuentaBancaria === true ?
                <div style={{width:"100%",boxSizing:"border-box",position:"absolute",top:"100%",left:0,zIndex:300,backgroundColor:"white",border:"1px solid black"}}>
                  {
                    bancos.map((item,index)=>
                    <div key={index} style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                      setSelectedBanco(item)
                      setSubmenuCuentaBancaria(false)  
                    }}>
                      {item.tipo} ({item.entidad})
                    </div>
                    )
                  }
                  
                </div>
                :
                <></>
              }
            </div>
          </div>
          
        </div>
        <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
          <div>Notas de la cobranza</div>
          <textarea style={{height:80,width:200}}></textarea>
        </div>
      </div>

      {
        prop ?
        <></>
        :
        <>
          <div style={{marginTop:30,width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20}}>
            <div style={{border:"1px solid black", padding:"20px 40px",borderRadius:10}}>
              <div>Tipo de transaccion</div>
              <div onClick={()=>{setCobranzaPorFactura(true)}} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:10,marginTop:20}}>
                <div className='selectorBox'>
                  {
                    cobranzaPorFactura === null ?
                    <></>
                    :
                    <>
                    {
                      cobranzaPorFactura === true ?
                      <IoCheckmark/>
                      :
                      <></>
                    }
                    </>
                  }
                </div>
                <div>Cobranza asociada a una factura de venta</div>
              </div>
              <div onClick={()=>{setCobranzaPorFactura(false)}} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:10,marginTop:20}}>
                <div className='selectorBox'>
                  {
                    cobranzaPorFactura === null ?
                    <></>
                    :
                    <>
                    {
                      cobranzaPorFactura === true ?
                      <></>
                      :
                      <IoCheckmark/>
                    }
                    </>
                  }
                </div>
                <div>Cobranza NO asociada a una factura de venta</div>
              </div>
            </div>
          </div>
        </>
        
      }
      {
        cobranzaPorFactura === null ?
        <></>
        :
        <>
          {
            cobranzaPorFactura === true ?
            <>
              {
                prop ?
                <></>
                :
                <>
                  <div className='filtro-container' style={{marginTop:30}}>
                    {
                      filters.map((item,index)=>
                        <div onClick={()=>{
                          setSubmenuFacturas(false)
                          setFacturasFilter([])
                          selectSearchType(item.id)
                          
                        }} key={index} className={item.selected === false ? 'filtro-item':'filtro-item-CTA'}>{item.name}</div>
                      )
                    }
                  </div>
                  <div className='filtro-search-container'>
                    <div style={{width:"75%",border:"1px solid #555555",display:"flex",alignItems:"center",justifyContent:"center",gap:5,boxSizing:"border-box",padding:"5px 0px",borderRadius:7}}>
                      <AiOutlineSearch style={{fontSize:27,marginLeft:10}}/>
                      <div className='selectorContainer' style={{width:"calc(100% - 70px)",height:25}}>
                        <input className='inp' onChange={buscarFactura} placeholder='buscar factura' style={{width:"97%",height:"100%",border:"none",paddingLeft:10,boxSizing:"border-box"}} type='text'/>
                        {
                          submenuFacturas === true ?
                          <div className='selectorSubMenu' style={{maxHeight:200, overflowY:"scroll",top:"110%"}}>
                            {
                              facturasFilter.map((item,index)=>
                                <span onClick={()=>{
                                  setFacturaSeleccionada(item)
                                  setSubmenuFacturas(false)
                                }} className='selectorItem' key={index}>{item.tipo} {item.nmro} {item.nombre} | creacion {item.fecha.slice(0, 10)} | vencimiento {item.vencimiento.slice(0,10)}</span>
                              )
                            }
                          </div>
                          :
                          <></>
                        }
                      </div>
                    </div>
                  </div>
                </>
              }

              {
                facturaSeleccionada !== null ?
                <div  style={{marginTop:20,marginBottom:50,width:"100%",border:"1px solid black",boxSizing:"border-box"}}>
                  <h3>Tipo {facturaSeleccionada.tipo}</h3>
                  <h3>{facturaSeleccionada.idFactura}</h3>
                  <h3>Nmro {facturaSeleccionada.nmro}</h3>
                  <h4>Emision: {facturaSeleccionada.fecha.slice(0, 10)}</h4>
                  <h4>Vencimiento: {facturaSeleccionada.vencimiento.slice(0, 10)}</h4>
                  <h4>Nombre: {facturaSeleccionada.nombre}</h4>
                  <h4>Condicion: {facturaSeleccionada.condicionIVA}</h4>
                  <h4>Estado: {facturaSeleccionada.estado}</h4>
                  <h4>CONDICION : {facturaSeleccionada.condicion}</h4>
                  <h4>{facturaSeleccionada.idType}: {facturaSeleccionada.id}</h4>
                  <h3>Total: ${facturaSeleccionada.total.toFixed(2)}</h3>
                  <button onClick={sendDatos}>Pagar el total</button>
                  <button>Pagar una parte</button>
                  <div>Monto de cobro</div>
                  <input type='number' min={0}
                    value={montoPagadoF}
                    onChange={(e)=>{setMontoPagadoF(e.target.value)}}
                  />
                </div>
                :
                <></>
              }
            </>
            :
            <>
              <table style={{marginTop:30}} className='tableFactura'>
                <thead>
                  <tr>
                    <th>Concepto</th>
                    <th>Valor</th>
                    <th>Impuesto</th>
                    <th>Cantidad</th>
                    <th>Observaciones</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ingresoss.map((item,index)=>
                      <tr key={index}>
                        <td style={{width:230}}>
                          <div style={{width:250,height:30}} className='selectorContainer'>
                            <div onClick={()=>{setSubmenuconceptoCobranza(!submenuconceptoCobranza)}} className='selectorLabel'>{conceptoCobranza === null ? <>Seleccionar</> : <>{conceptoCobranza}</>}</div>
                            {
                              submenuconceptoCobranza === true ?
                              <div className='selectorSubMenu' style={{height:200,overflowY:"scroll"}}>
                                {
                                  tiposDeCobranzas.map((item,index)=>
                                    <div key={index}>
                                      <div style={{fontWeight:600,boxSizing:"border-box",padding:"10px 4px"}}>{item.categoria}</div>
                                      {
                                        item.items.map((element,index)=>
                                          <div className='selectorItem' onClick={()=>{
                                            setConceptoDeCobranza(element)
                                            setSubmenuconceptoCobranza(false)
                                          }} key={index}>{element}</div>
                                        )
                                      }
                                    </div>
                                  )
                                }
                              </div>
                              :
                              <></>
                            }
                          </div>
                        </td>
                        <td style={{width:50}}>
                          <input
                          style={{height:23}} 
                          value={item.valor}
                          onChange={(e)=>{
                            const updateData = ingresoss.map((element)=>{
                              if(element.id === item.id){
                                return {...element,valor:e.target.value}
                              }
                              return element
                            })
                            setIngresoss(updateData)
                          }}
                          type='number' min={1}/>
                        
                        </td>
                        <td style={{width:180}}>
                          <div style={{height:30}} className='selectorContainer'>
                            <div onClick={()=>{setSubmenuImpuesto(!submenuImpuesto)}} className='selectorLabel'>{item.impuesto}</div>
                            {
                              submenuImpuesto === true ?
                              <div className='selectorSubMenu'>
                                <span className='selectorItem'
                                  onClick={()=>{
                                    const updateData = ingresoss.map((ingr)=>{
                                      if(ingr.id === item.id){
                                        return {...ingr,impuesto:0}
                                      }
                                      return ingr
                                    })
                                    setIngresoss(updateData)
                                    setSubmenuImpuesto(false)
                                  }}
                                >0%</span>
                                <span className='selectorItem'
                                  onClick={()=>{
                                    const updateData = ingresoss.map((ingr)=>{
                                      if(ingr.id === item.id){
                                        return {...ingr,impuesto:21}
                                      }
                                      return ingr
                                    })
                                    setIngresoss(updateData)
                                    setSubmenuImpuesto(false)
                                  }}
                                >IVA - (21%)</span>
                                <span className='selectorItem'
                                  onClick={()=>{
                                    const updateData = ingresoss.map((ingr)=>{
                                      if(ingr.id === item.id){
                                        return {...ingr,impuesto:27}
                                      }
                                      return ingr
                                    })
                                    setIngresoss(updateData)
                                    setSubmenuImpuesto(false)
                                  }}
                                >IVA - (27%)</span>
                                <span className='selectorItem'
                                  onClick={()=>{
                                    const updateData = ingresoss.map((ingr)=>{
                                      if(ingr.id === item.id){
                                        return {...ingr,impuesto:10.5}
                                      }
                                      return ingr
                                    })
                                    setIngresoss(updateData)
                                    setSubmenuImpuesto(false)
                                  }}
                                >IVA - (10.5%)</span>
                              </div>
                              :
                              <></>
                            }
                          </div>
                        </td>
                        <td style={{width:50}}>
                          <input
                            style={{height:23}} 
                            value={item.cantidad}
                            onChange={(e)=>{
                              const updateData = ingresoss.map((element)=>{
                                if(element.id === item.id){
                                  return {...element,cantidad:e.target.value}
                                }
                                return element
                              })
                              setIngresoss(updateData)
                            }}
                            type='number' min={1}/>

                        </td>
                        <td>
                          <input style={{height:23,width:"97%"}}/>
                        </td>
                        <td>
                          <span style={{fontWeight:600,fontSize:18}}>$2000</span>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
              <div className='nuevaFactura-section' style={{marginTop:20}}>
                <div>
                  <h4>Subtotal ${ingresoss[0].valor * ingresoss[0].cantidad}</h4>
                  {
                    ingresoss[0].impuesto === 0 ?
                    <></>
                    :
                    <h4>IVA ({ingresoss[0].impuesto}%) </h4>
                  }
                  <h2>Total</h2>
                </div>
              </div>
            </>
          }
        </>
      }

    </>
  )
}

export default NuevaCobranza