import { StyledImg, StyledSection } from './styles'

export const ProductPicture = function({picture, price, prodname}) {
  
  return(
    <StyledSection>
      <StyledImg src={picture}/>
      <p to="/productinfo">{prodname}</p>
      <p>{`$ ${price}`}</p>
    </StyledSection>
  )
}