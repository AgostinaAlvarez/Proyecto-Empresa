/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Swal from 'sweetalert2'


const NuevoProducto = ({setCreateNewProduct}) => {

  const { almacenes,productos,setProductos,orderArray,ajustesDeInventario,setAjustesDeInventario } = useContext(AppContext);

  const [ submenuUnidadesDeMedida,setSubmenuUnidadesDeMedida ] = useState(false)
  const [ submenuDeposito,setSubmenuDeposito ] = useState(false);
  const [ submenuImpuesto,setSubmenuImpuesto ] = useState(false);
  
  const [ err,setErr ] = useState(false);
  const [ loading,setLoading ] = useState(false)
  const [ createdProduct,setCreatedProduct ] = useState(false)

  const [ datos,setDatos ] = useState({
    nombre :"",
    unidadDeMedida :"",
    deposito :{id:"",nombre:""},
    cantidad :1,
    costoInicial:0,
    precioBase :0,
    impuesto :0,
    precioTotal :0
  })

  function aplicarIVA (valor){
    if(datos.precioBase !== 0){
      const nmro = (datos.precioBase * valor)/100;
      console.log(typeof nmro)
      console.log(typeof datos.precioBase)
      const total = parseFloat(datos.precioBase) + nmro;
      setDatos({...datos,impuesto:valor,precioTotal:total});

    }else{
      console.log('no puedo')
    }
  }


  function selectorImpuesto (valor){
    switch (valor) {
      case 0:
        return <>Ninguno (0%)</>  
      ;
      case 21:
        return <>IVA - (21%)</>
      ;
      case 27:
        return <>IVA - (27%)</>
      ;
      case 10.5:
        return <>IVA - (10.5%)</>
    }
  }


  async function sendDatos (){
    //setLoading(true)
    const id = uuidv4();
    const date = new Date()
    const data = {
      id: id,
      nombre: datos.nombre,
      unidadDeMedida:datos.unidadDeMedida,
      deposito: datos.deposito.id,
      cantidad: datos.cantidad,
      costoInicial: datos.costoInicial,
      precioBase: datos.precioBase,
      impuesto: datos.impuesto,
      precioTotal : datos.precioTotal,
      fecha: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
      hora: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    };
    console.log(data);
    /*
    cantidad
    cantidadAjustada
    costoInicial
    fecha
    hora
    idProducto
    impuesto
    nombre
    precioBase
    precioTotal
    tipo
    unidadDeMedida
    */

    const ajuste = {
      cantidad: datos.cantidad,
      cantidadAjustada : datos.cantidad,
      costoInicial : datos.costoInicial,
      fecha: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
      hora: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      idProducto : id,
      impuesto : datos.impuesto,
      nombre : datos.nombre,
      precioBase : datos.precioBase,
      precioTotal : datos.precioTotal,
      tipo : "Ingreso",
      unidadDeMedida :datos.unidadDeMedida
    }


    try {
      const response = await axios.post('http://localhost:3000/api/createProduct',data);
      console.log(response.data)
      console.log(response.data.ok)
      if(response.data.ok === true ){
        //
        //const nuevoArray = [...productos,data];
        console.log('enviado correctamente')
        const updateArray = orderArray([...productos,data]);
        setProductos(updateArray)
        const updateAjuste = [ajuste,...ajustesDeInventario]
        setAjustesDeInventario(updateAjuste)
        setCreateNewProduct(false)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Producto creado!",
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        //
        setCreatedProduct(false)
        setLoading(false)
        setErr(true)
      }
    }catch(err){
      setCreatedProduct(false)
      setErr(true)
      setLoading(false)
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
          createdProduct === false ?
          <div className='overlayCard'>
            <div className='formHeader'>
              <span>Nuevo producto</span>
              <button onClick={()=>{setCreateNewProduct(false)}}>cerrar</button>
            </div>
            <div className='formContent'>

              <div className='formGrid formAlign'>
                <div className="formGridItem">
                  <label>Nombre</label>
                  <input 
                  value={datos.nombre}
                  onChange={(e)=>{setDatos({...datos,nombre:e.target.value})}}
                  style={{height:25}} type='text' placeholder='name'/>
                </div>

                <div className="formGridItem">
                  <label>Unidad de medida</label>
                  <div style={{height:31,width:"100%"}} className='selectorContainer'>
                    <div className='selectorLabel' onClick={()=>{setSubmenuUnidadesDeMedida(!submenuUnidadesDeMedida)}}>{datos.unidadDeMedida}</div>
                    {
                      submenuUnidadesDeMedida === true ?
                      <div className='selectorSubMenu'>
                        <span onClick={()=>{
                          setDatos({...datos,unidadDeMedida:"Unidad"})
                          setSubmenuUnidadesDeMedida(false)
                          }} className='selectorItem'>Unidad</span>
                        <span onClick={()=>{
                          setDatos({...datos,unidadDeMedida:"Metros"})
                          setSubmenuUnidadesDeMedida(false)
                          }} className='selectorItem'>Metros</span>
                      </div>
                      :
                      <></>
                    }
                  </div>
                </div>

                <div className="formGridItem">
                  <label>Almacen / Deposito</label>
                  <div style={{height:31,width:"100%"}} className='selectorContainer'>
                    <div className='selectorLabel' onClick={()=>{setSubmenuDeposito(!submenuDeposito)}}>{datos.deposito.nombre}</div>
                    {
                      submenuDeposito === true ?
                      <div className='selectorSubMenu'>
                        {
                          almacenes.map((item,index)=>
                            <span 
                            onClick={()=>{
                              setDatos({...datos,deposito:{id:item.id,nombre:item.nombre}})
                              setSubmenuDeposito(false)
                            }}
                            key={index} className='selectorItem'>{item.nombre}</span>
                          )
                        }
                      </div>
                      :
                      <></>
                    }
                  </div>
                </div>


                <div className="formGridItem">
                  <label>Cantidad</label>
                  <input 
                  value={datos.cantidad}
                  onChange={(e)=>{setDatos({...datos,cantidad:e.target.value})}}
                  style={{height:25}} type='number' />
                </div>

                <div className="formGridItem">
                  <label>Costo inicial</label>
                  <input 
                  value={datos.costoInicial}
                  onChange={(e)=>{setDatos({...datos,costoInicial:e.target.value})}}
                  style={{height:25}} type='number' placeholder='$'/>
                </div>
                
                <div></div>

                <div className="formGridItem">
                  <label>Precio Base</label>
                  <input 
                  value={datos.precioBase}
                  onChange={(e)=>{
                    
                    setDatos({
                      ...datos,
                      precioBase: e.target.value,
                      impuesto: 0,
                      precioTotal:e.target.value
                    })
                  }}
                  style={{height:25}} type='number' placeholder='$'/>
                </div>

                <div className="formGridItem">
                  <label>Impuesto</label>
                  <div style={{height:31,width:"100%"}} className='selectorContainer'>
                    <div className='selectorLabel' onClick={()=>{setSubmenuImpuesto(!submenuImpuesto)}}>
                      {
                      selectorImpuesto(datos.impuesto)
                      }
                    </div>
                    {
                      submenuImpuesto === true ?
                      <div className='selectorSubMenu'>
                        <span className='selectorItem'
                        onClick={()=>{
                          setDatos({...datos,impuesto : 0,precioTotal:datos.precioBase})
                          setSubmenuImpuesto(false)
                        }}
                        >Ninguno (0%)</span>
                        <span className='selectorItem'
                        onClick={()=>{
                          aplicarIVA(21)
                          setSubmenuImpuesto(false)
                        }}
                        >IVA (21%)</span>
                        <span className='selectorItem'
                        onClick={()=>{
                          aplicarIVA(27)
                          setSubmenuImpuesto(false)
                        }}
                        >IVA (27%)</span>
                        <span className='selectorItem'
                        onClick={()=>{
                          aplicarIVA(10.50)
                          setSubmenuImpuesto(false)
                        }}
                        >IVA (10.50%)</span>
                      </div>
                      :
                      <></>
                    }
                  </div>
                </div>


                <div className="formGridItem">
                  <label>Precio total</label>
                  <div style={{width:"100%",height:31,cursor:"default"}} className='selectorLabel'>${datos.precioTotal}</div>
                </div>

              </div>

              <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:30}}>
                <div onClick={()=>{sendDatos()}} style={{width:"60%",borderRadius:5,padding:"11px 0px",textAlign:"center",cursor:"pointer",backgroundColor:"green"}}>Aceptar</div>
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
                <button onClick={()=>{setCreateNewProduct(false)}}>Cerrar</button>
              </div>
              :
              <div className='overlayCard'>
                <div>Producto creado</div>
                <button onClick={()=>{setCreateNewProduct(false)}}>Aceptar</button>
              </div>
            }
          </>
        }
        </>
      }
    </div>
  )
}

export default NuevoProducto


/*
CREATE TABLE productos (
  id VARCHAR (40) NOT NULL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  unidadDeMedida VARCHAR(20) NOT NULL,
  deposito VARCHAR (255),
  cantidad INT NOT NULL,
  costoInicial FLOAT,
  precioBase FLOAT NOT NULL,
  impuesto INT,
  precioTotal INT NOT NULL
)


*/