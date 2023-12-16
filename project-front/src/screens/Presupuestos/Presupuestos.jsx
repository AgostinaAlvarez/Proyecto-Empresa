import HeaderSection from "../../components/HeaderSection"
import { CiViewList } from "react-icons/ci";


const Presupuestos = () => {
  function newPresupuesto (){
    console.log('presuepuesto')
  }

  return (
    <>
      <HeaderSection
        name='Presupuestos'
        IconS={<CiViewList style={{fontSize:28}}/>}
        actionName={'Nuevo Presupuestos'}
        action={newPresupuesto}
      />
      <table className='tableFactura'>
        <thead>
          <tr>
            <th>Numero</th>
            <th>Cliente</th>
            <th>Creacion</th>
            <th>Vencimiento</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            /*
            formularios.length !== 0 ?
            <>
              {formularios.map((item, index) => (
                <tr className='tr-list' key={index}>
                  <td>{item.categoria}</td>
                  <td>{item.fecha}</td>
                  <td>
                    <div style={{display:"flex",fontSize:16,gap:5,alignItems:"center",boxSizing:"border-box",padding:"0px 10px"}}>
                      <MdOutlineRemoveRedEye/>
                      <FiPrinter />
                    </div>
                  </td>
                </tr>
              ))}
            </>  
            :
            <></>
            */
          }
        </tbody>
      </table>
    </>
  )
}

export default Presupuestos