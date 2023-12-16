import HeaderSection from "../../components/HeaderSection"
import { MdTableView } from "react-icons/md";


const SaldosMensuales = () => {
  return (
    <>
      <HeaderSection
        name='Saldos Mensuales'
        IconS={<MdTableView style={{fontSize:28}}/>}
        //actionName={'Nuevo Presupuestos'}
        //action={newPresupuesto}
      />
      <table style={{width:"97%",margin:"0 auto"}}>
        <thead>
          <tr>
            <th style={{backgroundColor:"white",width:"60px"}}>Codigo</th>
            <th style={{backgroundColor:"white"}}>Nombre</th>
            <th style={{backgroundColor:"white"}}>Mayo 2023</th>
            <th style={{backgroundColor:"white"}}>Junio 2023</th>
            <th style={{backgroundColor:"white"}}>Julio 2023</th>
            <th style={{backgroundColor:"white"}}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>Caja</td>
            <td>25000</td>
            <td>25000</td>
            <td>50000</td>
            <td>100000</td>
          </tr>
          <tr>
            <td></td>
            <td>Banco</td>
            <td>25000</td>
            <td>25000</td>
            <td>50000</td>
            <td>100000</td>
          </tr>
          <tr>
            <td></td>
            <td>Activo corriente</td>
            <td>25000</td>
            <td>25000</td>
            <td>50000</td>
            <td>100000</td>
          </tr>
          <tr>
            <td></td>
            <td>Deudores por venta</td>
            <td>25000</td>
            <td>25000</td>
            <td>50000</td>
            <td>100000</td>
          </tr>
          <tr>
            <td></td>
            <td>IVA Credito Fiscal</td>
            <td>25000</td>
            <td>25000</td>
            <td>50000</td>
            <td>100000</td>
          </tr>
          <tr>
            <td></td>
            <td>Proveedores</td>
            <td>25000</td>
            <td>25000</td>
            <td>50000</td>
            <td>100000</td>
          </tr>
          <tr>
            <td></td>
            <td>Cheques diferidos</td>
            <td>25000</td>
            <td>25000</td>
            <td>50000</td>
            <td>100000</td>
          </tr>
          <tr>
            <td></td>
            <td>IVA Debito Fiscal</td>
            <td>25000</td>
            <td>25000</td>
            <td>50000</td>
            <td>100000</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default SaldosMensuales