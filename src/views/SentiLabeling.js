import { Link, useRouteMatch, useHistory } from "react-router-dom";
import './SentiLabeling.css'
import { fakeQuestionsHistory } from './fakeData'
import { fakeAspectPool } from './fakeData'
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }));

function SentiLabeling() {
  let history = useHistory();
  let { params } = useRouteMatch();
  let {articleTitle, paragraph} = params;
  const [isFixedAnswer, setIsFixedAnswer] = useState(true);

  const [majorAspect, setMajorAspect] = useState("");
  const [minorAspect, setMinorAspect] = useState({offset:"", text:""});
  const [sentimentList, setSentimentList] = useState([]);
  const [totalAnswer, setTotalAnswer] = useState([]);

  const [aspectButtonCss, setAspectButtonCss] = useState({status:0, css:"aspect-label-button"});
  const [sentiButtonCss, setSentiButtonCss] = useState({status:0, css:"sentiment-label-button"});
  const [startId, setStartId] = useState(0);

  const fakePool = fakeAspectPool;
  const maxParagraph = 10;

  const classes = useStyles();


  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const chooseMajor = (major) => {
    setMajorAspect(major)
    // console.info(majorAspect);
  };

  const chooseNonMinor = () => {
    setMinorAspect({offset:-1,text:"[ 無 ]"})
    // console.info(majorAspect);
  };

  const deleteMinor = () => {
    setMinorAspect({offset:"",text:""})
    // console.info(majorAspect);
  };
  const deleteSenti = (offset) => {
    // console.info('delete!!');
    setSentimentList(sentimentList.filter( item => {
      return(item.offset !== offset)
    }))
    // console.info(majorAspect);
  };
  const deleteHistory = (id) => {
    // console.info('delete!!');
    setTotalAnswer(totalAnswer.filter( item => {
      return(item.id !== id)
    }))
    // console.info(majorAspect);
  };

  const renderMajor = () => {
    if (majorAspect !== ""){
        return(<div className="major-aspect-text">{majorAspect}</div>)
    }   
    // console.info(majorAspect);
  };

  const renderMinor = () => {
    if (majorAspect !== "" && minorAspect.text !== ""){
        return(<Chip label={minorAspect.text} onDelete={deleteMinor} variant="outlined"/>)
    }
  };

  const renderSenti = () => {
    if (sentimentList !== []){
        return(
        <div className={classes.root}>
            {sentimentList.map((sentiment_item, idx) => (
                <Chip label={sentiment_item.text} onDelete={() => deleteSenti(sentiment_item.offset)} variant="outlined"/>
            ))}
        </div>
        )
    }
  };

  const clickChooseMinor = () => {
    // console.info(aspectButtonCss);
    if (aspectButtonCss.status === 1){
        setAspectButtonCss({status:0, css:"aspect-label-button"});   
    }
    else if (aspectButtonCss.status === 0){
        setAspectButtonCss({status:1, css:"aspect-label-button-clicked"});   
        setSentiButtonCss({status:0, css:"sentiment-label-button"}); 
    } 
  };

  const clickChooseSenti = () => {
    // console.info(aspectButtonCss);
    if (sentiButtonCss.status === 1){
        setSentiButtonCss({status:0, css:"sentiment-label-button"});   
    }
    else if (sentiButtonCss.status === 0){
        setSentiButtonCss({status:1, css:"sentiment-label-button-clicked"});   
        setAspectButtonCss({status:0, css:"aspect-label-button"});
    } 
  };

  // subscribe to selection event
  const mouseUpHandler = event => {
    if (aspectButtonCss.status === 1){
        event.stopPropagation();
        var selObj = window.getSelection();
        var selRange = selObj.getRangeAt(0);
        setMinorAspect({offset:selRange.startOffset, text:selObj.toString()});
        return;
    }
    else if (sentiButtonCss.status === 1){
        event.stopPropagation();
        var selObj = window.getSelection();
        var selRange = selObj.getRangeAt(0);
        setSentimentList([...sentimentList, {offset:selRange.startOffset, text:selObj.toString()}]);
        // console.info(sentimentList)
        return;
    }
    else{
        return
    }


    if(!isFixedAnswer){
      return;
    }
  };
  const resetAnswer = () => {
    setTotalAnswer([]);
    setMajorAspect("");
    setMinorAspect({offset:"", text:""});
    setSentimentList([]);
    setAspectButtonCss({status:0, css:"aspect-label-button"});
    setSentiButtonCss({status:0, css:"sentiment-label-button"});
    setStartId(0);
  }
  const saveOneSet = () => {
    if((majorAspect !== "") && (minorAspect.offset !== "") && (sentimentList.length !== 0)){
      setTotalAnswer([...totalAnswer, {id:startId, majorAspect:majorAspect, minorAspect:minorAspect, sentimentList:sentimentList}])
      setMajorAspect("");
      setMinorAspect({offset:"", text:""});
      setSentimentList([]);
      setAspectButtonCss({status:0, css:"aspect-label-button"});
      setSentiButtonCss({status:0, css:"sentiment-label-button"});
      setStartId(startId+1);

      // console.info(totalAnswer);
    }
    else{
      alert("請選取完整的 aspect 與 sentiment 組合，再完成送出！");
    }

    return;
  }


  // textarea to be editable

  // handle selection answers fixed
  // const handleAnswerFixed = () => {
  //     if(answer === ""){
  //       alert("請以反白方式選擇內文再點選完成標註");
  //       return
  //     }

  //     setIsFixedAnswer(!isFixedAnswer)
  //     if(isFixedAnswer){
  //       setLabelButtonCss("label-button justify-center nowrap light-green")
  //       setButtonString("重新標記")
  //     }
  //     else{
  //       setLabelButtonCss("label-button justify-center nowrap")
  //       setButtonString("標記答案")
  //     }
  //   }
  
  // const handleNewQuestion = () => {
  //   if(question === "" || answer === ""){
  //     alert("請輸入完整的問題與答案!")
  //     return
  //   }
  //   //[TODO]: post data
  //   let args = {
  //     question: question,
  //     answerString: answer,
  //     answerStart: startIndex,
  //   };
  //   console.log(args);

  //   // re-init answers and questions
  //   setAnswer("");
  //   setStartIndex(0);
  //   setQuestion("");
  // }

  return (
    <div id="SentiLabeling" className="justify-center">
      <div className="senti-working-area-container overflow-scroll">
        <div className="senti-back-button" onClick={() => history.push(`/MRC/Label/${articleTitle}`)}>〈 回上一層 </div>
        <div className="senti-working-article-title body-padding">我要重寫 sentiment 的頁面囉</div>
        <div className="senti-working-article-content body-padding" onMouseUp={mouseUpHandler}>健康老化有不少成功範例，例如被稱為「最帥大爺」的王德順，出生於1936年，
          理應是一位八旬長者，但他完全顛覆傳統對於八旬老翁的形象，有個性的白髮與歷經風霜的堅毅表情，
          還有讓許多中年男子羨慕的好身材——精壯的身形與肌肉，這是他自五十歲開始持續的健身成果。
          並不是每個人都必須仿效他的生活，而是他完全顛覆一個八十歲長者的生活樣貌，
          他持續工作、享受生活、與妻子旅遊，實現真正不受年齡限制的人生。</div>
        
        {/* aspectPool */}
        <div className="justify-start mb-30 body-padding">
            <div className="pool-title justify-start" > 選擇想要標註的主題 Aspect： </div>
        </div>
        <div className={classes.root}>
            {fakePool.map((majorAspect, idx) => (
                <Chip label={majorAspect.majorAspect} onClick={() => chooseMajor(majorAspect.majorAspect)} variant="outlined"/>
            ))}
        </div>
        <div style={{"margin-top" : "50px"}}></div>
        
        {/* majorAspect and minorAspect*/}
        <div className="justify-start mb-30 body-padding">
            <div className="nowrap mr-10">標記主詞：</div>
                    
            <div className="senti-working-textarea justify-start">
                {renderMajor()}
                {renderMinor()}
            </div>
        
            <div>
                <div className="nonaspect-label-button " onClick = {() => chooseNonMinor()} > 劃記為 [ 無 ] </div>
                <div className={aspectButtonCss.css} onClick={() => clickChooseMinor()} > 劃記 aspect </div>
            </div>
        </div>
        
        {/* sentiment labeling*/}
        <div className="justify-start body-padding">
          <div className="nowrap mr-10">標記情緒：</div>
          {/* <div 
          className="senti-working-textarea" 
          value={answer}
          onChange={()=>{return}}
          placeholder="請透過滑鼠反白方式選擇文章中的答案"/> */}
          <div className="senti-working-textarea justify-start">
            {renderSenti()}
          </div>
          <div>
            <div className={sentiButtonCss.css} onClick={clickChooseSenti}> 劃記情緒詞 </div>
          </div>
          
        </div>

        {/* 底部按鈕 */}
        <div className="justify-center">
          <div className="function-button-senti mr-40" onClick={saveOneSet}>新增 aspect</div>
          {/* {(paragraph <= maxParagraph) ? 
            (<Link to={`/MRC/Label/${articleTitle}/${parseInt(paragraph)+1}`}>
              <div className="function-button">下一段</div>
            </Link>):null} */}
      </div>
      </div>

      {/* 右側資料 */}
      <div className="senti-question-history-container align-start">
        <div className="justify-center senti-question-title">提問紀錄</div>
        <div className="overflow-scroll">
          {totalAnswer.map((answerItem, idx) => (
            <div key={idx} onClick={() => deleteHistory(answerItem.id)} className="mb-15 single-aspect-block">
              <li> [{answerItem.majorAspect}]：{answerItem.minorAspect.text}</li>
              <ol>
                {answerItem.sentimentList.map((sentiment, idx) => (
                  <li>{sentiment.text}</li>  
                ))}
              </ol>
              
            </div>
          ))}
        </div>
        {(paragraph <= maxParagraph) ? 
            (<Link to={`/MRC/Label/${articleTitle}/${parseInt(paragraph)+1}`}>
              <div onClick = {() => resetAnswer()} className="finish-button">標註完成，前往下一段</div>
            </Link>):null}
      </div>
    </div>
  )
}

export default SentiLabeling;