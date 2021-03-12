import './MainContentPage.css'
import '../components/_global.css'
import Header from '../components/Header'
import TitleCards from './TitleCards'
import ParagraphCards from './ParagraphCards'
import Labeling from './Labeling'
import Validation from './ValidationPage' // temp
import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom";

function MainContent(props) {
  let { path } = useRouteMatch();

  return (
    <div id="MainContent">
      <Header />
      <Switch>
        <Route path={`${path}/Label/:articleId/:idx`}>
          <Labeling />
        </Route>
        <Route path={`${path}/Label/:articleId`}>
          <ParagraphCards />
        </Route>
        <Route path={`${path}/Label`}>
          <TitleCards type={props.type} />
        </Route>
        <Route path={`${path}/Validation`} component={Validation} />
        <Redirect from={path} to={`${path}/Label`} />
      </Switch>
    </div>
  )
}

export default MainContent;