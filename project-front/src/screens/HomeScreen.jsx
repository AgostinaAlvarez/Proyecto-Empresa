/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import FacturasDeVenta from './Ingresos/FacturasDeVenta';
import Todos from './Contactos/Todos'
import Clientes from './Contactos/Clientes'
import Proveedores from './Contactos/Proveedores'
import NuevaFactura from './Ingresos/NuevaFactura';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import ProductosDeVenta from './Productos/ProductosDeVenta';
import Remitos from './Ingresos/Remitos';
import NuevoRemito from './Ingresos/NuevoRemito';
import ValorDeInventario from './Productos/ValorDeInventario';
import AjusteDeInventario from './Productos/AjusteDeInventario';
import Cobranzas from './Ingresos/Cobranzas';
import NuevaCobranza from './Ingresos/NuevaCobranza';
import Bancos from './Bancos';
import Home from './Home';
import Gastos from './Gatos/Gastos';
import FacturasDeProveedores from './Gatos/FacturasDeProveedores';
import Depositos from './Productos/Depositos';
import NotasDeDebito from './NotasDeDebito';
import NotasDeCredito from './NotasDeCredito';
import NuevaFacturaDeProveedor from './Gatos/NuevaFacturaDeProveedor';
import NuevoPago from './Gatos/NuevoPago';
import DetalleProducto from './Productos/DetalleProducto';
import { IoHomeOutline } from "react-icons/io5";
import { BsArrowDownLeftCircle } from "react-icons/bs";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { LuFileInput } from "react-icons/lu";
import { LuFileOutput } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { BsBank } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { TbPigMoney } from "react-icons/tb";
import { LiaClipboardListSolid } from "react-icons/lia";
import { CiViewList } from "react-icons/ci";
import { BsGraphUp } from "react-icons/bs";
import { TbAbacus } from "react-icons/tb";


import PrintComponent from './PrintEx/PrintComponent';
import Factura from './Print/Factura';
import RemitosP from './Print/RemitosP';
import Formularios from './Formularios/Formularios';
import Presupuestos from './Presupuestos/Presupuestos';
import Capital from './Capital/Capital';
import Analisis from './Analisis/Analisis';
import Contabilidad from './Contabilidad/Contabilidad';
import LibroDiario from './Contabilidad/LibroDiario';
import LibroMayor from './Contabilidad/LibroMayor';
import SaldosMensuales from './Contabilidad/SaldosMensuales';
import BalanceDeSumSal from './Contabilidad/BalanceDeSumSal';
import AsientoContable from './Contabilidad/AsientoContable';
import NuevoLibroDiario from './Contabilidad/LibroDiario/NuevoLibroDiario';
import ImprimirLibroDiario from './Contabilidad/LibroDiario/ImprimirLibroDiario';
import NuevoLibroMayor from './Contabilidad/LibroMayor/NuevoLibroMayor';


const HomeScreen = () => {
  const navigate = useNavigate();
  const { getPagos,getCapital,getFacturasDeProveedores,getBalance,getBancos,getContacts,getProducts,getWarehouse,productos,getNumeracionesFacturas,getFacturas,getAjustesDeInventario,getVendedores,getRemitos,getCobranzas } = useContext(AppContext);
  const [ submenuIngresos,setSubmenuIngresos ] = useState(false);
  const [ submenuGastos,setSubmenuGastos ] = useState(false);
  const [ submenuContactos,setSubmenuContactos ] = useState(false);
  const [ submenuInventario,setSubmenuInventario ] = useState(false);
  
  useEffect(() => {
    getCobranzas();
    getBalance();
    getContacts();
    getProducts();
    getWarehouse();
    getNumeracionesFacturas();
    getFacturas()
    getAjustesDeInventario();
    getVendedores();
    getRemitos();
    getBancos();
    getFacturasDeProveedores();
    getCapital();
    getPagos();
  }, [])
  return (
    <>
      <header className='header'>
        <IoLogOutOutline/>
        <span style={{fontWeight:"500"}}>Salir</span>
      </header>
      <main className='main'>
        <aside className='mainAside'>
          <div className='asideItem' onClick={()=>{navigate('/')}}>
            <IoHomeOutline/>
            <span>Inicio</span>
          </div>
          <div className='asideItem' onClick={()=>{
            setSubmenuIngresos(!submenuIngresos);
            setSubmenuGastos(false);
            setSubmenuContactos(false);
            setSubmenuInventario(false);
          }
          }>
            <BsArrowDownLeftCircle/>
            <span>Ingresos</span>
            {submenuIngresos === true ? <IoIosArrowUp className='asideItemOpen'/> : <IoIosArrowDown className='asideItemOpen'/> }
          </div>
          {
            submenuIngresos === true ?
            <div style={{display:"flex",flexDirection:"column"}}>
              <div className='asideSubItem' onClick={()=>{navigate('/facturas')}}>Facturas de venta</div>
              <div className='asideSubItem' onClick={()=>{navigate('/cobranzas')}}>Cobranzas</div>
              <div className='asideSubItem' onClick={()=>{navigate('/remitos')}}>Remitos</div>
            </div>
            :
            <></>
          }
          <div className='asideItem' onClick={()=>{
            setSubmenuGastos(!submenuGastos);
            setSubmenuIngresos(false);
            setSubmenuContactos(false);
            setSubmenuInventario(false);
          }}>
            <BsArrowUpRightCircle/>
            <span>Gastos</span>
            {submenuGastos === true ? <IoIosArrowUp className='asideItemOpen'/> : <IoIosArrowDown className='asideItemOpen'/> }
          </div>
          {
            submenuGastos === true ?
            <div style={{display:"flex",flexDirection:"column"}}>
                <div className='asideSubItem' onClick={()=>{navigate('/facturasDeProveedores')}}>Facturas de proveedores</div>
                <div className='asideSubItem' onClick={()=>{navigate('/pagos')}}>Pagos</div>
            </div>
            :
            <></>
          }
          {/*CONTACTOS*/}
          <div className='asideItem' onClick={()=>{
            setSubmenuContactos(!submenuContactos);
            setSubmenuIngresos(false);
            setSubmenuGastos(false);
            setSubmenuInventario(false);
          }}>
            <LuUsers/>
            <span>Contactos</span>
            {submenuContactos === true ? <IoIosArrowUp className='asideItemOpen'/> : <IoIosArrowDown className='asideItemOpen'/> }
          </div>
          {
            submenuContactos === true ?
            <div style={{display:"flex",flexDirection:"column"}}>
                <div className='asideSubItem' onClick={()=>{navigate('/contactos')}}>Todos</div>
                <div className='asideSubItem' onClick={()=>{navigate('/clientes')}}>Clientes</div>
                <div className='asideSubItem' onClick={()=>{navigate('/proveedores')}}>Proveedores</div>
            </div>
            :
            <></>
          }
          <div className='asideItem' onClick={()=>{
            setSubmenuInventario(!submenuInventario);
            setSubmenuIngresos(false);
            setSubmenuGastos(false);
            setSubmenuContactos(false);
          }}>
            <BsBoxSeam/>
            <span>Inventario</span>
            {submenuInventario === true ? <IoIosArrowUp className='asideItemOpen'/> : <IoIosArrowDown className='asideItemOpen'/> }
          </div>
          {
            submenuInventario === true ?
            <div style={{display:"flex",flexDirection:"column"}}>
              <div className='asideSubItem' onClick={()=>{navigate('/productos')}}>Inventario</div>
              <div className='asideSubItem' onClick={()=>{navigate('/ajusteDeInventario')}}>Ajustes de inventario</div>
              <div className='asideSubItem' onClick={()=>{navigate('/depositos')}}>Depositos</div>
            </div>
            :
            <></>
          }
          <div className='asideItem' onClick={()=>{navigate('/formularios')}}>
            <LiaClipboardListSolid/>
            <span>Formularios</span>
          </div>
          <div className='asideItem' onClick={()=>{navigate('/presupuestos')}}>
            <CiViewList/>
            <span>Presupuestos</span>
          </div>
          <div className='asideItem' onClick={()=>{navigate('/bancos')}}>
            <BsBank/>
            <span>Banco</span>
          </div>
          <div className='asideItem' onClick={()=>{navigate('/capital')}}>
            <TbPigMoney/>
            <span>Capital</span>
          </div>
          <div className='asideItem' onClick={()=>{navigate('/contabilidad')}}>
            <TbAbacus/>
            <span>Contabilidad</span>
          </div>
          <div className='asideItem' onClick={()=>{navigate('/analisis')}}>
            <BsGraphUp/>
            <span>Analisis</span>
          </div>
          
        </aside>
        <div className='mainView'>
          <Routes>
            <Route path='/' element ={<Home/>}/>
            <Route path='/banco' element={<div>Banco</div>}/>
            <Route path='/bancos' element={<Bancos/>}/>
            {/*INGRESOS*/}
            <Route path='/facturas' element={<FacturasDeVenta/>}/>
            <Route path='/facturas/nueva' element={<NuevaFactura/>}/>
            <Route path='/facturas/imprimir/:id' element={<Factura/>}/>


            <Route path='/remitos' element={<Remitos/>}/>
            <Route path='/remitos/nuevo' element={<NuevoRemito/>}/>
            <Route path='/remitos/imprimir/:id' element={<RemitosP/>}/>

            <Route path='/cobranzas' element={<Cobranzas/>}/>
            <Route path='/cobranzas/nueva' element={<NuevaCobranza/>}/>
            {/*CONTACTOS*/}
            <Route path='/contactos' element={<Todos/>}/>
            <Route path='/clientes' element={<Clientes/>}/>
            <Route path='/proveedores' element={<Proveedores/>}/>

            {/*PRODUCTOS */}
            <Route path='/productos' element={<ProductosDeVenta/>}/>
            <Route path='/ajusteDeInventario' element={<AjusteDeInventario/>}/>
            <Route path='/depositos' element={<Depositos/>}/>
            <Route path='/productos/:id' element={<DetalleProducto/>}/>

            {/*Gastos*/}
            <Route path='/pagos' element={<Gastos/>}/>
            <Route path='/facturasdeproveedores' element={<FacturasDeProveedores/>}/>
            <Route path='/facturasdeproveedores/nueva' element={<NuevaFacturaDeProveedor/>}/>
            <Route path='/pagos/nuevo' element={<NuevoPago/>}/>

            {/*Formularios*/}

            <Route path='/formularios' element={<Formularios/>}/>
            {/*Presupuestos*/}
            <Route path='/presupuestos' element={<Presupuestos/>}/>

            {/*Capital*/}
            <Route path='/capital' element={<Capital/>}/>

            {/*Analisis*/}
            <Route path='/analisis' element={<Analisis/>}/>

            {/*Contabilidad*/}
            <Route path='/contabilidad' element={<Contabilidad/>}/>
            <Route path='/libro-diario' element={<LibroDiario/>}/>
            <Route path='/libro-diario/nuevo' element={<NuevoLibroDiario/>}/>
            <Route path='/libro-diario/imprimir' element={<ImprimirLibroDiario/>}/>

            <Route path='/libro-mayor' element={<LibroMayor/>}/>
            <Route path='/libro-mayor/nuevo' element={<NuevoLibroMayor/>}/>
            
            
            <Route path='/saldos-mensuales' element={<SaldosMensuales/>}/>
            <Route path='/balance-de-sumas-y-saldos' element={<BalanceDeSumSal/>}/>
            <Route path='/asientos-contables' element={<AsientoContable/>}/>
            {/** */}
            <Route path='/notasDeDebito' element={<NotasDeDebito/>}/>
            <Route path='/notasDeCredito' element={<NotasDeCredito/>}/>

            <Route path='/login' element={<Navigate to="/"/>}/>

            <Route path='/test' element={<Factura/>}/>
          </Routes>
        </div>
      </main>
    </>
  )
}

export default HomeScreen