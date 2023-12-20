import React from 'react'
import HeaderSection from '../../../components/HeaderSection'
import { MdTableView } from "react-icons/md";

const NuevoAsiento = ({setOpenModal}) => {

  return (
    <>
      <HeaderSection
        name='Nuevo Asiento Contable'
        IconS={<MdTableView style={{fontSize:28}}/>}
        actionName={'Cerrar'}
        action={()=>{setOpenModal(false)}}
      />
      <div className='nuevoAsientoContainer'>
        <div className='nuevoAsientoOpt'>
          <div className='nuevoAsientoOptItem'>
            <span>Serie</span>
            <div>Seleccionar</div>
          </div>
          <div className='nuevoAsientoOptItem'>
            <span>Referencia</span>
            <div>Seleccionar</div>
          </div>
          <div className='nuevoAsientoOptItem'>
            <span>Fecha</span>
            <div>Seleccionar</div>
          </div>
        </div>
        <table style={{width:"100%"}}>
          <thead>
            <tr>
              <th style={{backgroundColor:"grey"}}>Cuenta contable</th>
              <th style={{backgroundColor:"grey"}}>IVA</th>
              <th style={{backgroundColor:"grey"}}>Concepto</th>
              <th style={{backgroundColor:"grey"}}>Debe</th>
              <th style={{backgroundColor:"grey"}}>Haber</th>
              <th style={{backgroundColor:"grey"}}>Saldo cuenta</th>
              <th style={{backgroundColor:"grey"}}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Selector</td>
              <td>Selector</td>
              <td>Input</td>
              <td>Input</td>
              <td>Input</td>
              <td>div</td>
              <td><button>quitar</button></td>
            </tr>
          </tbody>
        </table>
        <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px 0px"}}>
          <button>+</button>
        </div>
      </div>
      <div style={{height:100,backgroundColor:"pink",display:"flex",alignItems:"center",justifyContent:"end",boxSizing:"border-box",padding:"0px 20px"}}>
        <button>Guardar</button>
        <button>Contabilizar</button>
      </div>
    </>
  )
}

export default NuevoAsiento