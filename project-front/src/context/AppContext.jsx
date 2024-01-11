/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState } from "react";
import { serverURL } from "../../protectedRoutes";

export const AppContext = createContext();

export const AppContextProvider = (props) =>{
  
  const [ logged,setLogged ] = useState(false);
  const [ contactos,setContactos ] = useState([]);
  const [ clientes,setClientes ] = useState([]);
  const [ proveedores,setProveedores ] = useState([]);
  const [ productos,setProductos ] = useState([]);
  const [ almacenes,setAlmacenes ] = useState([]);
  const [ numeracionFacturas,setNumeracionFacturas ] = useState([]);
  const [ facturas,setFacturas ] = useState([]);
  const [ ajustesDeInventario,setAjustesDeInventario ] = useState([]);
  const [ vendedores,setVendedores ] = useState([]);
  const [ remitos,setRemitos ] = useState([]);


  const [cobranzas,setCobranzas] = useState([]);
  const [ pagos,setPagos ] = useState([]);
  
  
  const [ facturasDeProveedores,setFacturasDeProveedores ] = useState([])

  const [ bancos,setBancos ] = useState([]);

  const [ ingresos,setIngresos ] = useState(0);
  const [ gastos,setGastos ] = useState(0)
  const [ capital,setCapital ] = useState([])
  const [ montoDeInversion,setMontoDeInversion ] = useState(0)
  const [ gananciasPorFacturas,setGananciasPorFacturas ] = useState(0)
  
  const [ librosDiarios,setLibrosDiarios ] = useState([])

  /** */
  const [ watch,setWatch ] = useState(false)
  //** */

  const axiosCredentials = { withCredentials: true }


  async function getContacts (){
    try{
      const response = await axios.get(`${serverURL}/api/getContacts`,axiosCredentials)
      setContactos(response.data.contactos);
      setClientes(response.data.clientes);
      setProveedores(response.data.proveedores);
    }catch(err){
      console.log(err)
    }
  }
  
  async function getWarehouse (){
    try{
      const response = await axios.get(`${serverURL}/api/getWarehouse`,axiosCredentials)
      setAlmacenes(response.data.depositos);
    }catch(err){
      console.log(err);
    }
  }


  async function getProducts(){
    try{
      const response = await axios.get(`${serverURL}/api/getProducts`,axiosCredentials);
      setProductos(response.data.productos);
    }catch(err){
      console.log(err);
    }
  }

  async function getNumeracionesFacturas (){
    try{
      const response = await axios.get(`${serverURL}/api/numeracionFacturas`,axiosCredentials);
      setNumeracionFacturas(response.data.numeracionesFacturas);
    }catch(err){
      console.log(err);
    }
  }


  async function getFacturas(){
    try{
      const response = await axios.get(`${serverURL}/api/getFacturas`,axiosCredentials);
      setFacturas(response.data.facturas)
    }catch(err){
      console.log(err)
    }
  }


  /*Funcion para ordenar un array por nombre */
  function orderArray (data){
    const updateData = data
    updateData.sort((a, b) => {
      const nombreA = a.nombre.toUpperCase(); // Convierte a mayusculas para ordenar sin distincion de mayusculas/minusculas
      const nombreB = b.nombre.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0; 
    });

    return updateData;
  }

  async function getAjustesDeInventario (){
    try{
      const response = await axios.get(`${serverURL}/api/ajustesDeInventario`,axiosCredentials)
      setAjustesDeInventario(response.data.ajustes)
    }catch(err){
      console.log(err)
    } 
  }

  async function getVendedores (){
    try{
      const response = await axios.get(`${serverURL}/api/vendedores`,axiosCredentials)
      setVendedores(response.data.vendedores)
    }catch(err){
      console.log(err)
    }
  }

  async function getRemitos (){
    try{
      const response = await axios.get(`${serverURL}/api/remitos`,axiosCredentials)
      setRemitos(response.data.remitos)
    }catch(err){
      console.log(err)
    }
  }

  async function getCobranzas (){
    try{
      const response = await axios.get(`${serverURL}/api/cobranzas`,axiosCredentials);
      setCobranzas(response.data.cobranzas);
    }catch(err){
      console.log(err)
    }finally{
      setWatch(true)
    }
  }

  function ordenarFechas(arrayDeObjetos) {
    arrayDeObjetos.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
  
      return fechaB - fechaA; // Orden descendente, de más reciente a más antigua
    });
  
    return arrayDeObjetos;
  }

  async function getBancos (){
    try{
      const response = await axios.get(`${serverURL}/api/bancos`,axiosCredentials)
      setBancos(response.data.bancos)
    }catch(err){
      console.log(err)
    }
  }

  async function getBalance(){
    try{
      const response = await axios.get(`${serverURL}/api/balance`,axiosCredentials);
      setIngresos(response.data.ingresos)
      setGastos(response.data.gastos);
      setGananciasPorFacturas(response.data.gananciasPorFacturas);
      console.log(response.data.gananciasPorFacturas)
    }catch(err){
      console.log(err)
    }
  }

  async function getFacturasDeProveedores (){
    try{
      const response = await axios.get(`${serverURL}/api/facturasdeproveedores`,axiosCredentials);
      setFacturasDeProveedores(response.data.facturas)
    }catch(err){
      console.log(err)
    }
  }

  async function getCapital(){
    try{
      const response = await axios.get(`${serverURL}/api/capital`,axiosCredentials);
      setCapital(response.data.capital)
      setMontoDeInversion(response.data.inversion)
      //console.log(response.data.capital)
    }catch(err){
      console.log(err)
    }
  }

  async function getPagos(){
    try{
      const response = await axios.get(`${serverURL}/api/pagos`,axiosCredentials);
      console.log('Pagos')
      console.log(response.data.pagos)
      setPagos(response.data.pagos)
    }catch(err){
      console.log(err)
    }
  }

  return(
    <AppContext.Provider value={{
      logged,setLogged,
      contactos,setContactos,
      clientes,setClientes,
      proveedores,setProveedores,
      productos,setProductos,
      almacenes,setAlmacenes,
      numeracionFacturas,setNumeracionFacturas,
      facturas,setFacturas,
      ajustesDeInventario,setAjustesDeInventario,
      vendedores,setVendedores,
      remitos,setRemitos,
      cobranzas,setCobranzas,
      pagos,setPagos,

      bancos,setBancos,
      ingresos,setIngresos,
      gastos,setGastos,
      facturasDeProveedores,setFacturasDeProveedores,
      capital,setCapital,
      montoDeInversion,setMontoDeInversion,
      gananciasPorFacturas,setGananciasPorFacturas,
      orderArray,
      getContacts,
      getProducts,
      getWarehouse,
      getNumeracionesFacturas,
      getFacturas,
      getAjustesDeInventario,
      getVendedores,
      getRemitos,
      ordenarFechas,
      getCobranzas,
      getBancos,
      getBalance,
      getFacturasDeProveedores,
      getCapital,
      getPagos,
      librosDiarios,setLibrosDiarios,
      watch,setWatch
    }}>
      {props.children}
    </AppContext.Provider>
  )
}