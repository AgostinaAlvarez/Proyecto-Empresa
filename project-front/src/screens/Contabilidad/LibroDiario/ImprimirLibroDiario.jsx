/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from 'react-to-print';


// El componente que quieres imprimir
const ComponentToPrint = React.forwardRef(({ factura, productos, cliente,impuesto }, ref) => (
    <div style={{width:"100%",position:"relative",display:"flex",flexDirection:"column",gap:5,minHeight:"100vh"}} ref={ref}>
        <h1>Libro diario</h1>
    </div>
));
  

const ImprimirLibroDiario = () => {
    const componentRef = React.useRef();
    const [ loading,setLoading ] = useState(true);
    const [ err,setErr ] = useState(true);
    const [ factura,setFactura ] = useState(null);
    const [ productos,setProductos ] = useState(null);
    const [ cliente,setCliente ] = useState(null);
    const [ impuesto,setImpuesto ] = useState(null);
  
    const params = useParams();
    useEffect(() => {
      console.log(params)
      getDatosFactura()
    }, [])
    
    async function getDatosFactura(){
      try{
        const response = await axios.get(`http://localhost:3000/api/detalleFactura/${params.id}`)
        
        if(response.data.factura.length !== 0){
          setFactura(response.data.factura[0]);
          setCliente(response.data.cliente[0]);
          setProductos(response.data.productos);
  
          let IVA21 = 0;
          let IVA10 = 0;
          let IVA27 = 0;
          let bonificacion = 0;
          let subtotal = 0;
  
          response.data.productos.map((item)=>{
            
            let bonificacionRdo = ((item.bonificacion*(item.precio*item.cantidad))/100);
  
            let subtotalRdo =(item.precio * item.cantidad)
            
            bonificacion = bonificacion + bonificacionRdo
            subtotal = subtotal + subtotalRdo
            
            if(item.impuesto === 21){
              
              let total = ((item.precio*item.cantidad) - ((item.bonificacion*(item.precio*item.cantidad))/100));
  
              IVA21 = IVA21 + ((item.impuesto*total)/100)
            }else if(item.impuesto === 10.5){
              
              let total = ((item.precio*item.cantidad) - ((item.bonificacion*(item.precio*item.cantidad))/100));
  
              IVA10 = IVA10 + ((item.impuesto*total)/100)
            }else if(item.impuesto === 27){
              
              let total = ((item.precio*item.cantidad) - ((item.bonificacion*(item.precio*item.cantidad))/100));
  
              IVA27 = IVA27 + ((item.impuesto*total)/100)
            }
          })
          //console.log({IVA10,IVA21,IVA27})
          console.log({IVA10,IVA21,IVA27,bonificacion})
          setImpuesto({IVA10,IVA21,IVA27,bonificacion,subtotal})
          setLoading(false)
          setErr(false)
        }else{
          setLoading(false);
          setErr(true);
        }
      }catch(err){
        console.log(err)
      }
    }
  
    return (
      <>
        <div>
          <ReactToPrint
            trigger={() => <button>Imprimir</button>}
            content={() => componentRef.current}
          />
          <ComponentToPrint ref={componentRef}/>
        </div>  
      </>
    );
  };

export default ImprimirLibroDiario