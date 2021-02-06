import './App.css';
import LabelingPage from './views/LabelingPage'
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
          <Route path="/MRC" component={LabelingPage} />
          <Route path="/Sentimental" render={() => <LabelingPage type="Sentimental" />} />
          <Redirect from="/" to="/MRC" />
        </Switch>
      </div>   
    </Router>
  )
}

export default App;
