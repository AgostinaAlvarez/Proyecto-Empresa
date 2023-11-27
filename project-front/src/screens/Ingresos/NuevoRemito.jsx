/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { SlArrowDown } from "react-icons/sl";
import { AppContext } from '../../context/AppContext';
import { BsFillPersonPlusFill,BsPlusCircle } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NewClient from '../Contactos/NewClient';
import { FiPlus } from "react-icons/fi";
import Swal from 'sweetalert2'


const NuevoRemito = () => {
  const { clientes,vendedores,productos,remitos,setRemitos,ordenarFechas } = useContext(AppContext);
  const navigate = useNavigate();
  const [newClient,setNewClient] = useState(false);
  const [ usersFilter,setUsersFilter ] = useState([])
  const [ openSubmenuSearch,setOpenSubmenuSeacrh ] = useState(false);
  const [ clientSearchBy,setClienteSearchBy ] = useState('Nombre');
  const [ selectedUser,setSelectedUser ] = useState(null)
  const [ searchTerm1,setSearchTerm1 ] = useState('')
  const [ openInputClient,setOpenInputClient ] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [ submenuTipo,setSubmenuTipo ] = useState(false);
  const [submenuConcepto,setSubmenuConcepto] = useState(false);
  const [ tipo,setTipo ] = useState('Seleccionar');

  
  const [ vencimiento,setVencimiento ] = useState(null);
  const handleVencimientoChange = (date) =>{
    setVencimiento(date)
  };


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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [ vendedoresFilter,setVendedoresFilter ] = useState([]);
  const [ selectedVendedor,setSelectedVendedor ] = useState(null);
  const [ openInputVendedor,setOpenInputVendedor ] = useState(false);
  const [ searchTermV,setSearchTermV ] = useState('')

  const handleChangeVendedor = (e) =>{
    if(e.target.value.trim() === ""){
      console.log('borrado')
      setOpenInputVendedor(false)
      setVendedoresFilter([])
      setSelectedVendedor(null)
    }else{
        const updateData = vendedores.filter((item)=>item.nombre.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()));
        if(updateData.length !== 0){
          setOpenInputVendedor(true)
          setVendedoresFilter(updateData)
        }
      
    }
    setSearchTermV(e.target.value)
  }
  
  const [ openSubMenuProduct,setOpenSubMenuProduct ] = useState(false);
  const [ productSearchBy,setProductSearchBy ] = useState('Nombre');
  const [ selectedProduct,setSelectedProduct ] = useState(null)
  const [ searchTerm2,setSearchTerm2 ] = useState('')
  const [ openInputProduct,setOpenInputProduct ] = useState(false);
  const [ productsFilter,setProducstFilter ] = useState([])
  const [ selectedProducts,setSelectedProducts ] = useState([])

  const [ direccion,setDireccion ] = useState('')

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
            <span>${parseFloat((subtotal).toFixed(2))}</span>
          </div>
          <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
            <span style={{width:200,textAlign:"right"}}>Bonificacion</span>
            <span> - ${bonificacion}</span>
          </div>
          <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
            <span style={{width:200,textAlign:"right"}}>Subtotal</span>
            <span>${parseFloat((subtotal - bonificacion).toFixed(2))}</span>
          </div>
          {
            iva21 !== 0?
            <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
              <span style={{width:200,textAlign:"right"}}>IVA (21%)</span>
              <span>${parseFloat((iva21).toFixed(2))}</span>
            </div>
            :
            <></>
          }
          {
            iva27 !== 0?
            <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
              <span style={{width:200,textAlign:"right"}}>IVA (27%)</span>
              <span>${parseFloat((iva27).toFixed(2))}</span>
            </div>
            :
            <></>
          }
          {
            iva10 !== 0?
            <div style={{display:"flex",gap:30,alignItems:"center",fontSize:18}}>
              <span style={{width:200,textAlign:"right"}}>IVA (10.5%)</span>
              <span>${parseFloat((iva10).toFixed(2))}</span>
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
    
    console.log('helo')
    const id = uuidv4()
    const productosFacturados = selectedProducts.map(element => {
        return {
          idProducto : element.id,
          idRemito: id,
          cantidad : parseInt(element.cantidad),
          precio : element.precioTotal,
          bonificacion : parseInt(element.bonif),
          impuesto: element.IVA,
          descripcion:null,
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
      id:id,
      vendedorId: selectedVendedor.id,
      contactId: selectedUser.id,
      creacion: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
      vencimiento: `${vencimiento.getFullYear()}-${String(vencimiento.getMonth() + 1).padStart(2, '0')}-${String(vencimiento.getDate()).padStart(2, '0')}`,
      concepto: tipo, // almacena "productos","servicios" o "productos y servicios"
      almacenId:"1",
      total : parseFloat((subtotal - bonificacion + iva21 + iva10 + iva27).toFixed(2)),
      direccion:direccion
    }

    const data = {...obj,productos : productosFacturados}

    console.log(data)

    try{
      await axios.post('http://localhost:3000/api/nuevoRemito',data)
      
      navigate('/remitos')
      const updateArray = ordenarFechas([...remitos,{
        concepto:tipo,
        fecha:`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
        creacion: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
        estado: "No facturado",
        id:selectedUser.id,
        idRemito:id,
        nombre: selectedUser.nombre,
        total: parseFloat((subtotal - bonificacion + iva21 + iva10 + iva27).toFixed(2)),
        vencimiento:  `${vencimiento.getFullYear()}-${String(vencimiento.getMonth() + 1).padStart(2, '0')}-${String(vencimiento.getDate()).padStart(2, '0')}`
      }])
      setRemitos(updateArray)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Remito creado!",
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
          <h1>Nuevo Remito</h1>
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
        <div style={{display:"flex",gap:5,alignItems:"flex-end",border:"1px solid blue"}}>
          <span style={{fontWeight:700,fontSize:23}}>No.</span><span>00001-</span>
        </div>
      </div>
      <div className='nuevaFactura-section' style={{marginTop:20}}>
        <div style={{border:"1px solid black",width:"50%",display:"flex",gap:15,boxSizing:"border-box",flexDirection:"column"}}>
          <div style={{fontSize:19,fontWeight:"700"}}>Datos del cliente</div>
          <div style={{display:"flex",alignItems:"center",boxSizing:"border-box",gap:2}}>
            
            <div style={{width:"180px",height:24.39,position:"relative",border:"1px solid green",boxSizing:"border-box"}}>
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
            {/** */}
            
            <div style={{width:"100%",border:"1px solid green",position:"relative"}}>
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
      
      <div className='nuevaFactura-section' style={{marginTop:20,justifyContent:"center"}}>
        <div style={{border:"1px solid violet", width:"100%",display:'flex',flexDirection:"column",gap:20}}>
          <div style={{fontSize:19,fontWeight:"700"}}>Datos de la entrega</div>
          <div style={{display:"flex",alignItems:"center",gap:10,width:"100%"}}>
            <span style={{width:200,textAlign:"end"}}>Vendedor</span>
            <div style={{width:"calc(100% - 300px)",position:"relative"}}>
              <input
                value={searchTermV}
                onChange={handleChangeVendedor}
                style={{width:"100%"}}
              />
              {
                openInputVendedor === true ?
                <div className='selectorSubMenu'>
                  {
                    vendedoresFilter.length === 0 ?
                    <></>
                    :
                    <>
                      {
                        vendedoresFilter.map((item,index)=>
                          <span className='selectorItem' key={index}
                          onClick={()=>{
                            setSelectedVendedor(item)
                            setSearchTermV(item.nombre)
                            setOpenInputVendedor(false)
                          }}
                          
                          >{item.nombre}</span>
                        )
                      }
                    </>
                  }
                </div>
                :
                <></>
              }
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:10,width:"100%"}}>
            <span style={{width:200,textAlign:"end"}}>Direccion de entrega</span>
            <input 
            value={direccion}
            onChange={(e)=>{setDireccion(e.target.value)}}
            style={{width:"calc(100% - 300px)"}}/>
          </div>
        </div>
      </div>
      {/*PRODUCTOS*/}

      <div className='nuevaFactura-section' style={{marginTop:20,flexDirection:"column"}}>
        <div style={{border:"1px solid black",width:"80%",display:"flex",gap:15,boxSizing:"border-box",flexDirection:"column"}}>
          <div style={{fontSize:19,fontWeight:"700"}}>Productos</div>
          <div style={{display:"flex",alignItems:"center",boxSizing:"border-box",gap:2}}>
            
            <div style={{width:"180px",height:24.39,position:"relative",border:"1px solid green",boxSizing:"border-box"}}>
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
            <div style={{width:"100%",border:"1px solid green",position:"relative"}}>
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
                          setSelectedProduct({...item,cantidad:1,bonif:0,subtotal:0,total: item.precioTotal,submenu:false,IVA:0,stock:item.cantidad});
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
                  <td>${parseFloat((item.precioTotal).toFixed(2))}</td>
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
                    style={{width:"55px"}} type='number'/>
                  
                  </td>
                  <td>
                    <div style={{width:170,height:30,backgroundColor:"red"}} className='selectorContainer'>
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
                    style={{width:"55px"}} type='number'/>
                  </td>
                  <td>$ {parseFloat(((item.cantidad * item.precioTotal)-(((item.cantidad * item.precioTotal)* item.bonif) / 100)).toFixed(2))}</td>
                  <td><button>Quitar</button></td>
                </tr>
                )
              }
              </tbody>
            </table>
            {
              
              selectedProducts.length !== 0 ?
              <>{totalPieFactura()}</>
              :
              <></>
              
            }
            {
              /*
              
              */
            }
            <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:"30px 0px"}}>
                <div onClick={()=>{
                  sendData()
                }} style={{border:"1px solid black",cursor:"pointer"}}>Guardar</div>
            </div>
            </>
            :
            <></>
          }
      {/*--------------------------------------*/}
      {
        /*
          <div className='nuevaFactura-section' style={{marginTop:20}}>
            <div style={{width:"100%",border:"1px solid violet",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,justifyContent:"center",padding:"10px 20px",backgroundColor:"green"}}>
                <FiPlus/><span>Agregar Factura</span>
              </div>
            </div>
          </div>
        */
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

export default NuevoRemito