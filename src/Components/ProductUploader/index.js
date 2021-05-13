import axios from 'axios'
import { useState } from 'react'
import { Categories } from '../Categories'
import { NavBar } from '../Navbar'

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
      <form onSubmit={handleSubmit}>
        <label htmlFor='file'>Agregar Foto</label>
        <input
          type='file'
          accept='image/*'
          name='file'
          id='file'
          onChange={handleChange}
        />
        {preview && <img src={preview} alt='File preview' />}
        <label htmlFor='description'>Descripción del producto</label>
        <textarea
          type='text'
          name='description'
          id='description'
          onChange={e => setDescription(e.target.value)}
        />
        <label htmlFor='price'>Precio</label>
        <input
          type='text'
          name='price'
          id='price'
          onChange={e => setPrice(e.target.value)}
        />
        <label htmlFor='name'>Nombre del producto</label>
        <input
          type='text'
          name='name'
          id='name'
          onChange={e => setName(e.target.value)}
        /> 
        <label htmlFor='category'>Categoría</label>
        <p>{category}</p>
        <Categories changect={e => setCategory(e.target.value)} checked={category} />
        <button>Enviar</button>
      </form>
    </>
  )
}
