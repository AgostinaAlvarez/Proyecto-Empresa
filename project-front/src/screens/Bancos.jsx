/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { BsBank } from "react-icons/bs";
import HeaderSection from '../components/HeaderSection';
import { AppContext } from '../context/AppContext';


const Bancos = () => {
  const { bancos } = useContext(AppContext);

  return (
    <>
      <HeaderSection
        name={'Bancos'}
        IconS={<BsBank style={{fontSize:25}}/>}
        //actionName={'Nueva Factura'}
        //action={nuevaFactura}
      />
      <div style={{width:"100%"}}>
        {
          bancos.map((item,index)=>
          <div style={{marginBottom:15,marginTop:15}} className='cardBancos' key={index}>
            <div>{item.entidad}</div>
            <div>{item.tipo}</div>
            <div>Saldo: ${item.saldo.toFixed(2)}</div>
          </div>
          )
        }
      </div>
      {
        /*
          <div className='formGrid' style={{width:"100%",boxSizing:"border-box"}}>
            <div style={{border:"1px solid black"}}>
              <div className='cardBancos'>
                <div>Ingresos</div>
                <h2 style={{fontSize:30}}>${ingresos.toFixed(2)}</h2>
              </div>
              <div className='cardBancos'>
                <div>Egresos</div>
                <h2 style={{fontSize:30}}>$0</h2>
              </div>
            </div>
            <div>
              Grafico
            </div>
          </div>
        */
      }
    </>
  )
}

export default Bancos