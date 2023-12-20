/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { SlArrowDown } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsFillPersonPlusFill,BsPlusCircle } from "react-icons/bs";
import NewClient from '../Contactos/NewClient';
import { AppContext } from '../../context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from "react-icons/fi";
import Swal from 'sweetalert2'


const NuevaFactura = ({propiedad,contacto,productosF,remito,setOpen}) => {
  
  const [newClient,setNewClient] = useState(false);
  const navigate = useNavigate()
  const { facturas,setFacturas,clientes,productos,setProductos,numeracionFacturas,setNumeracionFacturas,remitos,setRemitos,ordenarFechas } = useContext(AppContext);
  const [ usersFilter,setUsersFilter ] = useState([])
  const [ searchTerm1,setSearchTerm1 ] = useState('')
  const [ selectedUser,setSelectedUser ] = useState(null)
  const handleChangeClient = (e) =>{
    if(e.target.value.trim() === ""){
      console.log('borrado')
      setOpenInputClient(false)
      setUsersFilter([])
      setSelectedUser(null)
    }else{
      if(clientSearchBy === "Nombre"){
        const updateData = clientes.filter((item)=>item.nombre.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()));
        if(updateData.length !== 0){
          setOpenInputClient(true)
          setUsersFilter(updateData)
        }
      }
      if(clientSearchBy === "Identificacion"){
        const updateData = clientes.filter((item)=>item.id.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()));
        if(updateData.length !== 0){
          setOpenInputClient(true)
          setUsersFilter(updateData)
        }
      }
      if(clientSearchBy === "Domicilio"){
        const updateData = clientes.filter((item)=>item.domicilio.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()));
        if(updateData.length !== 0){
          setOpenInputClient(true)
          setUsersFilter(updateData)
        }
      }
    }
    setSearchTerm1(e.target.value)
  }
  const [ productsFilter,setProducstFilter ] = useState([])
  const [ searchTerm2,setSearchTerm2 ] = useState('')
  const [ selectedProduct,setSelectedProduct ] = useState(null)
  const [ selectedProducts,setSelectedProducts ] = useState([])

  const handleChangeProducts = (e) =>{
    if(e.target.value.trim() === ""){
      console.log('borrado')
      setOpenInputProduct(false)
      setProducstFilter([])
      setSelectedProduct(null)
      //setSelectedProducts([])
    }else{
      if(productSearchBy === "Nombre"){
        const updateData = productos.filter((item)=>item.nombre.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()));
        if(updateData.length !== 0){
          setOpenInputProduct(true)
          console.log(updateData)
          setProducstFilter(updateData)
          
        }
      }
      if(productSearchBy === "Id"){
        const updateData = productos.filter((item)=>item.id.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()));
        if(updateData.length !== 0){
          setOpenInputProduct(true)
          setProducstFilter(updateData)
        }
      }
    }
    setSearchTerm2(e.target.value)
  }
  const [ categoria,setCategoria ] = useState('A');
  const [ numeracion,setNumeracion ] = useState("")
  const [ submenuCategoria,setSubmenuCategoria ] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [ vencimiento,setVencimiento ] = useState(null);
  const handleVencimientoChange = (date) =>{
    setVencimiento(date)
  };
  const [ concepto,setConcepto ] = useState('Seleccionar');
  const [submenuConcepto,setSubmenuConcepto] = useState(false);
  const [ plazo,setPlazo ] = useState(null);
  const [ submenuPlazo,setSubmenuPlazo ] = useState(false);
  const [ tipo,setTipo ] = useState('Seleccionar');
  const [ submenuTipo,setSubmenuTipo ] = useState(false);
  const [ clientSearchBy,setClienteSearchBy ] = useState('Nombre');
  const [ openSubmenuSearch,setOpenSubmenuSeacrh ] = useState(false);
  const [ productSearchBy,setProductSearchBy ] = useState('Nombre');
  const [ openSubMenuProduct,setOpenSubMenuProduct ] = useState(false);
  const [ openInputProduct,setOpenInputProduct ] = useState(false);
  const [ openInputClient,setOpenInputClient ] = useState(false);

  useEffect(() => {
    
    console.log(numeracionFacturas)
    console.log(numeracionFacturas[0].A.length)
    if(numeracionFacturas[0].A.length !== 8){
      const ceros = 8 - numeracionFacturas[0].A.length;
      console.log(ceros)
      let numero  = ""
      for (let index = 0; index < ceros; index++) {
        numero = numero + "0"
      }

      console.log(numero + numeracionFacturas[0].A);
      console.log((numero + numeracionFacturas[0].A).length)
      setNumeracion(numero + numeracionFacturas[0].A)
    }
  }, [])

  
  
  
  function changeFacturaType (typ){
    if(typ === "A"){
      console.log('cambiando')
      const lastNmro = numeracionFacturas[0].A;
      console.log(lastNmro.length)
      if(lastNmro.length !== 8){
        const ceros = 8 - lastNmro.length;
        let numero = ""
        for (let index = 0; index < ceros; index++) {
          numero = numero + "0"
        }
        setNumeracion((numero + lastNmro))
      }
    }else if(typ === "B"){
      console.log('cambiando')
      const lastNmro = numeracionFacturas[0].B;
      if(lastNmro.length !== 8){
        const ceros = 8 - lastNmro.length;
        let numero = ""
        for (let index = 0; index < ceros; index++) {
          numero = numero + "0"
        }
        setNumeracion((numero + lastNmro))
      }
    }else if(typ === "C"){
      console.log('cambiando')
      const lastNmro = numeracionFacturas[0].C;
      if(lastNmro.length !== 8){
        const ceros = 8 - lastNmro.length;
        let numero = ""
        for (let index = 0; index < ceros; index++) {
          numero = numero + "0"
        }
        setNumeracion((numero + lastNmro))
      }
    }
  }
  function totalPieFactura (){
    let subtotal = 0;
    let bonificacion = 0;
    let iva21 = 0;
    let iva27 = 0;
    let iva10 = 0;
    
    const updateData = selectedProducts.map((item)=>{
      return {...item,IVAPes : ((  ( (item.cantidad * item.precioTotal) - (((item.cantidad * item.precioTotal)* item.bonif) / 100)  )* item.IVA)/ 100)}
    })
    
    updateData.forEach((element)=>{
      subtotal = subtotal + (element.precioTotal * element.cantidad)
      bonificacion = bonificacion + (((element.cantidad * element.precioTotal)* element.bonif) / 100)
      if(element.IVA === 21){
        iva21 = parseFloat((iva21 + element.IVAPes).toFixed(2))
      }else if(element.IVA === 27){
        iva27 = parseFloat((iva27 + element.IVAPes).toFixed(2))
      }else if(element.IVA === 10.5){
        iva10 = parseFloat((iva10 + element.IVAPes).toFixed(2))
      }
    })



    return(
      <div className='nuevaFactura-section' style={{flexDirection:"column",alignItems:"flex-end"}}>
       
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
            <span style={{width:200,textAlign:"right"}}>SubTotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
            <span style={{width:200,textAlign:"right"}}>Bonificacion</span>
            <span> - ${bonificacion.toFixed(2)}</span>
          </div>
          <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
            <span style={{width:200,textAlign:"right"}}>Subtotal</span>
            <span>${(subtotal - bonificacion).toFixed(2)}</span>
          </div>
          {
            iva21 !== 0?
            <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
              <span style={{width:200,textAlign:"right"}}>IVA (21%)</span>
              <span>${iva21.toFixed(2)}</span>
            </div>
            :
            <></>
          }
          {
            iva27 !== 0?
            <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
              <span style={{width:200,textAlign:"right"}}>IVA (27%)</span>
              <span>${iva27.toFixed(2)}</span>
            </div>
            :
            <></>
          }
          {
            iva10 !== 0?
            <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
              <span style={{width:200,textAlign:"right"}}>IVA (10.5%)</span>
              <span>${iva10.toFixed(2)}</span>
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
  async function sendDatos (){
    const id = uuidv4()
    const productosFacturados = selectedProducts.map(element => {
        return {
          idProducto : element.id,
          idFactura: id,
          cantidad : parseInt(element.cantidad),
          precio : element.precioTotal,
          bonificacion : parseInt(element.bonif),
          impuesto: element.IVA,
          descripcion:null,
          costo:element.costoInicial,
          productoCantidadAcualizada: (element.stock-element.cantidad)
        }
    });


    let subtotal = 0;
    let bonificacion = 0;
    let iva21 = 0;
    let iva27 = 0;
    let iva10 = 0;
    
    const updateData = selectedProducts.map((item)=>{
      return {...item,IVAPes : ((  ( (item.cantidad * item.precioTotal) - (((item.cantidad * item.precioTotal)* item.bonif) / 100)  )* item.IVA)/ 100)}
    })
    
    updateData.forEach((element)=>{
      subtotal = subtotal + (element.precioTotal * element.cantidad)
      bonificacion = bonificacion + (((element.cantidad * element.precioTotal)* element.bonif) / 100)
      if(element.IVA === 21){
        iva21 = parseFloat((iva21 + element.IVAPes).toFixed(2))
      }else if(element.IVA === 27){
        iva27 = parseFloat((iva27 + element.IVAPes).toFixed(2))
      }else if(element.IVA === 10.5){
        iva10 = parseFloat((iva10 + element.IVAPes).toFixed(2))
      }
    })


    const obj = {
      id: id,
      idFactura: id,
      tipo : categoria,
      nmro: '00001-'+numeracion,
      contactId: selectedUser.id,
      fecha: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
      condicion: concepto,
      plazoDePago: plazo === 0 || plazo === -1 ? 0 : plazo,
      vencimiento : `${vencimiento.getFullYear()}-${String(vencimiento.getMonth() + 1).padStart(2, '0')}-${String(vencimiento.getDate()).padStart(2, '0')}`,
      concepto: tipo,
      estado: 'Pendiente',
      terminosCondiciones : null,
      notas : null,
      pie: null,
      tipoDePlazo: plazo === 0 ? 'De contado' : (plazo === -1 ? 'Vencimiento manual' : 'Vencimiento estandar'),
      nmroFact: categoria === 'A' ? parseInt(numeracionFacturas[0].A)+1 : (categoria === 'B'? parseInt(numeracionFacturas[0].B)+1 : parseInt(numeracionFacturas[0].C)+1),
      total : parseFloat((subtotal - bonificacion + iva21 + iva10 + iva27).toFixed(2)),
      montoCobrado: 0,
      montoPendiente: parseFloat((subtotal - bonificacion + iva21 + iva10 + iva27).toFixed(2)),
    }

    const data = {...obj,productosFacturados : productosFacturados}

    console.log(data)
    
    
    try{
      await axios.post('http://localhost:3000/api/nuevaFactura',data);
      
      console.log('datos enviados');
      const productosActualizados = productos.map(producto => {
        const productoFacturado = productosFacturados.find(pf => pf.idProducto === producto.id);
        if (productoFacturado) {
          return { ...producto, cantidad: productoFacturado.productoCantidadAcualizada
          };
        } else {
          return producto; 
        }
      });
      setProductos(productosActualizados)
      
      if(categoria === "A"){
        const updateData = numeracionFacturas.map((item)=>{
          return {...item,A:`${parseInt(numeracionFacturas[0].A)+1}`}
        })
        setNumeracionFacturas(updateData)
      }else if(categoria === "B"){
        const updateData = numeracionFacturas.map((item)=>{
          return {...item,B:`${parseInt(numeracionFacturas[0].B)+1}`}
        })
        setNumeracionFacturas(updateData)
      }else if(categoria === "C"){
        const updateData = numeracionFacturas.map((item)=>{
          return {...item,C: `${parseInt(numeracionFacturas[0].C)+1}`}
        })
        setNumeracionFacturas(updateData)
      }

      changeFacturaType(categoria)
      const updateFacturas = ordenarFechas([...facturas,{...obj,...selectedUser}])
      setFacturas(updateFacturas)
      
      if(remito){
        await axios.post('http://localhost:3000/api/asociarRemitoFactura',{idFactura: id,idRemito:remito.idRemito})

        const updateRemitos = remitos.map((item)=>{
          if(item.id === remito.id){
            return {...item,estado:"Facturado"}
          }
          return item
        })

        setRemitos(updateRemitos)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Remito facturado!",
          showConfirmButton: false,
          timer: 1500
        });
        setOpen(false)
        navigate('/remitos')

      }else{
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Factura de venta creada!",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/facturas')
      }
      
    }catch(err){
      console.log(err)
    }
  }

  const [ addRemito,setAddRemito ] = useState(false);
  const [ remitosAsociados,setRemitosAsociados ] = useState([]);
  const [ remitoSeleccionado,setRemitoSeleccionado ] = useState(null);
  
  
  useEffect(() => {
    console.log('esta es la propiedad')
    console.log(propiedad)
    if(propiedad){
      console.log('existe la propiedad, asique voy a setear')
      console.log(contacto)
      console.log(productosF)
      console.log(remito)
      setSelectedUser(contacto)
      setSelectedProducts(productosF)
    }
  }, [])
  
  return (
    <>
      <div className='headerSection'>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {
            propiedad ?
            <h1>Factura Del Remito</h1>
            :
            <h1>Nueva Factura</h1>
          }
        </div>
      </div>
      <div className='nuevaFactura-section'>
        <div style={{display:"flex",gap: 30,alignItems:"center"}}>
          <div style={{height:100,width:100,backgroundColor:"grey",display:"flex",alignItems:"center",justifyContent:"center"}}>LOGO</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <span style={{fontSize:27}}>UserName</span>
            <span>Tel +54 2316 11111</span>
            <span>Domicilio desconocido 123</span>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
          <div style={{width:"100%",border:"1px solid black",padding:"5px 8px",position:"relative",boxSizing:"border-box"}}>
            <div onClick={()=>{setSubmenuCategoria(!submenuCategoria)}} style={{display:"flex",cursor:"pointer",alignItems:"center",justifyContent:"space-between",gap:10}}>
              <span>Factura de venta tipo {categoria}</span>
              <SlArrowDown style={{fontSize:12}}/>
            </div>
            {
              submenuCategoria === true ?
              <div style={{position:"absolute",top:"100%",left:0,zIndex:90,backgroundColor:"white",border:"1px solid black",boxSizing:"border-box",width:"100%"}}>
                <div className='selectorItem' style={categoria === "A" ? {color:"green"} : {color:"black"}} onClick={()=>{
                  setCategoria('A')
                  changeFacturaType("A")
                  setSubmenuCategoria(false)
                  }}>Factura de venta tipo A</div>
                <div className='selectorItem' style={categoria === "B" ? {color:"green"} : {color:"black"}} onClick={()=>{
                  setCategoria('B')
                  changeFacturaType("B")
                  setSubmenuCategoria(false)
                  }}>Factura de venta tipo B</div>
                <div className='selectorItem' style={categoria === "C" ? {color:"green"} : {color:"black"}} onClick={()=>{
                  setCategoria('C')
                  changeFacturaType("C")
                  setSubmenuCategoria(false)
                  }}>Factura de venta tipo C</div>
              </div>
              :
              <></>
            }
          </div>
          <div style={{display:"flex",gap:5,alignItems:"flex-end"}}>
            <span style={{fontWeight:700,fontSize:23}}>No.</span><span>00001-{numeracion}</span>
          </div>
        </div>
      </div>
      <div className='nuevaFactura-section' style={{marginTop:20}}>
        <div style={{width:"50%",display:"flex",gap:15,boxSizing:"border-box",flexDirection:"column"}}>
          <div style={{fontSize:19,fontWeight:"700"}}>Datos del cliente</div>
          {
            propiedad ?
            <>
              
              <div>
                
                <div>Nombre: {contacto.nombre}</div>
                <div>{contacto.idType} {contacto.id}</div>
                <div>Domicilio: {contacto.domicilio}</div>
                
              </div>
          
            </>
            :
            <>
              <div style={{display:"flex",alignItems:"center",boxSizing:"border-box",gap:2}}>
                
                <div style={{width:"180px",height:24.39,position:"relative",boxSizing:"border-box"}}>
                  <div onClick={()=>{setOpenSubmenuSeacrh(!openSubmenuSearch)}} className='selectorLabelCont'>
                    <span>{clientSearchBy}</span>
                    <SlArrowDown style={{fontSize:12}}/>
                  </div>
                  {
                    openSubmenuSearch === true ?
                    <div className='selectorSubMenu'>
                      <div className='selectorItem' onClick={()=>{
                        setClienteSearchBy('Nombre')
                        setOpenSubmenuSeacrh(false);
                        setSelectedUser(null);
                        setSearchTerm1('');
                      }}>Nombre</div>
                      <div className='selectorItem' onClick={()=>{
                        setClienteSearchBy('Identificacion')
                        setOpenSubmenuSeacrh(false);
                        setSelectedUser(null);
                        setSearchTerm1('');
                      }}>Identificacion</div>
                      <div className='selectorItem' onClick={()=>{
                        setClienteSearchBy('Domicilio')
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
                              setSearchTerm1(item.nombre)
                              setOpenInputClient(false)
                              setUsersFilter([])
                              setSelectedUser(item)
                            }} 
                            key={index}>
                              {item.nombre}
                              {
                                clientSearchBy === "Domicilio" ?
                                <span style={{fontWeight:"500"}}> {item.domicilio}</span>
                                :
                                <></>
                              }
                              {
                                clientSearchBy === "Identificacion" ?
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
                {/** */}
              </div>
              {/*USUARIO*/}
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
                }} style={{display:"flex",width:"fit-content",alignItems:"center",border:"1px solid black",padding:"7px 20px",gap:10,cursor:"pointer"}}>
                <BsFillPersonPlusFill/>
                <span>
                  Agregar nuevo cliente
                </span>
              </div>
            
            </>
          }
        </div>
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
            <span>Condicion</span>
            <div style={{width:"190px",position:"relative",fontSize:15,height:24.39,boxSizing:"border-box",border:"1px solid black",display:"flex",alignItems:"center"}}>
              <div onClick={()=>{
                setSubmenuConcepto(!submenuConcepto)
                setSubmenuPlazo(false)
                setSubmenuTipo(false)
                }} style={{padding:"0px 5px",width:"100%",boxSizing:"border-box",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span>{concepto}</span>
                <SlArrowDown style={{fontSize:12}}/>
              </div>
              {
                submenuConcepto === true ?
                <div style={{width:"100%",boxSizing:"border-box",position:"absolute",top:"100%",left:0,zIndex:300,backgroundColor:"white",border:"1px solid black"}}>
                  <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                    setConcepto('Contado')
                    setSubmenuConcepto(false)
                    setPlazo('Seleccionar')
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
          {
            concepto === "Contado" ?
            <div style={{display:"flex",alignItems:"center",gap:10,color:"#acacac"}}>
              <span>Plazo de pago</span>
              <div style={{width:"190px",position:"relative",fontSize:15,height:24.39,boxSizing:"border-box",border:"1px solid #acacac",display:"flex",alignItems:"center"}}>
                <div style={{padding:"0px 5px",width:"100%",boxSizing:"border-box",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>Seleccionar</span>
                  <SlArrowDown style={{fontSize:12}}/>
                </div>
              </div>
            </div>
            :
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <span>Plazo de pago</span>
              <div style={{width:"190px",position:"relative",fontSize:15,height:24.39,boxSizing:"border-box",border:"1px solid black",display:"flex",alignItems:"center"}}>
                <div onClick={()=>{
                  setSubmenuPlazo(!submenuPlazo)
                  setSubmenuConcepto(false)
                  setSubmenuTipo(false)
                  }} style={{padding:"0px 5px",width:"100%",boxSizing:"border-box",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span>{
                    plazo === null ?
                    <>Seleccionar</>
                    :
                    <>
                      {
                        plazo === 0 ?
                        <>De contado</>
                        :
                        <>
                          {
                            plazo === -1 ?
                            <>Vencimiento manual</>
                            :
                            <>
                            {plazo} dias
                            </>
                          }
                        </>
                      }
                    </>
                  }</span>
                  <SlArrowDown style={{fontSize:12}}/>
                </div>
                {
                  submenuPlazo === true ?
                  <div style={{width:"100%",boxSizing:"border-box",position:"absolute",top:"100%",left:0,zIndex:300,backgroundColor:"white",border:"1px solid black"}}>
                    <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                      setPlazo(0)
                      setSubmenuPlazo(false)
                    }}>De contado</div>
                    <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                      setPlazo(8)
                      setSubmenuPlazo(false)
                    }}>8 dias</div>
                    <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                      setPlazo(15)
                      setSubmenuPlazo(false)
                    }}>15 dias</div>
                    <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                      setPlazo(30)
                      setSubmenuPlazo(false)
                    }}>30 dias</div>
                    <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                      setPlazo(60)
                      setSubmenuPlazo(false)
                    }}>60 dias</div>
                    <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                      setPlazo(-1)
                      setSubmenuPlazo(false)
                    }}>Vencimiento manual</div>
                  </div>
                  :
                  <></>
                }
              </div>
            </div>

          }
          
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span>Vencimiento</span>
            <DatePicker
              selected={vencimiento}
              onChange={handleVencimientoChange}
              dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de la fecha
            />
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span>Concepto</span>
            <div style={{width:"190px",position:"relative",fontSize:15,height:24.39,boxSizing:"border-box",border:"1px solid black",display:"flex",alignItems:"center"}}>
              <div onClick={()=>{
                setSubmenuTipo(!submenuTipo)
                setSubmenuConcepto(false)
                setSubmenuPlazo(false)
                }} style={{padding:"0px 5px",width:"100%",boxSizing:"border-box",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span>{tipo}</span>
                <SlArrowDown style={{fontSize:12}}/>
              </div>
              {
                submenuTipo === true ?
                <div style={{width:"100%",boxSizing:"border-box",position:"absolute",top:"100%",left:0,zIndex:300,backgroundColor:"white",border:"1px solid black"}}>
                  <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                    setTipo('Productos')
                    setSubmenuTipo(false)
                  }}>Productos</div>
                  <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                    setTipo('Servicios')
                    setSubmenuTipo(false)
                  }}>Servicios</div>
                  <div style={{fontSize:15,paddingLeft:5}} className='selectorItem' onClick={()=>{
                    setTipo('Productos y Servicios')
                    setSubmenuTipo(false)
                  }}>Productos y Servicios</div>
                </div>
                :
                <></>
              }
            </div>
          </div>
        </div>
      </div>
      {/*REMITOOOOOOOOOOOOOS*/}
      
      {/*Productos*/}
      {
        propiedad ? 
        <></>
        :
        <div className='nuevaFactura-section' style={{marginTop:20,flexDirection:"column"}}>
          <div style={{width:"90%",display:"flex",gap:15,boxSizing:"border-box",flexDirection:"column"}}>
            <div style={{fontSize:19,fontWeight:"700"}}>Productos</div>
            <div style={{display:"flex",alignItems:"center",boxSizing:"border-box",gap:2}}>
              
              <div style={{width:"180px",height:24.39,position:"relative",boxSizing:"border-box"}}>
                <div onClick={()=>{setOpenSubMenuProduct(!openSubMenuProduct)}} className='selectorLabelCont'>
                  <span>{productSearchBy}</span>
                  <SlArrowDown style={{fontSize:12}}/>
                </div>
                {
                  openSubMenuProduct === true ?
                  <div className='selectorSubMenu'>
                    <div className='selectorItem' onClick={()=>{
                      setProductSearchBy('Nombre');
                      setSelectedProduct(null);
                      setSearchTerm2('')
                      setOpenSubMenuProduct(false);
                    }}>Nombre</div>
                    <div className='selectorItem' onClick={()=>{
                      setProductSearchBy('Id')
                      setSelectedProduct(null)
                      setSearchTerm2('')
                      setOpenSubMenuProduct(false);
                    }}>Id</div>
                    
                  </div>
                  :
                  <></>
                }
              </div>
              <div style={{width:"100%",position:"relative"}}>
                <input 
                  type='text' 
                  placeholder='buscar' 
                  style={{width:"99%"}}
                  value={searchTerm2}
                  onChange={handleChangeProducts}
                />
                {
                  openInputProduct === true ?
                  <div className='selectorSubMenu' style={{maxHeight:"200px",overflowY:"scroll"}}>
                    {
                      productsFilter.map((item,index)=>
                        <div onClick={()=>{
                            setSearchTerm2(`${item.nombre} - ${item.id}`)
                            //console.log({...item,cantidad:1,bonif:0,subtotal:0,total:0})
                            console.log({...item,cantidad:1,bonif:0,subtotal:0,total: item.precioTotal,submenu:false,IVA:0,stock:item.cantidad})
                            setSelectedProduct({...item,cantidad:1,bonif:0,subtotal:0,total: item.precioTotal,submenu:false,IVA:0,stock:item.cantidad,costoInial:item.costoInicial});
                            setOpenInputProduct(false)
                            setProducstFilter([])
                            
                          }} className='selectorItem' key={index}>
                          <span style={productSearchBy === "Id" ? {} : {fontWeight:"500"}}>
                            {item.nombre}
                          </span>
                          {
                            productSearchBy === "Id" ?
                            <span style={{fontWeight:"500"}}> - {item.id}</span>
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
              <div onClick={()=>{
                  if(selectedProduct !== null){
                    setSelectedProduct(null);
                    setSearchTerm2('')
                    setSelectedProducts([...selectedProducts,selectedProduct])
                  }
                }} style={{height:24.39,display:"flex",alignItems:"center",border:"1px solid black",gap:10,cursor:"pointer",padding:"0px 20px"}}>
                <BsPlusCircle/>
                <span>
                  Agregar
                </span>
              </div>
            </div>
          </div>
        </div>
      }
      
      
      {/*Tabla*/}
          {
            selectedProducts.length !== 0 ?
            <>
            <table className='tableFactura' style={{marginTop:30,marginBottom:30}}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Id</th>
                  <th>Precio Unitario</th>
                  <th>Bonif %</th>
                  <th>Impuesto</th>
                  <th>Descripcion</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
              {
                selectedProducts.map((item,index)=>
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.id}</td>
                  <td>${item.precioTotal.toFixed(2)}</td>
                  <td style={{width:"56px"}}>
                    <input 
                    value={item.bonif}
                    onChange={(e)=>{
                      const updateData = selectedProducts.map((element)=>{
                        if(element.id === item.id){
                          return {...element,bonif:e.target.value}
                        }
                        return element
                      })
                      setSelectedProducts(updateData)
                    }}
                    style={{width:"55px",height:25}} type='number'/>
                  
                  </td>
                  <td>
                    <div style={{width:170,height:30}} className='selectorContainer'>
                      <div className='selectorLabel' onClick={()=>{
                        const updateData = selectedProducts.map((element)=>{
                          if(element.id === item.id){
                            return {...element,submenu:!element.submenu}
                          }
                          return {...element,submenu:false}
                        })
                        setSelectedProducts(updateData)
                      }}>
                        {
                          item.IVA !== 0 ?
                          <>IVA ({item.IVA}%)</>
                          :
                          <>0%</>
                        }

                      </div>
                      {
                        item.submenu === true ?
                        <div className='selectorSubMenu' style={{fontSize:14}}>
                          <span className='selectorItem'
                          onClick={()=>{
                            const updateData = selectedProducts.map((element)=>{
                              if(element.id === item.id){
                                //
                                return {...element,IVA:21,submenu:false}
                              }
                              return element
                            })
                            setSelectedProducts(updateData)
                            
                          }}
                          >IVA (21%)</span>
                          <span className='selectorItem'
                          onClick={()=>{
                            const updateData = selectedProducts.map((element)=>{
                              if(element.id === item.id){
                                //
                                return {...element,IVA:27,submenu:false}
                              }
                              return element
                            })
                            setSelectedProducts(updateData)
                            
                          }}
                          >IVA (27%)</span>
                          <span className='selectorItem'
                          onClick={()=>{
                            const updateData = selectedProducts.map((element)=>{
                              if(element.id === item.id){
                                //
                                return {...element,IVA:10.5,submenu:false}
                              }
                              return element
                            })
                            setSelectedProducts(updateData)
                            
                          }}
                          >IVA (10.5%)</span>
                          <span className='selectorItem'
                          onClick={()=>{
                            const updateData = selectedProducts.map((element)=>{
                              if(element.id === item.id){
                                //
                                return {...element,IVA:0,submenu:false}
                              }
                              return element
                            })
                            setSelectedProducts(updateData)
                            
                          }}
                          >Excento de IVA (0%)</span>

                        </div>
                        :
                        <></>
                      }
                    </div>
                  </td>
                  <td> - </td>
                  <td>
                    <input
                    min={1} 
                    value={item.cantidad}
                    onChange={(e)=>{
                      const updateData = selectedProducts.map((element)=>{
                        if(element.id === item.id){
                          return {...element,
                            cantidad:e.target.value,
                          }
                        }
                        return element
                      })
                      setSelectedProducts(updateData)
                    }}
                    style={{width:"55px",height:25}} type='number'/>
                  </td>
                  <td>$ {parseFloat(((item.cantidad * item.precioTotal)-(((item.cantidad * item.precioTotal)* item.bonif) / 100)).toFixed(2))}</td>
                  <td><button>Quitar</button></td>
                </tr>
                )
              }
              </tbody>
            </table>
            <button onClick={()=>{console.log(selectedProducts)}}>Ver</button>
            {
              selectedProducts.length !== 0 ?
              <>{totalPieFactura()}</>
              :
              <></>
            }
            <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:"30px 0px"}}>
                <div onClick={()=>{sendDatos()}} style={{border:"1px solid black",cursor:"pointer"}}>Guardar</div>
            </div>
            </>
            :
            <></>
          }
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

export default NuevaFactura