import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { HomePage } from './Pages/Home';
import { Login } from './Pages/Login';
import { SellProduct } from './Pages/SellProduct';
import { SignUp } from './Pages/SignUp';
import { LoggedHome } from './Pages/LoggedHome'
import { ProductInfo } from './Pages/ProductInfo';
import { ContactInfoPage, contactInfoPage } from './Pages/ContactInfoPage'

function PrivateRoute({children, ...rest}) {
  const token = localStorage.getItem('token')
  return token ? children : <Redirect to='/login' />
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/productinfo/:id">
          <ProductInfo />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <PrivateRoute exact path="/sellproduct">
          <SellProduct />
        </PrivateRoute>
        <PrivateRoute exact path="/loggedhome/:id">
          <LoggedHome />
        </PrivateRoute>
        <PrivateRoute exact path="/contactinfo/:id">
          <ContactInfoPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
