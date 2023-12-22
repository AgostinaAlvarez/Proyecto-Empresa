import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DetalleLibroDiarios = () => {
  const [ rdos,setRdos ] = useState(null)
  const [ error,setError ] = useState(false)
  const [ loading,setLoading ] = useState(true)
  const [ fechas,setFechas ] = useState({fechaInicial:"",fechaFinal:""})
  const navigate = useNavigate()
  
  const params = useParams()

  useEffect(() => {
    console.log(params)
    getLibro()
  }, [])
  

  async function getLibro (){
    try{
      const response = await axios.get(`http://localhost:3000/api/libro-diario/${params.id}`)
      if(response.data.libro.lenght === 0){
        console.log('no hay nada')
        setError(true)
        setLoading(false)
      }else{
        console.log('si hay algo')
        console.log(response.data.libro[0])
        getData(response.data.libro[0].fechaInicial, response.data.libro[0].fechaFinal)
      }
    }catch(err){
      console.log(err)
      setError(true)
      setLoading(false)
    }
  }

  async function getData(fecha1,fecha2){
       
    try{
      const response = await axios.get(`http://localhost:3000/api/libroDiario/${fecha1.slice(0, 10)}/${fecha2.slice(0, 10)}`)
      console.log(response.data.rdosContables)
      setFechas({fechaInicial:fecha1.slice(0, 10),fechaFinal:fecha2.slice(0, 10)})
      setRdos(response.data.rdosContables)
      setLoading(false)
    }catch(err){
      console.log(err)
      setError(true)
      setLoading(false)
    }
  }

  return (
    <>
    {
      loading === true ?
      <>
        <div>Loading</div>
      </>
      :
      <>
        {
          error === true ?
          <>
            <div>No se encontro el libro diario</div>
          </>
          :
          <>
            {
                rdos === null ?
                <></>
                :
                <>
                  {
                    rdos.lenght === 0 ?
                    <div>No hay resultados</div>
                    :
                    <>
                      <h1>Libro diario</h1>
                      <h3>Periodo Desde: {fechas.fechaInicial} Hasta: {fechas.fechaFinal}</h3>
                      <h4>Ref: {params.id.slice(0, 10)}</h4>
                      <table style={{width:"90%",marginTop:"30px",marginLeft:"20px"}}>
                          <thead>
                            <tr>
                              <th style={{backgroundColor:"white",padding:"15px 0px",width:"60px"}}>Nro</th>
                              <th style={{backgroundColor:"white",padding:"15px 0px"}}>Fecha</th>
                              <th style={{backgroundColor:"white",padding:"15px 0px"}}>Documento/Concepto</th>
                              <th style={{backgroundColor:"white",padding:"15px 0px"}}>Codigo</th>
                              <th style={{backgroundColor:"white",padding:"15px 0px"}}>Cuenta</th>
                              <th style={{backgroundColor:"white",padding:"15px 0px"}}>Debe</th>
                              <th style={{backgroundColor:"white",padding:"15px 0px"}}>Haber</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              rdos.map((item,index)=>
                              <>  
                                {
                                  item.categoria === "factura de venta" ?
                                  <>
                                      {/*FACTURA DE VENTA*/}
                                      <tr>
                                        <td style={{padding:"7px 0px",width:"60px"}}>{index+1}</td>
                                        <td style={{padding:"7px 0px"}}>{item.fecha.substring(0, 10)}</td>
                                        <td style={{padding:"7px 0px"}}>{item.categoria} {item.tipoFact}- {item.nmroFact}</td>
                                        <td>1.1.1</td>
                                        <td style={{padding:"7px 0px"}}>Deudores por venta</td>
                                        <td style={{padding:"7px 0px"}}>{item.deudoresPorVenta.toFixed(2)}</td>
                                        <td style={{padding:"7px 0px"}}></td>
                                      </tr>
                                      {
                                        item.bonificacion === 0 ?
                                        <></>
                                        :
                                        <tr>
                                          <td style={{padding:"7px 0px",width:"60px"}}></td>
                                          <td style={{padding:"7px 0px"}}></td>
                                          <td style={{padding:"7px 0px"}}></td>
                                          <td>1.2.1</td>
                                          <td style={{padding:"7px 0px"}}>Descuento Concedido</td>
                                          <td style={{padding:"7px 0px"}}>{item.bonificacion.toFixed(2)}</td>
                                          <td style={{padding:"7px 0px"}}></td>
                                        </tr>
        
                                      }
                                      <tr>
                                        <td style={{padding:"7px 0px",width:"60px"}}></td>
                                        <td style={{padding:"7px 0px"}}></td>
                                        <td style={{padding:"7px 0px"}}></td>
                                        <td>1.2.3</td>
                                        <td style={{padding:"7px 0px"}}>IVA Debito fiscal</td>
                                        <td style={{padding:"7px 0px"}}></td>
                                        <td style={{padding:"7px 0px"}}>{item.iva.toFixed(2)}</td>
                                      </tr>
                                      <tr>
                                        <td style={{padding:"7px 0px",width:"60px"}}></td>
                                        <td style={{padding:"7px 0px"}}></td>
                                        <td style={{padding:"7px 0px"}}></td>
                                        <td>1.2.1</td>
                                        <td style={{padding:"7px 0px"}}>Venta de bienes</td>
                                        <td style={{padding:"7px 0px"}}></td>
                                        <td style={{padding:"7px 0px"}}>{item.ventas.toFixed(2)}</td>
                                      </tr>
                                      <tr>
                                        <td colSpan="5">
                                          <div style={{backgroundColor:"#cfcfcf",padding:"17px 20px",fontWeight:500,color:"#cfcfcf"}}>Fecha 01-08-2023</div>
                                        </td>
                                        <td style={{backgroundColor:"#cfcfcf",padding:"17px 0px",fontWeight:500,textAlign:"center"}}>
                                          {(item.deudoresPorVenta + item.bonificacion).toFixed(2)}
                                        </td>
                                        <td style={{backgroundColor:"#cfcfcf",padding:"17px 0px",fontWeight:500,textAlign:"center"}}>
                                          {(item.ventas + item.iva).toFixed(2)}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{padding:"7px 0px",width:"60px"}}>{`${index+1}'`}</td>
                                        <td style={{padding:"7px 0px"}}>{item.fecha.substring(0, 10)}</td>
                                        <td style={{padding:"7px 0px"}}>Costos Mercaderia <span style={{fontSize:"12px"}}>(s/{item.categoria} - {item.nmroFact})</span> </td>
                                        <td>1.1.1</td>
                                        <td style={{padding:"7px 0px"}}>CMV</td>
                                        <td style={{padding:"7px 0px"}}>{item.costoMercaderia.toFixed(2)}</td>
                                        <td style={{padding:"7px 0px"}}></td>
                                      </tr>
                                      <tr>
                                        <td style={{padding:"7px 0px",width:"60px"}}></td>
                                        <td style={{padding:"7px 0px"}}></td>
                                        <td style={{padding:"7px 0px"}}></td>
                                        <td>1.2.1</td>
                                        <td style={{padding:"7px 0px"}}>Mercaderia</td>
                                        <td style={{padding:"7px 0px"}}></td>
                                        <td style={{padding:"7px 0px"}}>{item.costoMercaderia.toFixed(2)}</td>
                                      </tr>
                                      <tr>
                                        <td colSpan="5">
                                          <div style={{backgroundColor:"#cfcfcf",padding:"17px 20px",fontWeight:500,color:"#cfcfcf"}}>Fecha 01-08-2023</div>
                                        </td>
                                        <td style={{backgroundColor:"#cfcfcf",padding:"17px 0px",fontWeight:500,textAlign:"center"}}>
                                          {item.costoMercaderia.toFixed(2)}
                                        </td>
                                        <td style={{backgroundColor:"#cfcfcf",padding:"17px 0px",fontWeight:500,textAlign:"center"}}>
                                          {item.costoMercaderia.toFixed(2)}
                                        </td>
                                      </tr>
                                  </>
                                  :
                                  <>
                                    {
                                      item.categoria === "pago de factura de proveedores" ?
                                      <>
                                        {/*PAGO FACTURA DE PROVEEDORES*/}
                                        <tr>
                                          <td style={{padding:"7px 0px",width:"60px"}}>{index+1}</td>
                                          <td style={{padding:"7px 0px"}}>{item.fecha.substring(0, 10)}</td>
                                          <td style={{padding:"7px 0px"}}>Pago a proveedores</td>
                                          <td>1.1.1</td>
                                          <td style={{padding:"7px 0px"}}>Proveedores</td>
                                          <td style={{padding:"7px 0px"}}>{item.monto.toFixed(2)}</td>
                                          <td style={{padding:"7px 0px"}}></td>
                                        </tr>
                                        <tr>
                                          <td style={{padding:"7px 0px",width:"60px"}}></td>
                                          <td style={{padding:"7px 0px"}}></td>
                                          <td style={{padding:"7px 0px"}}></td>
                                          <td>1.2.3</td>
                                          <td style={{padding:"7px 0px"}}>
                                            {
                                              
                                              item.tipoDeCtaBancaria === "caja chica" ?
                                              <>CAJA</>
                                              :
                                              <>
                                              {
                                                item.concepto === "tarejta de credito" ?
                                                <>Tarjetas de credito a pagar</>
                                                :
                                                <>Banco {item.entidadBancaria} {item.tipoDeCtaBancaria}</>
                                              }
                                              </>
                                              
                                            }
                                          </td>
                                          <td style={{padding:"7px 0px"}}></td>
                                          <td style={{padding:"7px 0px"}}>{item.monto.toFixed(2)}</td>
                                        </tr>
                                        <tr>
                                          <td colSpan="5">
                                            <div style={{backgroundColor:"#cfcfcf",padding:"17px 20px",fontWeight:500,color:"#cfcfcf"}}>Fecha 01-08-2023</div>
                                          </td>
                                          <td style={{backgroundColor:"#cfcfcf",padding:"17px 0px",fontWeight:500,textAlign:"center"}}>
                                            {item.monto.toFixed(2)}
                                          </td>
                                          <td style={{backgroundColor:"#cfcfcf",padding:"17px 0px",fontWeight:500,textAlign:"center"}}>
                                            {item.monto.toFixed(2)}
                                          </td>
                                        </tr>
                                      </>
                                      :
                                      <>
                                        {
                                          item.categoria === "pago a acreedores varios" ?
                                          <>
                                            {/*PAGOS NO RELACIONADOS A FACTURAS DE PROVEEDORES*/}
                                            <tr>
                                              <td style={{padding:"7px 0px",width:"60px"}}>{index+1}</td>
                                              <td style={{padding:"7px 0px"}}>{item.fecha.substring(0, 10)}</td>
                                              <td style={{padding:"7px 0px"}}>pago {item.concepto}</td>
                                              <td>1.1.1</td>
                                              <td style={{padding:"7px 0px"}}>{item.concepto}</td>
                                              <td style={{padding:"7px 0px"}}>{(item.total -item.iva).toFixed(2)}</td>
                                              <td style={{padding:"7px 0px"}}></td>
                                            </tr>
                                            {
                                              item.iva === 0 || item.iva === null?
                                              <></>
                                              :
                                              <tr>
                                                  <td style={{padding:"7px 0px",width:"60px"}}></td>
                                                  <td style={{padding:"7px 0px"}}></td>
                                                  <td style={{padding:"7px 0px"}}></td>
                                                  <td>1.2.1</td>
                                                  <td style={{padding:"7px 0px"}}>IVA Credito Fiscal</td>
                                                  <td style={{padding:"7px 0px"}}>{item.iva.toFixed(2)}</td>
                                                  <td style={{padding:"7px 0px"}}></td>
                                              </tr>
                                            }
                                            {
                                              item.bonificacion === 0 || item.bonificacion === null?
                                              <></>
                                              :
                                              <tr>
                                                  <td style={{padding:"7px 0px",width:"60px"}}></td>
                                                  <td style={{padding:"7px 0px"}}></td>
                                                  <td style={{padding:"7px 0px"}}></td>
                                                  <td>1.2.1</td>
                                                  <td style={{padding:"7px 0px"}}>Descuentos Obtenidos</td>
                                                  <td style={{padding:"7px 0px"}}></td>
                                                  <td style={{padding:"7px 0px"}}>{item.bonificacion.toFixed(2)}</td>
                                              </tr>
                                            }
                                            <tr>
                                              <td style={{padding:"7px 0px",width:"60px"}}></td>
                                              <td style={{padding:"7px 0px"}}></td>
                                              <td style={{padding:"7px 0px"}}></td>
                                              <td>1.2.3</td>
                                              <td style={{padding:"7px 0px"}}>
                                                {
        
                                                  item.tipoDeCtaBancaria === "caja chica" ?
                                                  <>CAJA</>
                                                  :
                                                  <>
                                                  {
                                                    item.concepto === "tarejta de credito" ?
                                                    <>Tarjetas de credito a pagar</>
                                                    :
                                                    <>Banco {item.entidadBancaria} {item.tipoDeCtaBancaria}</>
                                                  }
                                                  </>
        
                                                }
                                              </td>
                                              <td style={{padding:"7px 0px"}}></td>
                                              <td style={{padding:"7px 0px"}}>{(item.total - item.bonificacion).toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="5">
                                                  <div style={{backgroundColor:"#cfcfcf",padding:"17px 20px",fontWeight:500,color:"#cfcfcf"}}>Fecha 01-08-2023</div>
                                                </td>
                                                <td style={{backgroundColor:"#cfcfcf",padding:"17px 0px",fontWeight:500,textAlign:"center"}}>
                                                  {item.total}
                                                </td>
                                                <td style={{backgroundColor:"#cfcfcf",padding:"17px 0px",fontWeight:500,textAlign:"center"}}>
                                                  {item.total}
                                                </td>
                                            </tr>
                                          </>
                                          :
                                          <>
                                            {
                                              item.categoria === "facturas de proveedores" ?
                                              <>
                                                {/*FACTURA PROVEEDORES*/}
                                                <tr>
                                                  <td style={{padding:"7px 0px",width:"60px"}}>{index+1}</td>
                                                  <td style={{padding:"7px 0px"}}>{item.fecha.substring(0, 10)}</td>
                                                  <td style={{padding:"7px 0px"}}>{item.categoria} {item.tipoFact}- {item.nmroFact}</td>
                                                  <td>1.1.1</td>
                                                  <td style={{padding:"7px 0px"}}>{item.concepto === "Materiales de Producción" ? "Mercaderia" : `${item.concepto}`}</td>
                                                  <td style={{padding:"7px 0px"}}>{(item.total - item.iva).toFixed(2)}</td>
                                                  <td style={{padding:"7px 0px"}}></td>
                                                </tr>
                                                {
                                                  item.iva === 0 ?
                                                  <></>
                                                  :
                                                  <tr>
                                                      <td style={{padding:"7px 0px",width:"60px"}}></td>
                                                      <td style={{padding:"7px 0px"}}></td>
                                                      <td style={{padding:"7px 0px"}}></td>
                                                      <td>1.2.1</td>
                                                      <td style={{padding:"7px 0px"}}>IVA Credito Fiscal</td>
                                                      <td style={{padding:"7px 0px"}}>{item.iva.toFixed(2)}</td>
                                                      <td style={{padding:"7px 0px"}}></td>
                                                  </tr>
                                                }
                                                {
                                                  item.bonificacion === 0 ?
                                                  <></>
                                                  :
                                                  <tr>
                                                      <td style={{padding:"7px 0px",width:"60px"}}></td>
                                                      <td style={{padding:"7px 0px"}}></td>
                                                      <td style={{padding:"7px 0px"}}></td>
                                                      <td>1.2.1</td>
                                                      <td style={{padding:"7px 0px"}}>Descuentos Obtenidos</td>
                                                      <td style={{padding:"7px 0px"}}></td>
                                                      <td style={{padding:"7px 0px"}}>{item.bonificacion.toFixed(2)}</td>
                                                  </tr>
                                                }
                                                <tr>
                                                      <td style={{padding:"7px 0px",width:"60px"}}></td>
                                                      <td style={{padding:"7px 0px"}}></td>
                                                      <td style={{padding:"7px 0px"}}></td>
                                                      <td>1.2.1</td>
                                                      <td style={{padding:"7px 0px"}}>Proveedores</td>
                                                      <td style={{padding:"7px 0px"}}></td>
                                                      <td style={{padding:"7px 0px"}}>{(item.total - item.bonificacion).toFixed(2)}</td>
                                                  </tr>
                                                <tr>
                                                    <td colSpan="5">
                                                      <div style={{backgroundColor:"#cfcfcf",padding:"17px 20px",fontWeight:500,color:"#cfcfcf"}}>Fecha 01-08-2023</div>
                                                    </td>
                                                    <td style={{backgroundColor:"#cfcfcf",padding:"17px 0px",fontWeight:500,textAlign:"center"}}>
                                                      {item.total}
                                                    </td>
                                                    <td style={{backgroundColor:"#cfcfcf",padding:"17px 0px",fontWeight:500,textAlign:"center"}}>
                                                      {item.total}
                                                    </td>
                                                </tr>
                                              </>
                                              :
                                              <>
                                                {/*COBROS FACTURAS DE VENTA*/}
                                                <tr>
                                                  <td style={{padding:"7px 0px",width:"60px"}}>{index+1}</td>
                                                  <td style={{padding:"7px 0px"}}>{item.fecha.substring(0, 10)}</td>
                                                  <td style={{padding:"7px 0px"}}>Cobro factura de venta</td>
                                                  <td>1.1.1</td>
                                                  <td style={{padding:"7px 0px"}}>
                                                    {
                                                      item.tipoDeCtaBancaria === "caja chica" ?
                                                      <>CAJA</>
                                                      :
                                                      <>
                                                      {
                                                        item.concepto === "tarejta de credito" ?
                                                        <>Tarjetas de credito a pagar</>
                                                        :
                                                        <>Banco {item.entidadBancaria} {item.tipoDeCtaBancaria}</>
                                                      }
                                                      </>
                                                    }
                                                  </td>
                                                  <td style={{padding:"7px 0px"}}>{item.monto.toFixed(2)}</td>
                                                  <td style={{padding:"7px 0px"}}></td>
                                                </tr>
                                                <tr>
                                                  <td style={{padding:"7px 0px",width:"60px"}}></td>
                                                  <td style={{padding:"7px 0px"}}></td>
                                                  <td style={{padding:"7px 0px"}}></td>
                                                  <td>1.2.1</td>
                                                  <td style={{padding:"7px 0px"}}>Deudores por venta</td>
                                                  <td style={{padding:"7px 0px"}}></td>
                                                  <td style={{padding:"7px 0px"}}>{item.monto.toFixed(2)}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan="5">
                                                      <div style={{backgroundColor:"#cfcfcf",padding:"17px 20px",fontWeight:500,color:"#cfcfcf"}}>Fecha 01-08-2023</div>
                                                    </td>
                                                    <td style={{backgroundColor:"#cfcfcf",padding:"17px 0px",fontWeight:500,textAlign:"center"}}>
                                                      {item.monto.toFixed(2)}
                                                    </td>
                                                    <td style={{backgroundColor:"#cfcfcf",padding:"17px 0px",fontWeight:500,textAlign:"center"}}>
                                                      {item.monto.toFixed(2)}
                                                    </td>
                                                </tr>
                                              </>
                                            }
                                          </>
                                        }
                                      </>
                                    }
                                  </>
                                }
                              </>
                              )
                            }
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td style={{padding:"20px 0px 10px 0px", fontWeight:900,textAlign:"center",borderBottom:"1px solid black"}}>75000</td>
                              <td style={{padding:"20px 0px 10px 0px", fontWeight:900,textAlign:"center",borderBottom:"1px solid black"}}>75000</td>
                            </tr>
                          </tbody>
                        
                      </table>
                      <div style={{height:"150px"}}></div>
                      <div className='nuevoLBFilerCont' style={{position:"absolute",bottom:0,right:15,width:"calc(100% - 250px)",justifyContent:"center"}}>
                        <button onClick={()=>{navigate('/libro-diario/imprimir')}}>Imprimir</button>
                      </div>
                    </>
                  }
                </>
            }
          </>
        }
      </>
    }
    </>
  )
}

export default DetalleLibroDiarios