import styled from 'styled-components'
import { TextareaAutosize, TextField } from '@material-ui/core'

export const StyledFormUploader = styled.form`
  display: grid;
  grid-template-columns: repeat(4, 25%);
`

export const StyledTextArea = styled(TextareaAutosize)`
  grid-column: ${props => props.primerColumna ? '1' : props.segundaColumna ? '2': ''};
  height: 242px;
  resize: none;
  display: block;
  margin-left: 50px;
  position: relative;
`

export const StyledInputUploader = styled(TextField)`
  grid-column: ${props => props.primerColumna ? '1' : props.segundaColumna ? '2': ''};
  marginTop: ${props => props.needsTopMargin ? '300px' : props.negativeMargin ? '-100px': ''};
  margin-left: 20px;
`

export const StyledLabelUploader = styled.label`
  grid-column: ${props => props.primerColumna ? '1' : props.segundaColumna ? '2': '4'};  
  margin-top: ${props => props.needsTopMargin ? '-170px': props.positiveTopMarginLabel ? '50px' : '10px'};
  margin-bottom: ${props => props.needsBottomMargin ? '100px': '10px'}
  margin-left: ${props => props.needsLeftMargin ? '29px': '10px'}
  
`

export const StyledSectionUploader = styled.section`
  grid-column: ${props => props.primerColumna ? '1' : props.segundaColumna ? '2': '4'};
  margin-bottom: ${props => props.needsBotMargin ? '20px': '10px'};
  margin-top: ${props => props.needsTopMargin ? '-200px': props.positiveTopMargin ? '100px': '10px' };
  display: ${props => props.displayContents ? 'contents': ''};
  margin-left: ${props => props.needsMarginLeft ? '100px': ''};
  padding-left: ${props => props.positivePadding ? '50px': ''};
`

export const StyledImg = styled.img`
  max-width: 300px;
`
