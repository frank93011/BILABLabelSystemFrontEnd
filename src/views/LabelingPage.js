import './LabelingPage.css'
import '../components/_global.css'
import Header from '../components/Header'
import LabelTitles from './LabelTitles'
import Validation from './ValidationTitles'
import Paragraphs from './Paragraphs'
import React, { useState, useEffect } from 'react';
import { fakeMRCTitles, fakeSentimentalTitles } from './fakeData'
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom";

function LabelingPage(props) {
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
    <div id="LabelingPage">
      <Header />
      <Switch>
        <Route path={`${path}/Label/:articleTitle`}>
          <Paragraphs />
        </Route>
        <Route path={`${path}/Label`}>
          <LabelTitles titles={titles} />
        </Route>
        <Route path={`${path}/Validation`} component={Validation} />
        <Redirect from={path} to={`${path}/Label`} />
      </Switch>
    </div>
  )
}

export default LabelingPage;