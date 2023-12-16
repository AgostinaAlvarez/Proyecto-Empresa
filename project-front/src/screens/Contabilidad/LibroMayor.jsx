import React from 'react'
import { MdTableView } from "react-icons/md";
import HeaderSection from '../../components/HeaderSection';


const LibroMayor = () => {
  return (
    <>
      <HeaderSection
        name='Libro Mayor'
        IconS={<MdTableView style={{fontSize:28}}/>}
        //actionName={'Nuevo Presupuestos'}
        //action={newPresupuesto}
      />
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
          <tr>
            <td style={{padding:"9px"}}>22-06-2023</td>
            <td style={{padding:"9px",borderLeft:"1px solid black"}}>Saldo Inicial</td>
            <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}></td>
            <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}></td>
            <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}></td>
            <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}></td>
          </tr>
          <tr>
            <td style={{padding:"9px"}}>22-06-2023</td>
            <td style={{padding:"9px",borderLeft:"1px solid black"}}>Factura de Proveedores</td>
            <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}></td>
            <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}>14000</td>
            <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}></td>
            <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}>14000</td>
          </tr>
          <tr>
            <td style={{padding:"9px"}}>22-06-2023</td>
            <td style={{padding:"9px",borderLeft:"1px solid black"}}>Factura de Venta</td>
            <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}>30000</td>
            <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}></td>
            <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}>30000</td>
            <td style={{padding:"9px 0px",borderLeft:"1px solid black",textAlign:"center"}}></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default LibroMayor