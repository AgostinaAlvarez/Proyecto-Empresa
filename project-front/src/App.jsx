import { useContext, useEffect, useState } from 'react'
import './App.css'
import AppRouter from './router/AppRouter'
import Loading from './components/Loading'
import { Route, Routes } from 'react-router-dom'
import { AppContext } from './context/AppContext'
import axios from 'axios'
import { serverURL } from '../protectedRoutes'


function App() {

  const { setLogged } = useContext(AppContext);
  const [ loading,setLoading ] = useState(true);

  const getTknData = () => {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('tkn='))
    return jwtCookie ? true : null
  }


  async function verifyTkn () {
    try {
      const response = await axios.get(`${serverURL}/api/check-auth`, { withCredentials: true })
      if(response.data.ok === true){
        //token autorizado
        setLogged(true)
        setLoading(false)
      }else{
        //token no autorizado
        setLogged(false)
        setLoading(false)
      }
    } catch (err) {
      //token invalido
      setLogged(false)
      setLoading(false)
    }
  }
  
  useEffect(() => {
    const jwtValue = getTknData()
    if (jwtValue) {
      //Hay un token, hay que verificarlo
      verifyTkn()
    } else {
      //No hay token en las cookies
      setLogged(false)
      setLoading(false)
    }
  }, [])
  
  

  return (
    <>
      {
        loading === true ?
        <Routes>
          <Route path='/*' element={<Loading/>}/>
        </Routes>
        :
        <AppRouter/>
      }
    </>
  )
}

export default App
