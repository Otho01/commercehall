import { StyledButton } from './styles'

export const CustomButton = function({children, OnClick, Color, Variant, Styles, Type}) {
  return(
    <StyledButton
      style={Styles}
      type={Type}
      variant={Variant}
      onClick={OnClick}
      color={Color}
    >
      { children } 
    </StyledButton>
  )
}