import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveTransaction } from "../../store/transactionReducer";
import queryString from "query-string";
import { NavBar } from "../../Components/Navbar";
import { StyledH2 } from "./styles";
import { CustomButton } from "../../Components/Button";

export function TransactionResult() {
  const location = useLocation()

  const dispatch= useDispatch()
  const history = useHistory()

  function handleGoHome() {
    history.push('/')
  }

  useEffect(() => {
    const { ref_payco } = queryString.parse(location.search)

    axios({
      method: 'GET',
      baseURL: 'https://secure.epayco.co',
      url: `/validation/v1/reference/${ref_payco}`
    })
      .then(({ data }) => {
        console.dir(data)
        dispatch(saveTransaction(data.data))
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const {
    savingTransaction,
    transaction,
    errorTransaction,
    successTransaction,
  } = useSelector(({transactionReducer}) => ({
    savingTransaction: transactionReducer.saving,
    errorTransaction: transactionReducer.error,
    successTransaction: transactionReducer.success,
    transaction: transactionReducer.transaction,
  }))

  return(
    <>
      <main>
        <section>
          <StyledH2>Su transacción fue:</StyledH2>
          {!!savingTransaction && <p>Cargando resultado...</p>}
          {!!errorTransaction && <p>Error al cargar el resultado de transacción.</p>}
          {!!transaction && !!successTransaction && <StyledH2 morePadding>{transaction.result}</StyledH2>}
          {!!transaction 
            && !!successTransaction 
            && 
            <CustomButton 
              OnClick={() => handleGoHome()}
              Styles={{marginLeft: '780px' }} 
              Variant='outlined'
            >
              Volver al Inicio
            </CustomButton>}
        </section>
      </main>
    </>
  )
}