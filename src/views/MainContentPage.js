import './MainContentPage.css'
import '../components/_global.css'
import Header from '../components/Header'
import TitleCards from './TitleCards'
import ParagraphCards from './ParagraphCards'
import Labeling from './Labeling'
import Validation from './ValidationPage' // temp
import React, { useState, useEffect } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { fakeMRCTitles, fakeSentimentalTitles } from './fakeData'
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import {BASEURL} from "../config";
import axios from "axios";

function MainContent(props) {
  let { path, url } = useRouteMatch();
  const [articles, setArticles] = useState();
  
  console.log('path', path)
  console.log('url', url)

  useEffect(() => {
    if (!props.type || props.type === "MRC") {
      getArticles();
    } else {
      setArticles(fakeSentimentalTitles)
    }
  }, [props.type]);
  
  // call article api 
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
    <div id="MainContent">
      <Header />
      <Switch>
        <Route path={`${path}/Label/:articleTitle/:paragraph`}>
          <Labeling />
        </Route>
        <Route path={`${path}/Label/:articleTitle`}>
          <ParagraphCards />
        </Route>
        <Route path={`${path}/Label`}>
          <TitleCards articles={articles} />
        </Route>
        <Route path={`${path}/Validation`} component={Validation} />
        <Redirect from={path} to={`${path}/Label`} />
      </Switch>
    </div>
  )
}

export default MainContent;