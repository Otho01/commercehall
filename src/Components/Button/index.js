import { StyledButton } from './styles'

export const CustomButton = function({children, OnClick, Color, Variant, Styles}) {
  return(
    <StyledButton
      style={Styles}
      type='button'
      variant={Variant}
      onClick={OnClick}
      color={Color}
    >
      { children } 
    </StyledButton>
  )
}