import './TitleCards.css'
import { useRouteMatch,Link } from "react-router-dom";

function TitleCards(props) {
  let { path } = useRouteMatch();
  return (
    <div className="title-card-container">
      <div className="start-start flex-wrap">
        {props.titles.map((title, idx) => (
          <Link className="title-card-link" to={`${path}/${title}`}>
            <div className="title-card">
              {title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TitleCards;