import axios from "axios"
import { useState } from "react"
import { CustomButton } from '../../Components/Button'
import { NavBar } from "../Navbar"
import { Dialog, DialogTitle } from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux"
import { changeAddress, changeError, changeNatId, changePhone } from "../../store/contactReducer"
import { StyledInputContact, StyledParagraph, StyledLabelContactForm } from "./styles"

export const ContactInfoForm = function({nombre, correo, userId, cedula, telefono, direccion}) {
  const { nationalid, address, phone } = useSelector(({contactReducer}) => ({
    nationalid: contactReducer.nationalid,
    address: contactReducer.address,
    phone: contactReducer.phone,
    error: contactReducer.error,
  }))

  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  function handleClose() {
    setOpen(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios({
        method: 'PUT',
        baseURL: process.env.REACT_APP_SERVER_URL,
        url: `/users/user/${userId}`,
        data: {
          nationalid: nationalid,
          address: address,
          phone: phone,
        }
      })
    }catch(error) {
      dispatch(changeError(error))
    }
    document.location.reload(true)
    return setOpen(false)
  }

  if(open === true) {
    return(
      <>
        <NavBar />
        <Dialog 
          repositionOnUpdate={false}
          style={{ padding: '20px 20px 20px 20px' }}
          fullWidth
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit}
        >
          <DialogTitle>Ingresa tu información</DialogTitle>
            <StyledLabelContactForm htmlFor='nombre'>Nombre</StyledLabelContactForm>
            <StyledParagraph
              id='nombre'
            >
              {nombre}
            </StyledParagraph>
            <StyledLabelContactForm htmlFor='correo'>Correo</StyledLabelContactForm>
            <StyledParagraph
              id='correo'
            >
              {correo}
            </StyledParagraph>
            <StyledInputContact
              style={{ margin: '0px 30px 0px 30px' }}
              margin='dense'
              type='text'
              id='cedula'
              value={nationalid}
              label='Cédula'
              onChange={e => dispatch(changeNatId(e.target.value))}
            />
            <StyledInputContact
              style={{ margin: '0px 30px 0px 30px' }}
              type='text'
              value={address}
              id='direccion'
              label='Dirección'
              onChange={e => dispatch(changeAddress(e.target.value))}
            />
            <StyledInputContact
              style={{ margin: '0px 30px 0px 30px' }}
              type='text'
              value={phone}
              id='telefono'
              label='Teléfono'
              onChange={e => dispatch(changePhone(e.target.value))}
            />
            <CustomButton
              Styles={{ margin: '0px 0px 0px 200px'}}
              Color='primary'
              type='submit'
              OnClick={handleSubmit}
            >
              Guardar Información
            </CustomButton>
        </Dialog>
      </>
    )
  }else if(open === false) {
    return(
      <>
        <NavBar />
        <form>
          <StyledLabelContactForm htmlFor='nombre'>Nombre</StyledLabelContactForm>
          <StyledParagraph
            id='nombre'
          >
            {nombre}
          </StyledParagraph>
          <StyledLabelContactForm htmlFor='correo'>Correo</StyledLabelContactForm>
          <StyledParagraph
            id='correo'
          >
            {correo}
          </StyledParagraph>
          <StyledLabelContactForm htmlFor='cedula'>Cédula</StyledLabelContactForm>
          <StyledParagraph 
            id='cedula' 
          >
            {cedula}
          </StyledParagraph>
          <StyledLabelContactForm htmlFor='direccion'>Dirección</StyledLabelContactForm>
          <StyledParagraph 
            id='direccion'
          >
            {direccion}
          </StyledParagraph>
          <StyledLabelContactForm htmlFor='telefono'>Teléfono</StyledLabelContactForm>
          <StyledParagraph
            id='telefono'
          >
            {telefono}
          </StyledParagraph>
        </form>
        <CustomButton
            Styles={{ margin: '0px 0px 0px 30px'}}
            type='button'
            OnClick={() => setOpen(true)}
            Variant='outlined'
          >
            Editar
        </CustomButton>
      </>
    )
  }
}