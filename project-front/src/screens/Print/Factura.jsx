/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Logo from '../../assets/LogoEmpresa.png'

// El componente que quieres imprimir
const ComponentToPrint = React.forwardRef(({ factura, productos, cliente,impuesto }, ref) => (
  <div style={{width:"100%",position:"relative",display:"flex",flexDirection:"column",gap:5,minHeight:"100vh"}} ref={ref}>
    {/* Contenido que se imprimirá */}
    <section className='headerFactura' style={{marginTop:10}}>
        <div className='headerFacturaCol' style={{gap:5}}>
            <img src={Logo} style={{height:80,objectFit:"cover"}}/>
            <span style={{fontSize:10}}>Razon social: Empresa de Prueba</span>
            <span style={{fontSize:10}}>Condicion IVA: Responsable inscripto</span>
            <span style={{fontSize:10}}>Domicilio: Calle Azcuenaga 1451</span>
        </div>
        <div className='headerCategoria'>
            <span style={{fontSize:40}}>{factura.tipo}</span>
        </div>
        <div className='headerFacturaCol' style={{gap:5}}>
            <span style={{fontSize:15,fontWeight:"700"}}>FACTURA</span>
            <span style={{fontSize:14,fontWeight:"700"}}>{factura.nmro}</span>
            <span>Fecha de emision: {new Date(factura.fecha).toLocaleDateString('es-AR')}</span>
            <span>CUIT: 27-41689775-5</span>
        </div>
    </section>
    <section>
    <section className='detallesVtoFactura'>
        <span>Periodo Facturado Desde: {new Date(factura.fecha).toLocaleDateString('es-AR')}</span>
        <span>Hasta: {new Date(factura.vencimiento).toLocaleDateString('es-AR')}</span>
        <span>Fecha Vcto. para el pago: {new Date(new Date(factura.fecha).setDate(new Date(factura.fecha).getDate() + factura.plazoDePago)).toLocaleDateString('es-AR')}</span>
    </section>
    </section>
    <section className='headerFactura' style={{border:"1px solid #5a5a5a"}}>
        <div style={{display:"flex",flexDirection:"column",padding:"10px",gap:5}}>
            <span>Razon social: {cliente.nombre}</span>
            <span>Domicilio: {cliente.domicilio}</span>
            <span>Condicion de IVA: {cliente.condicionIVA}</span>
            <span>Condicion de Venta: {factura.condicion}</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",padding:"10px",gap:5}}>
            <span>{cliente.idType}: {cliente.id}</span>
            <span>Localidad: {cliente.localidad}</span>
            <span>Domicilio: {cliente.domicilio}</span>
            <span>Telefono</span>
        </div>
    </section>
    <table style={{ width: "calc(100% - 15px)", margin: "0 auto", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{border:"1px solid #5a5a5a"}}>
          <th style={{ backgroundColor: "white", fontSize: "12px", padding:"7px 5px" }}>Codigo</th>
          <th style={{ backgroundColor: "white", fontSize: "12px", padding:"7px 5px" }}>Descripcion</th>
          <th style={{ backgroundColor: "white", fontSize: "12px", padding:"7px 5px" }}>Cantidad</th>
          <th style={{ backgroundColor: "white", fontSize: "12px", padding:"7px 5px" }}>P. Unitario</th>
          <th style={{ backgroundColor: "white", fontSize: "12px", padding:"7px 5px" }}>% Bonif</th>
          <th style={{ backgroundColor: "white", fontSize: "12px", padding:"7px 5px" }}>IVA</th>
          <th style={{ backgroundColor: "white", fontSize: "12px", padding:"7px 5px" }}>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        
        {/* Aquí puedes incluir el contenido de la tabla dentro del tbody */}
        {
          productos.map((item,index)=>
            <tr key={index}>
              <td style={{fontSize:"12px",padding:"10px 0px"}}>{item.id.slice(24, 36).toUpperCase()}</td>
              <td style={{fontSize:"12px",padding:"10px 0px"}}>{item.nombre}</td>
              <td style={{fontSize:"12px",padding:"10px 0px"}}>{item.cantidad}</td>
              <td style={{fontSize:"12px",padding:"10px 0px"}}>${item.precio.toFixed(2)}</td>
              <td style={{fontSize:"12px",padding:"10px 0px"}}>{item.bonificacion.toFixed(2)}</td>
              <td style={{fontSize:"12px",padding:"10px 0px"}}>{item.impuesto.toFixed(2)}</td>
              <td style={{fontSize:"12px",padding:"10px 0px"}}>${((item.precio*item.cantidad) - ((item.bonificacion*(item.precio*item.cantidad))/100)).toFixed(2) }</td>
            </tr>
          )
        }
      </tbody>
    </table>
    <section className='footerFactura'>
        <div className='footerDetalle'>
            <div className='headerFactura' style={{width:"40%",margin:"0px",gap:7}}>
                <div style={{fontWeight:700}}>Importe Neto Gravado</div>
                <div>${impuesto.subtotal.toFixed(2)}</div>
                {
                  impuesto.IVA10 === 0 ?
                  <></>
                  :
                  <>
                    <div style={{fontWeight:700}}>IVA 10.5%</div>
                    <div>${impuesto.IVA10.toFixed(2)}</div>
                  </>
                }
                {
                  impuesto.IVA21 === 0 ?
                  <></>
                  :
                  <>
                    <div style={{fontWeight:700}}>IVA 21%</div>
                    <div>${impuesto.IVA21.toFixed(2)}</div>
                  </>
                }
                {
                  impuesto.IVA27 === 0 ?
                  <></>
                  :
                  <>
                    <div style={{fontWeight:700}}>IVA 27%</div>
                    <div>${impuesto.IVA27.toFixed(2)}</div>
                  </>
                }
                <div style={{fontWeight:700}}>Importe otros tributos</div>
                <div>$0</div>
                <div style={{fontWeight:700}}>Bonificacion</div>
                <div>${impuesto.bonificacion.toFixed(2)}</div>
                <div style={{fontWeight:700}}>Sub Total</div>
                <div>${(impuesto.subtotal - impuesto.bonificacion).toFixed(2)}</div>
                <div style={{fontWeight:700}}>TOTAL</div>
                <div>${factura.total.toFixed(2)}</div>
            </div>
        </div>
        <div className='footerDetalle' style={{height:30,marginBottom:10}}></div>
    </section>
  </div>
));

// Componente principal que renderiza el botón de impresión
const Factura = () => {
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
      {
        loading === true ?
        <div>Loading</div>
        :
        <>
          {
            err === true ?
            <div>No se encontro la factura</div>
            :
            <div>
              <ReactToPrint
                trigger={() => <button>Imprimir Factura</button>}
                content={() => componentRef.current}
              />
              <ComponentToPrint ref={componentRef} factura={factura} productos={productos} cliente={cliente} impuesto={impuesto}/>
            </div>
          }
        </>
      }
    </>
  );
};

export default Factura;
