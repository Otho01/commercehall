import { Button } from "../Button"
import { StyledSearch } from "./styles"

export const SearchBox = function() {
  return(
    <section>
      <StyledSearch type='text'></StyledSearch>
      <Button children='Buscar' />
    </section>
    )
}
