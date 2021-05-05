import { StyledImg, StyledSection } from './styles'
import { Link } from 'react-router-dom'

export const ProductPicture = function({Picture}) {
  return(
    <StyledSection>
      <StyledImg src={Picture}/>
      <Link to="/">Nombre del producto</Link>
      <p>$Precio</p>
    </StyledSection>
  )
}