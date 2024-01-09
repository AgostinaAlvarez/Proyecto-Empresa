/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
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
import { useNavigate } from 'react-router-dom';


const AsideSection = () => {
  const navigate = useNavigate()
  const [ submenuIngresos,setSubmenuIngresos ] = useState(false);
  const [ submenuGastos,setSubmenuGastos ] = useState(false);
  const [ submenuContactos,setSubmenuContactos ] = useState(false);
  const [ submenuInventario,setSubmenuInventario ] = useState(false);
  return (
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
  )
}

export default AsideSection