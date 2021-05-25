import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveTransaction } from "../../store/transactionReducer";
import queryString from "query-string";
import { NavBar } from "../../Components/Navbar";

export function TransactionResult() {
  const location = useLocation()

  const dispatch= useDispatch()

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
      <NavBar />
      <main>
        <section>
          <h2>Su transacción fue:</h2>
          {!!savingTransaction && <p>Cargando resultado...</p>}
          {!!errorTransaction && <p>Error al cargar el resultado de transacción.</p>}
          {!!transaction && !!successTransaction && <h2>{transaction.result}</h2>}
        </section>
      </main>
    </>
  )
}