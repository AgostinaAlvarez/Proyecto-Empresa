import React from 'react'
import HeaderSection from '../../components/HeaderSection'
import { MdTableView } from "react-icons/md";

const BalanceDeSumSal = () => {
  return (
    <>
      <HeaderSection
        name='Balance de Sumas y Saldos'
        IconS={<MdTableView style={{fontSize:28}}/>}
        //actionName={'Nuevo Presupuestos'}
        //action={newPresupuesto}
      />
      <table style={{width:"97%",margin:"0 auto"}}>
        <thead>
          <tr>
              <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}} rowSpan="3">Nombre Cta.</th>
          </tr>
          <tr>
              <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}} colSpan="2">Sumas</th>
              <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}} colSpan="2">Saldos</th>
              <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}} colSpan="2">Ctas. Patrimoniales</th>
              <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}} colSpan="2">Ctas. Resultado</th>

          </tr>
          <tr>
              <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}}>Debe</th>
              <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}}>Haber</th>
              <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}}>Debe</th>
              <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}}>Haber</th>
              <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}}>Activo</th>
              <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}}>P + PN</th>
              <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}}>Perdidas</th>
              <th style={{padding:"7px 0px",backgroundColor:"white",textAlign:"center",border:"1px solid black"}}>Ganacias</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>Caja</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>13800</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>8530</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>4550</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>4550</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
          </tr>
          <tr>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>Mercaderias</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>8460</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>6000</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>2450</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>2450</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
          </tr>
          <tr>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>Deudores por venta</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>8100</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>5000</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>3100</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>3100</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
          </tr>
          <tr>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>Inmuebles</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>4000</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>4000</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>4000</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
          </tr>
          <tr>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>Proveedores</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>2500</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>2500</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>2500</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
          </tr>
          <tr>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>CMV</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>6000</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>6000</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>6000</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
          </tr>
          <tr>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>Ventas</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>8000</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>8000</td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}></td>
            <td style={{border:"1px solid grey",padding:"10px 7px"}}>8000</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default BalanceDeSumSal