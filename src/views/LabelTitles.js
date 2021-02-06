import './LabelTitles.css'
import Card from '../components/Card'
import { useRouteMatch,Link } from "react-router-dom";

function LabelTitles(props) {
  let { path } = useRouteMatch();
  return (
    <div className="labeling-content-container">
      <div className="start-start flex-wrap">
        {props.titles.map((title, idx) => (
          <Link className="label-link" to={`${path}/${title}`}>
            <Card key={idx} title={title} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LabelTitles;