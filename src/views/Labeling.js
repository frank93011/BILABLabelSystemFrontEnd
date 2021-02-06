import './Labeling.css'
import '../components/_global.css'
import Header from '../components/Header'
import Card from '../components/Card'
import React, { useState, useEffect } from 'react';
import { fakeMRCTitles, fakeSentimentalTitles } from './fakeData'

function Labeling(props) {
  const [titles, setTitles] = useState(fakeMRCTitles);
  useEffect(() => {
    // 使用瀏覽器 API 更新文件標題
    // document.title = `You clicked ${count} times`;
    if (!props.type || props.type === "MRC") {
      setTitles(fakeMRCTitles)
    } else {
      setTitles(fakeSentimentalTitles)
    }
  });
  
  
  return (
    <div id="Labeling">
      <Header />
      <div className="labeling-content-container">
        <div className="start-start flex-wrap">
          {titles.map((title, idx) => (
            <Card key={idx} title={title} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Labeling;