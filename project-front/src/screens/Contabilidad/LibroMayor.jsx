import React from 'react'
import HeaderSection from '../../components/HeaderSection'
import { MdTableView } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const LibroMayor = () => {
  const navigate = useNavigate()
  function nuevoLibroMayor (){
    navigate('/libro-mayor/nuevo')
  }
  return (
    <>
      <HeaderSection
        name='Libro Mayor'
        IconS={<MdTableView style={{fontSize:28}}/>}
        actionName={'Nuevo Libro Mayor'}
        action={nuevoLibroMayor}
      />
      <div>Filtrar</div>
      <table className='tableFactura' style={{marginBottom:30}}>
        <thead>
          <tr>
            <th>Nmro.</th>
            <th>Ref.</th>
            <th>Fecha inicial</th>
            <th>Fecha final</th>
          </tr>
        </thead>
      </table>
    </>
  )
}

export default LibroMayor