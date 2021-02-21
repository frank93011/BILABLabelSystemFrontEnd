import './TitleCards.css'
import { useRouteMatch,Link } from "react-router-dom";
import React from 'react';
import {BASEURL} from "../config";
import axios from "axios";

function TitleCards(props) {
  let { path } = useRouteMatch();
  React.useEffect(() => {
    let actionURL = BASEURL + '/articles'
    let arg = {
      "userId": "0",
    }
    console.log(actionURL);
    axios.post(actionURL, arg).then(
      function(response) {
        console.log(response);
      }
    )

  }, []);

  return (
    <div className="title-card-container">
      <div className="start-start flex-wrap">
        {props.titles.map((title, idx) => (
          <Link key={idx} className="title-card-link" to={`${path}/${title}`}>
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