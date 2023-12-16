/* eslint-disable no-unused-vars */
import React from 'react'
import HeaderSection from '../../components/HeaderSection'
import { MdTableView } from "react-icons/md";

const LibroDiario = () => {
  const arr = [1,2,3,1,2,3,1,1,1,1,1,1,1]
  return (
    <>
      <HeaderSection
        name='Libro Diario'
        IconS={<MdTableView style={{fontSize:28}}/>}
        //actionName={'Nuevo Presupuestos'}
        //action={newPresupuesto}
      />
      <div>
        Filtrar
      </div>
      <table style={{width:"97%",margin:"0 auto"}}>
        <thead>
          <tr>
            <th style={{backgroundColor:"white",width:"60px"}}>Nro</th>
            <th style={{backgroundColor:"white"}}>Documento/Concepto</th>
            <th style={{backgroundColor:"white"}}>Codigo</th>
            <th style={{backgroundColor:"white"}}>Cuenta</th>
            <th style={{backgroundColor:"white"}}>Año</th>
            <th style={{backgroundColor:"white"}}>Mes</th>
            <th style={{backgroundColor:"white"}}>Debe</th>
            <th style={{backgroundColor:"white"}}>Haber</th>
          </tr>
        </thead>
        <tbody>
          {
            arr.map((item,index)=>  
            <>
              <tr>
                <td style={{padding:"7px 0px",width:"60px"}}>{index+1}</td>
                <td style={{padding:"7px 0px"}}>Factura de venta - 0001-00000005</td>
                <td>1.1.1</td>
                <td style={{padding:"7px 0px"}}>Banco</td>
                <td style={{padding:"7px 0px"}}>18</td>
                <td style={{padding:"7px 0px"}}>01</td>
                <td style={{padding:"7px 0px"}}>75000</td>
                <td style={{padding:"7px 0px"}}></td>
              </tr>
              <tr>
                <td style={{padding:"7px 0px",width:"60px"}}></td>
                <td style={{padding:"7px 0px"}}></td>
                <td>1.2.3</td>
                <td style={{padding:"7px 0px"}}>IVA Debito fiscal</td>
                <td style={{padding:"7px 0px"}}>18</td>
                <td style={{padding:"7px 0px"}}>01</td>
                <td style={{padding:"7px 0px"}}></td>
                <td style={{padding:"7px 0px"}}>13000</td>
              </tr>
              <tr>
                <td style={{padding:"7px 0px",width:"60px"}}></td>
                <td style={{padding:"7px 0px"}}></td>
                <td>1.2.1</td>
                <td style={{padding:"7px 0px"}}>Venta de bienes</td>
                <td style={{padding:"7px 0px"}}>18</td>
                <td style={{padding:"7px 0px"}}>01</td>
                <td style={{padding:"7px 0px"}}></td>
                <td style={{padding:"7px 0px"}}>69000</td>
              </tr>
              <tr>
                <td colSpan="6">
                  <div style={{backgroundColor:"#b1b1b1",padding:"10px 20px",fontWeight:500}}>Fecha 01-08-2023</div>
                </td>
                <td style={{backgroundColor:"#b1b1b1",padding:"10px 0px",fontWeight:500}}>
                  154000
                </td>
                <td style={{backgroundColor:"#b1b1b1",padding:"10px 0px",fontWeight:500}}>
                  154000
                </td>
              </tr>
              
            </>
            )
          }
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{padding:"20px 0px 10px 0px", fontWeight:900,textAlign:"center",borderBottom:"1px solid black"}}>75000</td>
            <td style={{padding:"20px 0px 10px 0px", fontWeight:900,textAlign:"center",borderBottom:"1px solid black"}}>75000</td>
          </tr>
          {/**--------------------------------- */}
          {/**--------------------------------- */}
        </tbody>
      </table>
    </>
  )
}

export default LibroDiario