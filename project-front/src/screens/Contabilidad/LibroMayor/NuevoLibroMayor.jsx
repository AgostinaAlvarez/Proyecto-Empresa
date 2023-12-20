/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { MdTableView } from "react-icons/md";
import axios from 'axios';
import { elements } from 'chart.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HeaderSection from '../../../components/HeaderSection';

const NuevoLibroMayor = () => {

  const [ rdos,setRdos ] = useState([])
  const [ options,setOptions ] = useState([{name:"fecha",selected:false},{name:"libro diario",selected:"false"}])
  
  useEffect(() => {
    getTestData()
  }, [])

  function selectOption (typeO){
    setRdos([])
    setSelectedDate(null)
    setSelectedDate2(null)
    setCuentasContables(cuentasContablesInitialState)
    const updateData = options.map((option)=>{
      if(option.name === typeO){
        return {...option,selected:true}
      }
      return {...option,selected:false}
    })
    setOptions(updateData)
  }
  
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [selectedDate2, setSelectedDate2] = useState(null);
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  async function getTestData (){
    const fechaInicial = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`
    const fechaFinal = `${selectedDate2.getFullYear()}-${String(selectedDate2.getMonth() + 1).padStart(2, '0')}-${String(selectedDate2.getDate()).padStart(2, '0')}`
    try{
      const response = await axios.get(`http://localhost:3000/api/libroDiario/${fechaInicial}/${fechaFinal}`)
      console.log(response.data.rdosContables)
      setRdos(response.data.rdosContables)
      analyseData(response.data.rdosContables)
    }catch(err){
      console.log(err)
    }
  }

  const cuentasContablesInitialState = [
    {
      nombre: "Deudores por venta",
      debe: 0,
      haber: 0,
      saldo:0
    },
    {
      nombre: "Venta de bienes",
      debe: 0,
      haber: 0,
      saldo:0
    },
    {
      nombre: "Descuentos concedidos",
      debe: 0,
      haber: 0,
      saldo:0
    },
    {
      nombre: "IVA Debito Fiscal",
      debe: 0,
      haber: 0,
      saldo:0
    },
    {
      nombre: "Proveedores",
      debe: 0,
      haber: 0,
      saldo:0
    },
    {
      nombre: "Mercaderia",
      debe: 0,
      haber: 0,
      saldo:0
    },
    {
      nombre: "Gastos",
      debe: 0,
      haber: 0,
      saldo:0
    },
    {
      nombre: "Descuentos obtenidos",
      debe: 0,
      haber: 0,
      saldo:0
    },
    {
      nombre: "IVA Credito Fiscal",
      debe: 0,
      haber: 0,
      saldo:0
    },
    {
      nombre: "Banco",
      debe:0,
      haber:0,
      saldo:0
    },
    {
      nombre: "Caja",
      debe:0,
      haber:0,
      saldo:0
    },
    {
      nombre: "Acreedores varios",
      debe: 0,
      haber: 0,
      saldo:0
    },
    {
      nombre: "CMV",
      debe: 0,
      haber: 0,
      saldo:0
    }
  ]

  const [cuentasContables,setCuentasContables] = useState(cuentasContablesInitialState)

  function analyseData (rdos){
    
    const updatedCuentasContables = cuentasContables.map(cuenta => {
      
      if(cuenta.nombre === "Proveedores"){
        rdos.forEach(element =>{
          if(element.categoria==="pago de factura de proveedores"){
            cuenta.debe += element.monto
          }else if(element.categoria === "facturas de proveedores"){
            cuenta.haber += element.proveedores
          }
        })
      }
      if(cuenta.nombre === "Descuentos obtenidos"){
        rdos.forEach(element =>{
          if(element.categoria==="facturas de proveedores" && (element.bonificacion !== 0 || element.bonificacion !== null)){
            cuenta.haber += element.bonificacion
          }else if(element.categoria === "pago a acreedores varios" &&(element.bonificacion !== 0 || element.bonificacion !== null)){
            cuenta.haber += element.bonificacion
          }
        })
      }
      if(cuenta.nombre === "Banco"){
        rdos.forEach(element =>{
          if(element.categoria === "pago de factura de proveedores" && element.entidadBancaria !== "propia"){
            cuenta.haber += element.monto
          }else if(element.categoria === "pago a acreedores varios" && element.entidadBancaria !== "propia" ){
            cuenta.haber += (element.total - element.bonificacion)
          }else if(element.categoria === "cobro de factura de venta" && element.entidadBancaria !== "propia"){
            cuenta.debe += element.monto
          }

        })
      }
      if(cuenta.nombre === "Gastos"){
        rdos.forEach(element =>{
          if(element.categoria === "facturas de proveedores" && element.concepto === "Gastos"){
            cuenta.debe += element.total
          }
        })
      }
      if(cuenta.nombre === "Mercaderia"){
        rdos.forEach(element =>{
          if(element.categoria === "facturas de proveedores" && element.concepto === "Materiales de Producción"){
            cuenta.debe += element.total
          }else if(element.categoria === "factura de venta"){
            cuenta.haber += element.costoMercaderia
          }
        })
      }
      if(cuenta.nombre === "Acreedores varios"){
        rdos.forEach(element =>{
          if(element.categoria === "pago a acreedores varios"){
            cuenta.debe += element.total
          }
        })
      }
      if(cuenta.nombre === "Deudores por venta"){
        rdos.forEach(element =>{
          if(element.categoria === "cobro de factura de venta"){
            cuenta.haber += element.monto
          }else if(element.categoria === "factura de venta"){
            cuenta.debe += element.deudoresPorVenta
          }
        })
      }
      if(cuenta.nombre === "Descuentos concedidos"){
        rdos.forEach(element =>{
          if(element.categoria === "factura de venta" && (element.bonificacion !== 0 || element.bonificacion !== null)){
            cuenta.debe += element.bonificacion
          }
        })
      }
      if(cuenta.nombre === "IVA Debito Fiscal"){
        rdos.forEach(element =>{
          if(element.categoria === "factura de venta" && (element.iva !== 0 || element.iva !== null)){
            cuenta.haber += element.iva
          }
        })
      }
      if(cuenta.nombre === "IVA Credito Fiscal"){
        rdos.forEach(element =>{
          if(element.categoria === "factura de proveedores" && (element.iva !== 0 || element.iva !== null)){
            cuenta.debe += element.iva
          }
        })
      }
      if(cuenta.nombre === "Venta de bienes"){
        rdos.forEach(element =>{
          if(element.categoria === "factura de venta"){
            cuenta.haber += element.ventas
          }
        })
      }
      if(cuenta.nombre === "CMV"){
        rdos.forEach(element =>{
          if(element.categoria === "factura de venta"){
            cuenta.debe += element.costoMercaderia
          }
        })
      }
      
      return cuenta;
    });
    
    console.log(updatedCuentasContables)
    const finalResult = updatedCuentasContables.map((cuenta)=>{
      return {...cuenta, saldo:(cuenta.debe - cuenta.haber)}
    })
    console.log('RESULTADOS')
    console.log(finalResult)
    setCuentasContables(finalResult); // Actualiza el estado con los valores actualizados

    //console.log(cuentasContables)
  }

  function getSaldos(){
    let saldoDeudor = 0;
    let saldoAcreedor = 0;
    let debe = 0;
    let haber = 0
    cuentasContables.forEach(element => {
      debe += element.debe;
      haber += element.haber;
      if(element.saldo < 0){
        saldoAcreedor += element.saldo
      }else{
        saldoDeudor += element.saldo
      }
    });

    return (
      <>
        <td style={{backgroundColor:"green",padding:"9px 0px",textAlign:"center"}}>{debe.toFixed(2)}</td>
        <td style={{backgroundColor:"green",padding:"9px 0px",textAlign:"center"}}>{haber.toFixed(2)}</td>
        <td style={{backgroundColor:"green",padding:"9px 0px",textAlign:"center"}}>{saldoDeudor.toFixed(2)}</td>
        <td style={{backgroundColor:"green",padding:"9px 0px",textAlign:"center"}}>{(saldoAcreedor*(-1)).toFixed(2)}</td>
      </>
    )

  }


  function getDatos(){
    getTestData()
  }

  return (
    <>
      <HeaderSection
        name='Libro Mayor'
        IconS={<MdTableView style={{fontSize:28}}/>}
        //actionName={'Nuevo Presupuestos'}
        //action={newPresupuesto}
      />
      <div>
        <button onClick={()=>{selectOption("fecha")}}>Generar por fecha</button>
        <button onClick={()=>{selectOption("libro diario")}}>Generar por Libro Diario existente</button>
      </div>
      {
        options[0].selected === true ? 
        <>
            <div className='nuevoLBFilerCont'>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <span>Desde</span>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de la fecha
                  />
              </div>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <span>Hasta</span>
                  <DatePicker
                    selected={selectedDate2}
                    onChange={handleDateChange2}
                    dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de la fecha
                  />
              </div>
      
              <button style={{cursor:"pointer"}} 
              onClick={()=>{getDatos()}}
              >Aceptar</button>
            </div>
            {
              rdos.length === 0 ?
              <div>No hay resultados</div>
              :
              <table style={{width:"97%",margin:"0 auto",border:"1px solid black"}}>
                  <thead>
                  <tr>
                      <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}} rowSpan="3">Cuenta</th>
                      <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}} rowSpan="3">Descripcion</th>
                  </tr>
                  <tr>
                      <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}} colSpan="2">Movimientos</th>
                      <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}} colSpan="2">Saldos</th>
                  </tr>
                  <tr>
                      <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}}>Debe</th>
                      <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}}>Haber</th>
                      <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}}>Debe</th>
                      <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}}>Haber</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                      cuentasContables.map((item,index)=>
                      <tr key={index}>
                      <td style={{padding:"9px"}}>codigo</td>
                      <td style={{padding:"9px",borderLeft:"1px solid black"}}>{item.nombre}</td>
                      <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}>{item.debe.toFixed(2)}</td>
                      <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}>{item.haber.toFixed(2)}</td>
                      <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}>{item.saldo < 0 ? "" : item.saldo.toFixed(2)}</td>
                      <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}>{item.saldo < 0 ? item.saldo.toFixed(2)*(-1) : ""}</td>
                      </tr>
                      
                      )
                  }
                  <tr >
                      <td style={{padding:"9px"}}></td>
                      <td style={{padding:"9px 0px",borderLeft:"1px solid black"}}></td>
                      <>
                      {
                          getSaldos()
                      }
                      </>
      
                  </tr>
                  </tbody>
              </table>
            }

        </>
        :
        <>
          {
            options[1].selected === true ?
            <>
              <div>Buscar libro diario:</div>
              <table className='tableFactura' style={{marginBottom:30}}>
                <thead>
                  <tr>
                    <th>Nmro.</th>
                    <th>Ref.</th>
                    <th>Fecha inicial</th>
                    <th>Fecha final</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
              </table>
            </>
            :
            <></> 
          }
        </>
      }
    </>
  )
}

export default NuevoLibroMayor