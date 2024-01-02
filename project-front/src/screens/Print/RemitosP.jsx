/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import Logo from '../../assets/LogoEmpresa.png'

// El componente que quieres imprimir
const ComponentToPrint = React.forwardRef(({ remito, productos, cliente,datosFactura }, ref) => (
  <div style={{width:"100%",position:"relative",display:"flex",flexDirection:"column",gap:5,minHeight:"100vh"}} ref={ref}>
    {/* Contenido que se imprimirá */}
    <section className='headerFactura' style={{marginTop:10}}>
        <div className='headerFacturaCol' style={{gap:5}}>
            <img src={Logo} style={{height:80,objectFit:"cover"}}/>
            <span>Calle Desconocida 1234 </span>
            <span>CP5505 - Mendoza - 2615658886</span>
            <span>Email cobranzas@empresa.com</span>
        </div>
        <div className='headerCategoria'>
            <span style={{fontSize:40}}>R</span>
        </div>
        <div className='headerFacturaCol' style={{gap:5}}>
            <span style={{fontSize:15,fontWeight:"700"}}>REMITO</span>
            <span style={{fontSize:13,fontWeight:"700"}}>Documento no valido como factura</span>
            <span>Fecha de emision: {new Date(remito.creacion).toLocaleDateString('es-AR')}</span>
            <span style={{fontSize:15,fontWeight:"700"}}>No. 0001-00002301</span>
            <span>CUIT: 27-41689775-5</span>
        </div>
    </section>
    <section className='headerFactura' style={{border:"1px solid #5a5a5a"}}>
        <div style={{display:"flex",flexDirection:"column",padding:"10px",gap:10}}>
            <span>Sr./es: {cliente.nombre}</span>
            <span>Domicilio: {cliente.domicilio}</span>
        </div>
        <div style={{display:"flex",flexDirection:"column",padding:"10px"}}>
            <span>Localidad: {cliente.localidad}</span>
        </div>
    </section>

    <section className='detallesVtoFactura' style={{boxSizing:"border-box",padding:"10px 50px"}}>        
        <span>IVA: {cliente.condicionIVA}</span>
        <span>{cliente.idType}: {cliente.id}</span>
    </section>

    <section className='detallesVtoFactura' style={{boxSizing:"border-box",padding:"10px 50px"}}>        
        <span>Condicion de venta: {datosFactura.condicion}</span>
        <span>Factura de venta {datosFactura.tipoFactura} No. {datosFactura.nmroDeFactura}</span>
    </section>

    <table style={{ width: "93%", margin: "0 auto", borderCollapse: "collapse", border:"1px solid black",marginTop:20 }}>
      <thead>
        <tr 
            //style={{border:"1px solid #5a5a5a"}}
        >
          <th style={{ backgroundColor: "white", fontSize: "12px", padding:"7px 5px",border:"1px solid #5a5a5a",textAlign:"center" }}>Cantidad</th>
          <th style={{ backgroundColor: "white", fontSize: "12px", padding:"7px 5px",border:"1px solid #5a5a5a",textAlign:"center" }}>Descripcion</th>
        </tr>
      </thead>
      <tbody>        
        {
          productos.map((item,index)=>
            <tr key={index}>
              <td style={{fontSize:"12px",padding:"10px 0px",borderRight:"1px solid #5a5a5a" ,textAlign:"center"}}>{item.cantidad}</td>
              <td style={{fontSize:"12px",padding:"10px 0px",boxSizing:"border-box",paddingLeft:15}}>{item.nombre} {item.id}</td>
              
            </tr>
          )
        }
      </tbody>
    </table>
    <section style={{width:"100%",position:"absolute",bottom:0,fontSize:13}}>
        <div style={{width:"100%",display:"grid",gridTemplateColumns:"1fr 1fr"}}>
            <div style={{width:"100%",boxSizing:"border-box",padding:"30px 20px",border:"1px solid #5a5a5a", display:"flex",flexDirection:"column",gap:10}}>
                <div>Transporte: .................................................................</div>
                <div>Domicilio: {remito.direccion}</div>
                <div>{cliente.idType}: {cliente.id}</div>
            </div>
            <div style={{width:"100%",boxSizing:"border-box",padding:"30px 20px",border:"1px solid #5a5a5a", display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10}}>
                <div>......................................................................................</div>
                <div>Recibi conforme</div>
            </div>
        </div>
        <div className='detallesVtoFactura' style={{width:"100%"}}>
            <span>C.A.I. No. 42055411747511 - Fecha de impresion: {new Date().toLocaleDateString('es-AR')} - Fecha de vencimiento: {new Date(remito.vencimiento).toLocaleDateString('es-AR')}</span>
        </div>
    </section>
    {
        /*
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
        
        */
    }
  </div>
));

// Componente principal que renderiza el botón de impresión
const RemitosP = () => {
  const componentRef = React.useRef();
  const [ loading,setLoading ] = useState(true);
  const [ err,setErr ] = useState(true);
  const [ remito,setRemito ] = useState(null);
  const [ productos,setProductos ] = useState(null);
  const [ cliente,setCliente ] = useState(null);
  const [datosFactura,setDatosFactura] = useState(null)
  const params = useParams();
  useEffect(() => {
    console.log(params)
    getDatosRemito()
  }, [])
  
  async function getDatosRemito(){
    try{
      const response = await axios.get(`http://localhost:3000/api/detalleRemito/${params.id}`)

      console.log(response)

      if(response.data.remito.length !== 0){

        console.log('remito')
        console.log(response.data)
        setRemito(response.data.remito[0]);
        setCliente(response.data.cliente[0]);
        
        setProductos(response.data.productos);
        
        setDatosFactura(response.data.detalleFactura[0]);

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
            <div>No se encontro el remito</div>
            :
            <div>
              <ReactToPrint
                trigger={() => <button>Imprimir Remito</button>}
                content={() => componentRef.current}
              />
              <ComponentToPrint ref={componentRef} remito={remito} productos={productos} cliente={cliente} datosFactura={datosFactura}/>
              {
                /*
                
                */
              }
            </div>
          }
        </>
      }
    </>
  );
};

export default RemitosP;
