/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import HeaderSection from '../components/HeaderSection'
import { BsBank } from "react-icons/bs";
import { AppContext } from '../context/AppContext';
import { IoHomeOutline } from "react-icons/io5";
import LineChart from '../LineChart';
import axios from 'axios';
import { MdHeight } from 'react-icons/md';


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import { FaHome } from "react-icons/fa";
import Loading from '../components/Loading';

const Home = () => {
  const { ordenarFechas,setPagos,pagos,gananciasPorFacturas,montoDeInversion,ingresos,setIngresos,setGastos,setGananciasPorFacturas,cobranzas,setCobranzas,gastos,productos } = useContext(AppContext);
  const [data,setData] = useState()

  const [gananciaNeta,setGananciaNeta] = useState(0);
  const [ ingresosReales,setIngresosReales ] = useState(0);
  const [ costoDeLosBienesVendidos,setCostoDeLosBienesVendidos ] = useState(0);
  const [ capitalParaReinversion,setCapitalParaReinversion ] = useState(0);
  const [ watch,setWatch ] = useState(false)
  const [ loading,setLoading ] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date('2022-12-01')); // Aquí asignamos la fecha por defecto
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [selectedDate2, setSelectedDate2] = useState(new Date('2023-03-20')); // Aquí asignamos la fecha por defecto
  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  useEffect(() => {
    //console.log('hola')
    //console.log(ingresos)
    //console.log(gastos)
    getData()
  }, [])
  
  async function getData (){
    try{
      await getBalance()
      await getCobranzas()
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
      setWatch(true)
    }
  }
  
  async function getBalance(){
    try{
      const response = await axios.get('http://localhost:3000/api/balance');
      setIngresos(response.data.ingresos)
      setGastos(response.data.gastos);
      setGananciasPorFacturas(response.data.gananciasPorFacturas);
      //console.log(response.data.gananciasPorFacturas)

      let totalGananciasPorFacturas = 0;
      let totalIngresosReales = 0;
      let totalCostosBienesVendidos = 0
      let capitalReinversion = 0

      response.data.gananciasPorFacturas.forEach(element => {
        totalGananciasPorFacturas = totalGananciasPorFacturas + (element.gananciaNeta * element.cantidad)
        totalIngresosReales = totalIngresosReales + element.total 
        totalCostosBienesVendidos = totalCostosBienesVendidos + element.costo
        capitalReinversion = capitalReinversion + (element.costo * element.cantidad) 
      });
      
      
      setGananciaNeta(totalGananciasPorFacturas)
      setIngresosReales(totalIngresosReales)
      setCostoDeLosBienesVendidos(totalCostosBienesVendidos)
      setCapitalParaReinversion(capitalReinversion)
    }catch(err){
      console.log(err)
    }
  }
  
  async function getCobranzas (){
    try{
      const response = await axios.get('http://localhost:3000/api/cobranzas');
      const responsePagos = await axios.get('http://localhost:3000/api/pagos');
      //console.log('PAGOS')
      //console.log(responsePagos.data.pagos);
      //setPagos(response.data.pagos);
      setCobranzas(response.data.cobranzas);
      
      let fechas = [];
      let resultadoIngresos = [];
      let resultadoGastos = [];
      const totalsByDate = {};
    
      response.data.cobranzas.forEach(item => {
        const date = item.fecha.split('T')[0];
        if (totalsByDate[date]) {
          totalsByDate[date] += item.total;
        } else {
          totalsByDate[date] = item.total;
        }
      });

      responsePagos.data.pagos.forEach(item => {
        const date = item.fecha.split('T')[0];
        if (totalsByDate[date]) {
          totalsByDate[date] += item.total;
        } else {
          totalsByDate[date] = item.total;
        }
      });

      
      const resultArray = Object.keys(totalsByDate).map(date => ({
        fecha: date,
        total: totalsByDate[date],
      }));
      
      console.log(resultArray)
      resultArray.forEach(element => {
        fechas.push(element.fecha);
        resultadoIngresos.push(element.total);
      });

      const modifyPagos = responsePagos.data.pagos.map((item)=>{
        return {total:item.total,fecha:item.fecha.slice(0, 10),tipo:"Pago"}
      })
      const modifyCobranzas = response.data.cobranzas.map((item)=>{
        return {total:item.total,fecha:item.fecha.slice(0, 10),tipo:"Ingreso"}
      })
      
      let completo = ordenarFechas([...modifyPagos,...modifyCobranzas])
      completo = completo.reverse()
      console.log('array completo')
      console.log(completo)
      console.log('array de ingresos')
      const ingg = completo.map((item)=>{
        if(item.tipo === "Ingreso"){
          return item.total
        }
        return 0
      })
      console.log(ingg)
      const gastt = completo.map((item)=>{
        if(item.tipo === "Pago"){
          return item.total
        }
        return 0
      })
      console.log(gastt)
      console.log(fechas)
    
      const datas = {
        labels: fechas.reverse(),
        datasets: [
          {
            label: 'Ingresos',
            data: ingg,
            fill: false,
            borderColor: '#40DAB2',
            tension: 0.1,
          },
          {
            label: 'Gastos',
            data: gastt, 
            fill: false,
            borderColor: '#FF8F8F',
            tension: 0.1,
        },
        ],
      };
      setData(datas)
    }catch(err){
      console.log(err)
    }
  }

  function valorDeInventario (){
    let total = 0;
    productos.forEach(element => {
      total = total + (element.cantidad * element.costoInicial)
    });
    return total
  }



  return (
    <>
      {
        loading === true ?
        <Loading/>
        :
        <>
          <div className='homeMainContent'>
            <HeaderSection
              name={'Inicio'}
              IconS={<FaHome style={{fontSize:36}}/>}
            />
            <div className='cardHome cardShadow' style={{display:"flex",flexDirection:"column",alignItems:"center",width:"780px",marginBottom:"30px"}}>
              <div>Capital Actual</div>
              <span style={{fontSize:30}}>${(ingresos+montoDeInversion-gastos).toFixed(2)}</span>
            </div>
            <div className='formGrid' style={{width:"100%",
            border:"none",
            boxSizing:"border-box",alignItems:"end",margin:"70px 0"}}>
              <div style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <div className='cardHome cardShadow' style={{color:"#379237"}}>
                  <div style={{marginBottom:10,color:"black"}}>Ingresos</div>
                  <div style={{fontSize:25}}>${ingresos.toFixed(2)}</div>
                </div>
                <div className='cardHome cardShadow' style={{color:"#FF7000"}}>
                  <div style={{marginBottom:10,color:"black"}}>Egresos</div>
                  <div style={{fontSize:25}}>${gastos.toFixed(2)}</div>
                </div>
                <div className='cardHome cardShadow' style={{color:"#FFA41B"}}>
                  <div style={{marginBottom:10,color:"black"}}>Capital Iniciall</div>
                  <div style={{fontSize:25}}>${montoDeInversion.toFixed(2)}</div>
                </div>
              </div>
              <div>
                <div style={{height:70, 
                  display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                  <div style={{display:"flex",flexDirection:"column",}}>
                    <span>Desde</span>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de la fecha
                    />
                  </div>
                  <div style={{display:"flex",flexDirection:"column",}}>
                    <span>Hasta</span>


                    <DatePicker
                      selected={selectedDate2}
                      onChange={handleDateChange2}
                      dateFormat="dd/MM/yyyy" // Puedes personalizar el formato de la fecha
                    />
                  </div>
                  <div style={{display:"flex",alignItems:"flex-end",height:"42.78px"}}>
                    <button>Filtrar</button>
                  </div>
                </div>
                {
                  
                  watch === true ?
                  <LineChart data1={data}/>
                  :
                  <></>
                  
                }
                
              </div>
            </div>
          </div>
          <aside className='homeMainAside'>
            <div>Calendario</div>
            <div>Tareas programadas</div>
          </aside>
          {
            /*
            
            
            
            
            
            <div className='cardHome cardShadow' style={{display:"flex",flexDirection:"column",alignItems:"center",width:"780px",marginTop:"30px"}}>
              <div style={{marginBottom:10}}>Ganacia neta</div>
              <span style={{fontSize:30}}>${gananciaNeta.toFixed(2)}</span>
            </div>
            <div className='cardHome cardShadow' style={{display:"flex",flexDirection:"column",alignItems:"center",width:"780px",marginTop:"30px"}}>
              <div style={{marginBottom:10}}>Capital para reinversion</div>
              <span style={{fontSize:30}}>${capitalParaReinversion.toFixed(2)}</span>
            </div>
  
            <div className='cardHome cardShadow' style={{display:"flex",flexDirection:"column",alignItems:"center",width:"780px",marginTop:"30px"}}>
              <div style={{marginBottom:10,fontWeight:"600"}}>ROI (Retorno de inversion)</div>
              <div style={{marginBottom:5}}>ROI = (Ganancia Neta / Capital Inicial) * 100</div>
              <div style={{marginBottom:10}}>ROI = (${gananciaNeta.toFixed(2)} / ${montoDeInversion} ) * 100</div>
              <span style={{fontSize:30}}>{((gananciaNeta/montoDeInversion)*100).toFixed(2)} %</span>
            </div>
  
            <div className='cardHome cardShadow' style={{display:"flex",flexDirection:"column",alignItems:"center",width:"780px",marginTop:"30px"}}>
              <div style={{marginBottom:10,fontWeight:"600"}}>Margen de Beneficio Bruto</div>
              <div style={{marginBottom:5}}>Margen de Beneficio Bruto = (Ingresos - Costo de los Bienes Vendidos) * 100 / Ingresos</div>
              <div style={{marginBottom:10}}>Margen de Beneficio Bruto = ( ${ingresos.toFixed(2)} - ${costoDeLosBienesVendidos.toFixed(2)} ) * 100 / ${ingresos.toFixed(2)}</div>
              <span style={{fontSize:30}}>{ ((ingresos - costoDeLosBienesVendidos)/ingresos * 100).toFixed(2) } %</span>
            </div>
            
  
            <div className='cardHome cardShadow' style={{display:"flex",flexDirection:"column",alignItems:"center",width:"780px",marginTop:"30px"}}>
              <div style={{marginBottom:10,fontWeight:"600"}}>Margen de Beneficio Neto</div>
              <div style={{marginBottom:5}}> Margen de Beneficio Neto = (Ganancia Neta * 100) / Ingresos Totales</div>
              <div style={{marginBottom:10}}>ROI = (${gananciaNeta.toFixed(2)} / ${montoDeInversion} ) * 100</div>
              <span style={{fontSize:30}}>{((gananciaNeta * 100)/ingresos).toFixed(2)}%</span>
            </div>
  
            <div>Productos facturados </div>
            <table className='tableFactura'>
              <thead>
                <tr>
                  <th>Costo</th>
                  <th>Precio de venta</th>
                  <th>Descuento Aplicado x unidad</th>
                  <th>Cantidad Facturada</th>
                  <th>Precio x unidad</th>
                  <th>Ganancia Neta x unidad</th>
                  <th>Ganancia Neta TOTAL</th>
                  <th>Total facturado SIN impuesto</th>
                </tr>
              </thead>
              <tbody>
                {
                  gananciasPorFacturas.length === 0 ?
                  <></>
                  :
                  <>
                    {
                      
                      gananciasPorFacturas.map((item,index)=>
                      <tr key={index}>
                        <td>${item.costo.toFixed(2)}</td>
                        <td>${item.precioDeVenta.toFixed(2)}</td>
                        <td>${((item.descuento)/item.cantidad).toFixed(2)}</td>
                        <td>{item.cantidad}</td>
                        <td>${item.precioPorProducto.toFixed(2)}</td>
                        <td>${item.gananciaNeta.toFixed(2)}</td>
                        <td>${(item.gananciaNeta * item.cantidad).toFixed(2)}</td>
                        <td>${item.total.toFixed(2)}</td>
                      </tr>
                      )
                      
                    }
                  </>
                }
              </tbody>
            </table>
            */
          }
        </>
      }
    </>
  )
}

export default Home