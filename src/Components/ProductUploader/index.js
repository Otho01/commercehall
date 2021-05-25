import axios from 'axios'
import { useState } from 'react'
import { NavBar } from '../Navbar'
import { Categories } from '../Categories'
import { StyledInputUploader, StyledLabelUploader, StyledTextArea, StyledFormUploader, StyledSectionUploader, StyledImg } from './styles'

export function ProductUploader() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')

  function handleChange(e){
    const file = e.target.files[0]
    if (file) {
      readFile(file)
      setFile(e.target.files)
    }
  }

  function readFile(file) {
    const reader = new FileReader()
    
    reader.readAsDataURL(file)

    reader.onload = e => setPreview(e.target.result)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const token = localStorage.getItem('token')

    const form = new FormData()
    form.append('name', name)
    form.append('price', price)
    form.append('description', description)
    form.append('category', category)
    if(file) {
      form.append('productPicture', file[0], file[0].name)
    }

    await axios({
      method: 'POST',
      baseURL: 'http://localhost:8000',
      url: '/products',
      data: form,
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    })
  }
  
  return (
    <>
      <NavBar/>
      <StyledFormUploader onSubmit={handleSubmit}>
        <StyledLabelUploader 
          needsBottomMargin
          primerColumna
          htmlFor='file'
        >
            Agregar Foto
        </StyledLabelUploader>
        <StyledInputUploader
          variant='filled'
          primerColumna
          type='file'
          accept='image/*'
          name='file'
          id='file'
          onChange={handleChange}
        />
        <StyledSectionUploader
          primerColumna
        >
          {preview && <StyledImg src={preview} alt='File preview' />}
        </StyledSectionUploader>
        <StyledSectionUploader
          needsMarginLeft
          segundaColumna
          displayContents
        >
          <StyledTextArea
            segundaColumna
            type='text'
            name='description'
            id='description'
            rowsMin='5'
            placeholder='Ingrese una descripción'
            onChange={e => setDescription(e.target.value)}
          />
          <StyledInputUploader
            style={{ marginLeft: '50px'}}
            variant='outlined'
            segundaColumna
            type='text'
            name='price'
            id='price'
            onChange={e => setPrice(e.target.value)}
            placeholder='Ingrese un precio'
          />
          <StyledInputUploader
            style={{marginLeft: '50px'}}
            placeholder='Ingrese el nombre de producto'
            variant='outlined'
            segundaColumna
            type='text'
            name='name'
            id='name'
            onChange={e => setName(e.target.value)}
          />
        </StyledSectionUploader>
        <StyledLabelUploader
          htmlFor='category'
          needsTopMargin
        >
          Categoría
        </StyledLabelUploader>
        <StyledSectionUploader
          needsBotMargin
          needsTopMargin
        >
          <p>{category}</p>
          <Categories changect={e => setCategory(e.target.value)} checked={category} />
        </StyledSectionUploader>
        <StyledSectionUploader>
          <button>Enviar</button>
        </StyledSectionUploader>
      </StyledFormUploader >
    </>
  )
}
