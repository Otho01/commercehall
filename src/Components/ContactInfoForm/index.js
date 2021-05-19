import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeAddress, changeError, changeNatId, changePhone } from "../../store/contactReducer"
import { NavBar } from "../Navbar"

export const ContactInfoForm = function({nombre, correo, userId, cedula, telefono, direccion}) {
  const { nationalid, address, phone, error } = useSelector(({contactReducer}) => ({
    nationalid: contactReducer.nationalid,
    address: contactReducer.address,
    phone: contactReducer.phone,
    error: contactReducer.error,
  }))
  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch()

  async function handleSubmit(e) {
    e.preventDefault()
    setEdit(false)
    try {
      const { data } = await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/users/user/${userId}`,
        data: {
          nationalid: nationalid,
          address: address,
          phone: phone,
        }
      })
      console.log(data)
    }catch(error) {
      dispatch(changeError(error))
    }
  }

  if(edit === true) {
    return(
      <>
        <NavBar />
        <form onSubmit={handleSubmit}>
          <label htmlFor='nombre'>Nombre</label>
          <p
            id='nombre'
          >
            {nombre}
          </p>
          <label htmlFor='correo'>Correo</label>
          <p
            id='correo'
          >
            {correo}
          </p>
          <label htmlFor='cedula'>Cédula</label>
          <input
            type='text'
            id='cedula'
            value={nationalid}
            onChange={e => dispatch(changeNatId(e.target.value))}
          />
          <label htmlFor='direccion'>Dirección</label>
          <input
            type='text'
            value={address}
            id='direccion'
            onChange={e => dispatch(changeAddress(e.target.value))}
          />
          <label htmlFor='telefono'>Teléfono</label>
          <input
            type='text'
            value={phone}
            id='telefono'
            onChange={e => dispatch(changePhone(e.target.value))}
          />
          <button
            type='submit'
            onClick={handleSubmit}
          >
            Guardar Información
          </button>
        </form>
        <button
            type='button'
            onClick={(e) => setEdit(false)}
          >
            Cancelar
          </button>
      </>
    )
  }else if(edit === false) {
    return(
      <>
        <NavBar />
        <form>
          <label htmlFor='nombre'>Nombre</label>
          <p
            id='nombre'
          >
            {nombre}
          </p>
          <label htmlFor='correo'>Correo</label>
          <p
            id='correo'
          >
            {correo}
          </p>
          <label htmlFor='cedula'>Cédula</label>
          <p 
            id='cedula' 
          >
            {cedula}
          </p>
          <label htmlFor='direccion'>Dirección</label>
          <p 
            id='direccion'
          >
            {direccion}
          </p>
          <label htmlFor='telefono'>Teléfono</label>
          <p
            id='telefono'
          >
            {telefono}
          </p>
        </form>
        <button
            type='button'
            onClick={() => setEdit(true)}
          >
            Editar
        </button>
      </>
    )
  }
}