/* eslint-disable no-unused-vars */
import HeaderSection from "../../components/HeaderSection"
import { LiaClipboardListSolid } from "react-icons/lia";
import { AiOutlineEye,AiOutlineEdit,AiOutlineSearch } from "react-icons/ai";
import { FiPrinter } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Formularios = () => {
  function newFormulario (){
    console.log('nuevo formulario')
  }
  const formularios = [
    {categoria:'Inspección de Maquinaria',fecha:'2023-02-13'},{categoria:'Orden de trabajo',fecha:'2023-02-13'},{categoria:'Entrega',fecha:'2023-02-13'}
  ]
  return (
    <>
      <HeaderSection
        name='Formularios'
        IconS={<LiaClipboardListSolid style={{fontSize:28}}/>}
        actionName={'Nuevo Formulario'}
        action={newFormulario}
      />
      <table className='tableFactura'>
        <thead>
          <tr>
            <th>Clasificacion</th>
            <th>Fecha de emision</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            
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
          
          }
        </tbody>
      </table>
    </>
  )
}

export default Formularios