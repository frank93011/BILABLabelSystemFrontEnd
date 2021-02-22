import './TitleCards.css'
import { useRouteMatch,Link } from "react-router-dom";
import React from 'react';

function TitleCards(props) {
  let { path } = useRouteMatch();

  return (
    <div className="title-card-container">
      <div className="start-start flex-wrap">
        {props.articles.map((article, idx) => (
          <Link key={idx} className="title-card-link" to={`${path}/${article.articleTitle}`}>
            <div className="title-card">
              {article.articleTitle}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TitleCards;