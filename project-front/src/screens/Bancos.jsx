/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import { BsBank } from "react-icons/bs";
import HeaderSection from '../components/HeaderSection';
import { AppContext } from '../context/AppContext';


const Bancos = () => {
  const { bancos } = useContext(AppContext);
  
  useEffect(() => {
    console.log(bancos)
  }, [])
  
  
  function agregarCta (){
    console.log('agregar')

  }
  return (
    <>
      <HeaderSection
        name={'Bancos'}
        IconS={<BsBank style={{fontSize:25}}/>}
        actionName={'Agregar nueva cuenta bancaria'}
        action={agregarCta}
      />
      <div className='bancosGrid'>
        {
          bancos.map((item,index)=>
          <div className='cardBancos cardShadow' key={index}>
            {
              item.tipo === "caja chica" ?
              <>
                <div>
                  <h3>{item.tipo}</h3>
                  <div>Saldo: ${item.saldo.toFixed(2)}</div>
                </div>
                <div style={{display:"flex",alignItems:"flex-end"}}>
                  <button style={{height:"fit-content"}}>Ver movimientos</button>
                </div>
              </>
              :
              <>
                <div>
                  <h3>{item.entidad}</h3>
                  <div>{item.tipo}</div>
                  <div>CBU: {item.nmroDeCuenta}</div>
                  <div>Saldo: ${item.saldo.toFixed(2)}</div>
                </div>
                <div style={{display:"flex",alignItems:"flex-end"}}>
                  <button style={{height:"fit-content"}}>Ver movimientos</button>
                </div>
              </>
            }
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