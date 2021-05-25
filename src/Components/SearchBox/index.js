import { CustomButton } from "../Button"
import { StyledSearch } from "./styles"

export const SearchBox = function() {
  return(
    <section>
      <StyledSearch type='text'></StyledSearch>
      <CustomButton children='Buscar' />
    </section>
    )
}
