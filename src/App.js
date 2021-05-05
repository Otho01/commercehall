import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { HomePage } from './Pages/Home';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
