import NumberFormat from 'react-number-format'
import { StyledImg, StyledSection } from './styles'

export const ProductPicture = function({picture, price, prodname}) {
  
  return(
    <StyledSection>
      <StyledImg src={picture} />
      <p>{prodname}</p>
      <NumberFormat value={price} displayType='text' thousandSeparator={true} prefix={'$'} />
    </StyledSection>
  )
}