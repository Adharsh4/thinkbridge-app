
import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import Inventry from './components/Inventry';
import ShowProducts from './components/ShowProducts';
import { Switch, Route, withRouter } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/showProducts">
            <Header />
            <ShowProducts />
        </Route>
        <Route path="/inventry">
            <Header />
            <Inventry />
        </Route>
        <Route path="/">
        <Header />
          <Login />
        </Route>
      </Switch>
 </div>
  );
}

export default withRouter(App);
