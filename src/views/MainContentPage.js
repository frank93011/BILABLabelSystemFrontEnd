import './MainContentPage.css'
import '../components/_global.css'
import Header from '../components/Header'
import TitleCards from './TitleCards'
import ParagraphCards from './ParagraphCards'
// import Labeling from './Labeling'
import Labeling from './SentiLabeling'
import Validation from './ValidationPage' // temp
import React, { useState, useEffect } from 'react';
import { fakeMRCTitles, fakeSentimentalTitles } from './fakeData'
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom";

function MainContent(props) {
  const [titles, setTitles] = useState(fakeMRCTitles);
  useEffect(() => {
    if (!props.type || props.type === "MRC") {
      setTitles(fakeMRCTitles)
    } else {
      setTitles(fakeSentimentalTitles)
    }
  }, [props.type]);
  
  let { path, url } = useRouteMatch();
  
  console.log('path', path)
  console.log('url', url)
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
          <TitleCards titles={titles} />
        </Route>
        <Route path={`${path}/Validation`} component={Validation} />
        <Redirect from={path} to={`${path}/Label`} />
      </Switch>
    </div>
  )
}

export default MainContent;