/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const NuevoAjusteDeInventario = ({setOverlay}) => {
  
  const { productos,ajustesDeInventario,setAjustesDeInventario,setProductos } = useContext(AppContext);
  const [ loading,setLoading ] = useState(false);
  const [ nuevoAjusteCreado,setNuevoAjusteCreado ] = useState(false)
  const [ err,setErr ] = useState(false);

  const [ openSubMenuTipo,setOpenSubMenuTipo ] = useState(false)
  
  
  const [ openInputProduct,setOpenInputProduct ] = useState(false);
  const [ productsFilter,setProducstFilter ] = useState([])
  const [ selectedProduct,setSelectedProduct ] = useState(null)
  const [ productSearchBy,setProductSearchBy ] = useState('Nombre');
  const [searchTerm,setSearchTerm] = useState('')
  //const [ searchTerm2,setSearchTerm2 ] = useState('')

 
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
    setSearchTerm(e.target.value)
  }


  const [ openSubMenuSearchType,setOpenSubMenuSearchType ] = useState(false)

  const [ typeSearch,setTypeSearch ] = useState('Nombre')

  const [ selectedProducts,setSelectedProducts ] = useState([])


  async function SendData (){
    setLoading(true)
    const date = new Date()
    
    const data = selectedProducts.map((item)=>{
      return {...item,idProducto:item.id,tipo:item.tipoDeAjuste,cantidad: item.tipoDeAjuste === "Incremento" ? (parseInt(item.cantidad) + parseInt(item.cantidadAjustada)) : (parseInt(item.cantidad) - parseInt(item.cantidadAjustada)) ,cantidadAjustada:parseInt(item.cantidadAjustada) ,fecha:`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,hora:`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
    })
    
    console.log(data)
    try{
      await axios.post('http://localhost:3000/api/ajusteDeInventario',{productosAjustados:data})
      console.log('datos enviados')
      const updateD = data.concat(ajustesDeInventario)
      const updateProducts = productos.map((item)=>{
        
        const productInclude = data.find((element)=>element.id === item.id)

        if(productInclude){
          return {...item,cantidad:productInclude.cantidad}
        }

        return item
      })
      setProductos(updateProducts);
      setAjustesDeInventario(updateD)
      setErr(false)
      setNuevoAjusteCreado(true)
      setLoading(false)
    }catch(err){
      console.log(err)
      setErr(true)
      setLoading(false)
    }
  }


  return (
    <div className='overlay'>
      {
        loading === true ?
        <div className='overlayCard' style={{width:"90%"}}>
          <div>Loading</div>
        </div>
        :
        <>
          {
            nuevoAjusteCreado === false ?
            <div className='overlayCard' style={{width:"90%"}}>
              <div className='formHeader'>
                <span>Nuevo Ajuste</span>
                <button onClick={()=>{setOverlay(false)}} style={{fontSize:16,position:"absolute",top:0,right:0,cursor:"pointer"}}>Cerrar</button>
              </div>
              <div className='formContent'>
                
                <div className='formAlign' style={{marginTop:30,border:"1px solid black",gap:10,display:"flex",flexDirection:"column"}}>
                  <div>Buscar producto</div>
                  <div style={{display:"flex",alignItems:"center",border:"1px solid violet"}}>
                    <div style={{height:27,width:150, position:"relative"}}>
                      <div className='selectorLabelCont' onClick={()=>{setOpenSubMenuSearchType(!openSubMenuSearchType)}}>
                        {productSearchBy}
                      </div>
                      {
                        openSubMenuSearchType === true ?
                        <div className='selectorSubMenu'>
                          <span className='selectorItem' onClick={()=>{
                            setProductSearchBy('Nombre')
                            setOpenSubMenuSearchType(false)
                            setSearchTerm('')
                          }}>Nombre</span>
                          <span className='selectorItem' onClick={()=>{
                            setProductSearchBy('Id')
                            setOpenSubMenuSearchType(false)
                            setSearchTerm('')
                          }}>Id</span>
                        </div>
                        :
                        <></>
                      }
                    </div>
                    <div style={{width:"100%",position:"relative",border:"1px solid green",height:25}}>
                      <input 
                      value={searchTerm}
                      onChange={handleChangeProducts}
                      style={{width:"calc(100% - 6px)"}} className='inp'/>
                      {
                        openInputProduct === true ?
                        <div className='selectorSubMenu'>
                          {
                            productsFilter.map((item,index)=>
                              <span onClick={()=>{
                                setSearchTerm(item.nombre)
                                setOpenInputProduct(false)
                                setSelectedProduct(item)
                              }} className='selectorItem' key={index}>{item.nombre}</span>
                            )
                          }
                        </div>
                        :
                        <></>
                      }
                    </div>
                    <div onClick={()=>{
                      //console.log(selectedProduct)
                      setSearchTerm('')
                      setSelectedProducts([...selectedProducts,{...selectedProduct,tipoDeAjuste:"Incremento",cantidadAjustada:0,openSubMenu:false,openSubMenuIVA:false}])
                      setSelectedProduct(null)
                    }}>Agregar</div>
                  </div>
                </div>
                <div className='formAlign' style={{marginTop:20}}>
                  <table style={{width:"100%"}}>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th style={{width:303}}>Id</th>
                        <th style={{width:80,textAlign:"center"}}>Cantidad actual</th>
                        <th>Tipo de ajuste</th>
                        <th style={{width:80,textAlign:"center"}}>Cantidad ajustada</th>
                        <th style={{width:90,textAlign:"center"}}>Cantidad Total</th>
                        <th>Costo</th>
                        <th>Precio base</th>
                        <th>Impuesto</th>
                        <th>Precio Total</th>
                        <th style={{width:70}}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        selectedProducts.length === 0?
                        <></>
                        :
                        <>
                          {
                            selectedProducts.map((item,index)=>
                              <tr key={index}>
                                <td>{item.nombre}</td>
                                <td>{item.id}</td>
                                <td style={{textAlign:"center"}}>{item.cantidad}</td>
                                <td>
                                  <div style={{height:24.39,position:"relative",width:130}}>
                                    <div className='selectorLabelCont' onClick={()=>{
                                      const updateData = selectedProducts.map((element)=>{
                                        if(element.id === item.id){
                                          return {...element,openSubMenu:!element.openSubMenu,openSubMenuIVA:false}
                                        }
                                        return {...element,openSubMenu:false,openSubMenuIVA:false}
                                      })
                                      setSelectedProducts(updateData)
                                    }}>{item.tipoDeAjuste}</div>
                                    {
                                      item.openSubMenu === true ?
                                      <div className='selectorSubMenu'>
                                        <span className='selectorItem'
                                          onClick={()=>{
                                            const updateData = selectedProducts.map((element)=>{
                                              if(element.id === item.id){
                                                return {...element,tipoDeAjuste:'Incremento',openSubMenu:false}
                                              }
                                              return {...element,openSubMenu:false}
                                            })
                                            setSelectedProducts(updateData)
                                          
                                          }}
                                        >
                                          Incremento</span>
                                        <span className='selectorItem'
                                          onClick={()=>{
                                            const updateData = selectedProducts.map((element)=>{
                                              if(element.id === item.id){
                                                return {...element,tipoDeAjuste:'Disminucion',openSubMenu:false}
                                              }
                                              return {...element,openSubMenu:false}
                                            })
                                            setSelectedProducts(updateData)
                                          
                                          }}
                                        >
                                          Disminucion</span>
                                      </div>
                                      :
                                      <></>
                                    }
                                  </div>
                                </td>
                                <td>
                                  <input 
                                  value={item.cantidadAjustada}
                                  onChange={(e)=>{
                                    const updateData = selectedProducts.map((element)=>{
                                      if(element.id === item.id){
                                        return {...element,cantidadAjustada:e.target.value}
                                      }
                                      return element
                                    })
                                    setSelectedProducts(updateData)
                                  }}
                                  style={{width:"90%"}}
                                  type='number' min={0}/>
                                </td>
                                <td style={{textAlign:"center"}}>
                                  {
                                    item.tipoDeAjuste === "Incremento" ?
                                    <>{parseInt(item.cantidad) + parseInt(item.cantidadAjustada)}</>
                                    :
                                    <>{parseInt(item.cantidad) - parseInt(item.cantidadAjustada)}</>
                                  }
                                </td>
                                <td >
                                  <div style={{display:"flex",alignItems:"center"}}>
                                    <span>$</span>
                                    <input
                                    style={{width:70}} 
                                    type='numeric'
                                    value={item.costoInicial}
                                    onChange={(e)=>{
                                      const updateData = selectedProducts.map((element)=>{
                                        if(element.id === item.id){
                                          return {...element,costoInicial:e.target.value}
                                        }
                                        return element
                                      })
                                      setSelectedProducts(updateData)
                                    }}
                                    />
                                  </div>
                                </td>
                                <td >
                                  <div style={{display:"flex"}}>
                                    <span>$</span>
                                    <input
                                    style={{width:70}} 
                                    type='numeric'
                                    value={item.precioBase}
                                    onChange={(e)=>{
                                      const updateData = selectedProducts.map((element)=>{
                                        if(element.id === item.id){
                                          return {...element, precioBase:e.target.value}
                                        }
                                        return element
                                      })
                                      setSelectedProducts(updateData);
                                    }}
                                    />
                                  </div>
                                </td>
                                
                                <td>
                                  <div style={{height:24.39,position:"relative",width:130}}>
                                    <div className='selectorLabelCont' onClick={()=>{
                                      const updateData = selectedProducts.map((element)=>{
                                        if(element.id === item.id){
                                          return {...element,openSubMenuIVA: !element.openSubMenuIVA,openSubMenu:false}
                                        }
                                        return {...element,openSubMenuIVA:false,openSubMenu:false}
                                      })
                                      setSelectedProducts(updateData)
                                    }}>{item.impuesto}</div>
                                    {
                                      item.openSubMenuIVA === true ?
                                      <div className='selectorSubMenu'>
                                        <span className='selectorItem'
                                          onClick={()=>{
                                            const updateData = selectedProducts.map((element)=>{
                                              if(element.id === item.id){
                                                return {...element,impuesto:0,openSubMenuIVA:false}
                                              }
                                              return {...element,openSubMenuIVA:false}
                                            })
                                            setSelectedProducts(updateData)
                                          
                                          }}
                                        >
                                          Ninguno (0%)</span>
                                        <span className='selectorItem'
                                          onClick={()=>{
                                            const updateData = selectedProducts.map((element)=>{
                                              if(element.id === item.id){
                                                return {...element,impuesto:21,openSubMenuIVA:false}
                                              }
                                              return {...element,openSubMenuIVA:false}
                                            })
                                            setSelectedProducts(updateData)
                                          
                                          }}
                                        >
                                          IVA - (21%)</span>
                                        
                                        <span className='selectorItem'
                                        onClick={()=>{
                                          const updateData = selectedProducts.map((element)=>{
                                            if(element.id === item.id){
                                              return {...element,impuesto:27,openSubMenuIVA:false}
                                            }
                                            return {...element,openSubMenuIVA:false}
                                          })
                                          setSelectedProducts(updateData)
                                        
                                        }}
                                        >
                                          IVA - (27%)</span>
                                        
                                        <span className='selectorItem'
                                        onClick={()=>{
                                          const updateData = selectedProducts.map((element)=>{
                                            if(element.id === item.id){
                                              return {...element,impuesto:10.5,openSubMenuIVA:false}
                                            }
                                            return {...element,openSubMenuIVA:false}
                                          })
                                          setSelectedProducts(updateData)
                                        
                                        }}
                                        >
                                          IVA - (10.5%)</span>
                                      </div>
                                      :
                                      <></>
                                    }
                                  </div>

                                </td>
                                <td>{parseFloat(item.precioBase)+parseFloat((item.precioBase * item.impuesto)/100)}</td>
                                <td><button onClick={()=>{
                                  const updateData = selectedProducts.filter((element)=>element.id !== item.id)
                                  console.log(updateData)
                                  setSelectedProducts(updateData)
                                }}>Quitar</button></td>
                              </tr>
                            )
                          }
                        </>
                      }
                    </tbody>
                  </table>
                  <div>
                    <button onClick={SendData}>Guardar Ajuste</button>
                  </div>
                </div>
              </div>


            </div>
            :
            <>
              {
                err === true ?
                <div className='overlayCard'  style={{width:"90%"}}>
                  <div>Error</div>
                  <button>Aceptar</button>
                </div>
                :
                <div className='overlayCard'>
                  <div>Ajuste creado</div>
                  <button onClick={()=>{setOverlay(false)}}>Aceptar</button>
                </div>
              }
            </>
          }
        </>
      }

    </div>
  )
}

export default NuevoAjusteDeInventario