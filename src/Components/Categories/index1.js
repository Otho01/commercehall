// import axios from "axios"
// import { useEffect } from "react"
// import { Checkbox } from "../Checkbox"
// import { changeCategory, changeError } from "../../store/checkboxReducer"
// import { useDispatch, useSelector } from "react-redux"



// function useApi() {
//   const {
//     value,
//     error,
//     categories,
//   } = useSelector(({checkboxReducer}) => ({
//     value: checkboxReducer.value,
//     error: checkboxReducer.error,
//     categories: checkboxReducer.categories,
//   }))

//   const dispatch = useDispatch()

//   useEffect(() => {
//     async function getCategories() {
//       try {
//         const { data } = await axios({
//           method: 'GET',
//           baseURL: process.env.REACT_APP_SERVER_URL,
//           url: '/categories',
//         })
//         dispatch(changeCategory(data))
//         console.log(data)
//       } catch(error){
//         dispatch(changeError(error))
//       }
//     }

    getCategories()

    return () => {
      
    }
  }, [])
  
  return { categories, value, error }
}

export function Categories({changect, isChecked}) {
  const { categories, value, error } = useApi()
  if(error) return <p>Algo salió mal!</p> 
  return (
    <section>
      {!!categories && categories.length > 0 && categories.map((cat, i) => (
        <section>
        <input 
          type='checkbox'
          key={`chk-${i}`}
          name={cat.name}
          value={cat.name}
          onChange={changect}
          checked={isChecked}
        />
        <label htmlFor={cat.name}>{cat.name}</label>
        </section>
      ))}
    </section>
  )
}