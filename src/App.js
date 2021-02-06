import './App.css';
import Labeling from './views/Labeling'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/MRC" component={Labeling} />
          <Route exact path="/Sentimental" render={() => <Labeling type="Sentimental" />} />
          <Redirect from="/" to="/MRC" />
        </Switch>
      </div>   
    </Router>
  )
}

export default App;
