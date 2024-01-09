import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../screens/Home'
import Bancos from '../screens/Bancos'
import FacturasDeVenta from '../screens/Ingresos/FacturasDeVenta'
import NuevaFactura from '../screens/Ingresos/NuevaFactura'
import Factura from '../screens/Print/Factura'
import FacturaDeVentaDetalle from '../screens/Ingresos/FacturaDeVentaDetalle'
import Remitos from '../screens/Ingresos/Remitos'
import NuevoRemito from '../screens/Ingresos/NuevoRemito'
import RemitosP from '../screens/Print/RemitosP'
import Cobranzas from '../screens/Ingresos/Cobranzas'
import NuevaCobranza from '../screens/Ingresos/NuevaCobranza'
import Todos from '../screens/Contactos/Todos'
import Clientes from '../screens/Contactos/Clientes'
import Proveedores from '../screens/Contactos/Proveedores'
import ProductosDeVenta from '../screens/Productos/ProductosDeVenta'
import AjusteDeInventario from '../screens/Productos/AjusteDeInventario'
import Depositos from '../screens/Productos/Depositos'
import DetalleProducto from '../screens/Productos/DetalleProducto'
import Gastos from '../screens/Gatos/Gastos'
import FacturasDeProveedores from '../screens/Gatos/FacturasDeProveedores'
import NuevaFacturaDeProveedor from '../screens/Gatos/NuevaFacturaDeProveedor'
import NuevoPago from '../screens/Gatos/NuevoPago'
import Formularios from '../screens/Formularios/Formularios'
import Presupuestos from '../screens/Presupuestos/Presupuestos'
import Capital from '../screens/Capital/Capital'
import Analisis from '../screens/Analisis/Analisis'
import Contabilidad from '../screens/Contabilidad/Contabilidad'
import LibroDiario from '../screens/Contabilidad/LibroDiario'
import NuevoLibroDiario from '../screens/Contabilidad/LibroDiario/NuevoLibroDiario'
import ImprimirLibroDiario from '../screens/Contabilidad/LibroDiario/ImprimirLibroDiario'
import DetalleLibroDiarios from '../screens/Contabilidad/LibroDiario/DetalleLibroDiarios'
import LibroMayor from '../screens/Contabilidad/LibroMayor'
import NuevoLibroMayor from '../screens/Contabilidad/LibroMayor/NuevoLibroMayor'
import SaldosMensuales from '../screens/Contabilidad/SaldosMensuales'
import BalanceDeSumSal from '../screens/Contabilidad/BalanceDeSumSal'
import AsientoContable from '../screens/Contabilidad/AsientoContable'
import NotasDeDebito from '../screens/NotasDeDebito'
import NotasDeCredito from '../screens/NotasDeCredito'

const PrivateRouter = () => {
  return (
    <Routes>
            <Route path='/' element ={<Home/>}/>
            <Route path='/banco' element={<div>Banco</div>}/>
            <Route path='/bancos' element={<Bancos/>}/>
            {/*INGRESOS*/}
            <Route path='/facturas' element={<FacturasDeVenta/>}/>
            <Route path='/facturas/nueva' element={<NuevaFactura/>}/>
            <Route path='/facturas/imprimir/:id' element={<Factura/>}/>
            <Route path='/facturas/detalle/:id' element={<FacturaDeVentaDetalle/>}/>


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
            <Route path='/libro-diario/detalle/:id' element={<DetalleLibroDiarios/>}/>

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
  )
}

export default PrivateRouter