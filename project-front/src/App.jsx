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

  useEffect(() => {
    const jwtValue = getTknData()
    jwtValue ? verifyTkn() : denyAcces ()
  }, [])

  function authAcces (){
    setLogged(true)
    setLoading(false)
  }

  function denyAcces (){
    setLogged(false)
    setLoading(false)
  }
  
  const getTknData = () => {
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('tkn='))
    return jwtCookie ? true : null
  }

  async function verifyTkn () {
    try {
      const response = await axios.get(`${serverURL}/api/check-auth`, { withCredentials: true })
      response.data.ok === true ? authAcces() : denyAcces()
    } catch (err) {
      /*denegar acceso*/
      denyAcces()
    }
  }  

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
