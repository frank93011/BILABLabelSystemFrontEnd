import './LabelTitles.css'
import Card from '../components/Card'
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect,
  Link
} from "react-router-dom";

function LabelTitles(props) {
  return (
    <div className="labeling-content-container">
      <div className="start-start flex-wrap">
        {props.titles.map((title, idx) => (
          <Card key={idx} title={title} />
        ))}
      </div>
    </div>
  )
}

export default LabelTitles;