import axios from "axios"
import { useEffect } from "react"
import { changeCategory, changeError } from "../../store/checkboxReducer"
import { useDispatch, useSelector } from "react-redux"

function useApi() {
  const {
    value,
    error,
    categories,
  } = useSelector(({checkboxReducer}) => ({
    value: checkboxReducer.value,
    error: checkboxReducer.error,
    categories: checkboxReducer.categories,
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios({
          method: 'GET',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: '/categories',
        })
        dispatch(changeCategory(data))
      } catch(error){
        dispatch(changeError(error))
      }
    }

    getCategories()
    
  }, [])
  
  return { categories, value, error }
}

export function Categories({changect, checked}) {
  const { categories, value, error } = useApi()
  if(error) return <p>Algo salió mal!</p> 
  return (
    <section>
      {!!categories && categories.length > 0 && categories.map((cat, i) => (
        <section key={i}>
        <input 
          type='radio'
          key={`chk-${i}`}
          name='radio'
          id={cat.name}
          value={cat.name}
          onChange={changect}
          checked={checked === cat.name}
        />
        <label htmlFor={cat.name} key={i}>{cat.name}</label>
        </section>
      ))}
    </section>
  )
}