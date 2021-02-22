import './TitleCards.css'
import { useRouteMatch,Link } from "react-router-dom";
import React from 'react';
import {BASEURL} from "../config";
import axios from "axios";
import Loader from "react-loader-spinner";
import { fakeSentimentalTitles } from './fakeData'

function TitleCards(props) {
  let { path } = useRouteMatch();
  const [articles, setArticles] = React.useState();

  React.useEffect(() => {
    if (!props.type || props.type === "MRC") {
      getArticles();
    } else {
      setArticles(fakeSentimentalTitles)
    }
  }, [props.type]);

  const getArticles = async() => {
    let actionURL = BASEURL + '/articles'
    let arg = {
      "userId": "0",
    }
    await axios.post(actionURL, arg).then(
      function(response) {
        // console.log(response.data);
        setArticles(response.data);
      }
    )
  }

  // When api not get responding
  if(!articles || !articles.length) {
    return (
      <Loader
        className="center"
        type="RevolvingDot"
        color="#4D87EB"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
  }

  return (
    <div className="title-card-container">
      <div className="start-start flex-wrap">
        {articles.map((article, idx) => (
          <Link key={idx} className="title-card-link" to={`${path}/${article.articleId}`}>
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