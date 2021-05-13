import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { HomePage } from './Pages/Home';
import { Login } from './Pages/Login';
import { SellProduct } from './Pages/SellProduct';
import { SignUp } from './Pages/SignUp';
import { LoggedHome } from './Pages/LoggedHome'

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
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <PrivateRoute exact path="/sellproduct">
          <SellProduct />
        </PrivateRoute>
        <PrivateRoute exact path="/loggedhome">
          <LoggedHome />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
