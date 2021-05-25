import axios from "axios"
import { useEffect } from "react"
import { Radio } from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux"
import { changeCategory, changeError } from "../../store/checkboxReducer"
import { StyledInputCategory, StyledSectionCategory } from "./styles"

function useApi() {
  const {
    error,
    categories,
  } = useSelector(({checkboxReducer}) => ({
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
  
  return { categories, error }
}

export function Categories({ changect, checked, gridPosition }) {
  const { categories, error } = useApi()
  if(error) return <p>Algo salió mal!</p> 
  return (
    <section>
      {!!categories && categories.length > 0 && categories.map((cat, i) => (
        <StyledSectionCategory
          cuartaColumna
          key={i}
        >
        <Radio 
          type='radio'
          key={`chk-${i}`}
          name='radio'
          id={cat.name}
          value={cat.name}
          onChange={changect}
          checked={checked === cat.name}
          
        />
        <label htmlFor={cat.name} key={i}>{cat.name}</label>
        </StyledSectionCategory>
      ))}
    </section>
  )
}