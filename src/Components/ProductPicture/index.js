import { StyledImg, StyledSection } from './styles'
import { Link } from 'react-router-dom'

export const ProductPicture = function({picture, price, prodname}) {
  
  return(
    <StyledSection>
      <StyledImg src={picture}/>
      <Link to="/">{prodname}</Link>
      <p>{`$ ${price}`}</p>
    </StyledSection>
  )
}