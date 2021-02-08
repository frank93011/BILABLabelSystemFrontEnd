import './App.css';
import MainContentPage from './views/MainContentPage'
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
          <Route path="/MRC" component={MainContentPage} />
          <Route path="/Sentimental" render={() => <MainContentPage type="Sentimental" />} />
          <Redirect from="/" to="/MRC" />
        </Switch>
      </div>   
    </Router>
  )
}

export default App;
