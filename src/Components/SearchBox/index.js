import { useDispatch, useSelector } from "react-redux"
import { changeSearch } from "../../store/searchReducer"
import { CustomButton } from "../Button"
import { StyledSearch } from "./styles"


export const SearchBox = function({onClickFunction, onChangeFunction}) {
  const dispatch = useDispatch()
  const { search } = useSelector(({searchReducer}) => ({
    search: searchReducer.search,
  }))

  return(
    <section>
      <StyledSearch 
        type='text'
        onChange={onChangeFunction}
        >

      </StyledSearch>
      <CustomButton 
        Variant='outlined' 
        children='Buscar' 
        Styles={{margin: '0 30px 0 0'}}
        OnClick={onClickFunction}
        Type='submit'
      />
    </section>
    )
}
