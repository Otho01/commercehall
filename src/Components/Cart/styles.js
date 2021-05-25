import styled from 'styled-components'
import Button from '@material-ui/core/Button'

export const StyledButtonID = styled(Button)`
  display: flex;
  justify-content: space-between;
`
export const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica;
  border-Bottom: 20px;S
`

export const StyledSection = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
  
  .paragraphs {
    display: flex;
    justify-content: center;
    flex: 1;
  }
`
export const StyledSectionButtons = styled.section`
  display: flex;
  flex-direction: row;
`

export const StyledParagraphC = styled.p`
  justify-content: left;
`