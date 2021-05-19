import axios from 'axios'
import { ContactInfoForm } from '../../Components/ContactInfoForm'
import { useEffect, useState } from 'react'

function useApi() {
  const userId = localStorage.getItem('userId')
  const [UserNames, setUserNames] = useState()
  

  useEffect(() =>  {
    async function getData() {
      try {
        const { data } = await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: '/users'
        })
        setUserNames(data)
      }catch(error){
        console.log(error)
      }
    }
    
    getData()
    
  }, [])
  
  return { userId, UserNames }
}

export const ContactInfoPage = function() {
  const { userId, UserNames } = useApi()
  console.log(UserNames)
  return(
    !!UserNames && UserNames.length > 0 && UserNames.map((inf) => {
      return inf._id === userId 
      ? <ContactInfoForm 
          nombre={inf.name} 
          correo={inf.email} 
          userId={inf._id} 
          cedula={inf.nationalid}
          telefono={inf.phone}
          direccion={inf.address}
        />
      :
        ''
      })
  )
}