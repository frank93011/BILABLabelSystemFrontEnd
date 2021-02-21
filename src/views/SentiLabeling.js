import { Link, useRouteMatch, useHistory } from "react-router-dom";
import './SentiLabeling.css'
import { fakeQuestionsHistory } from './fakeData'
import { fakeAspectPool } from './fakeData'
import React from 'react';
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

function Labeling() {
  let history = useHistory();
  let { params } = useRouteMatch();
  let {articleTitle, paragraph} = params;
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [startIndex, setStartIndex] = React.useState(0);
  const [isFixedAnswer, setIsFixedAnswer] = React.useState(true);
  const [labelButtonCss, setLabelButtonCss] = React.useState("label-button justify-center nowrap");
  const [buttonString, setButtonString] = React.useState("標記答案");

  const [majorAspect, setMajorAspect] = React.useState("");
  const [minorAspect, setMinorAspect] = React.useState({offset:"", text:""});
  const [aspectButtonCss, setAspectButtonCss] = React.useState({status:0, css:"aspect-label-button"});
  const [sentiButtonCss, setSentiButtonCss] = React.useState({status:0, css:"sentiment-label-button"});
  //[TODO]: change fake data{}
  const fakeQuestions = fakeQuestionsHistory;
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
        setAnswer(selObj.toString());
        var selRange = selObj.getRangeAt(0);
        setMinorAspect({offset:selRange.startOffset, text:selObj.toString()});
        return;
    }
    else if (sentiButtonCss.status === 1){
        
    }
    else{
        return
    }


    if(!isFixedAnswer){
      return;
    }
    // event.stopPropagation();
    // var selObj = window.getSelection();
    // setAnswer(selObj.toString());
    // var selRange = selObj.getRangeAt(0);
    // setStartIndex(selRange.startOffset);
    // return;
  };


  // textarea to be editable
  const handleTextAreaChange = event => {
    setQuestion(event.target.value);
    return;
  }

  // handle selection answers fixed
  const handleAnswerFixed = () => {
      if(answer === ""){
        alert("請以反白方式選擇內文再點選完成標註");
        return
      }

      setIsFixedAnswer(!isFixedAnswer)
      if(isFixedAnswer){
        setLabelButtonCss("label-button justify-center nowrap light-green")
        setButtonString("重新標記")
      }
      else{
        setLabelButtonCss("label-button justify-center nowrap")
        setButtonString("標記答案")
      }
    }
  
  const handleNewQuestion = () => {
    if(question === "" || answer === ""){
      alert("請輸入完整的問題與答案!")
      return
    }
    //[TODO]: post data
    let args = {
      question: question,
      answerString: answer,
      answerStart: startIndex,
    };
    console.log(args);

    // re-init answers and questions
    setAnswer("");
    setStartIndex(0);
    setQuestion("");
  }

  return (
    <div id="Labeling" className="justify-center">
      <div className="working-area-container overflow-scroll">
        <div className="back-button" onClick={() => history.push(`/MRC/Label/${articleTitle}`)}>〈 回上一層 </div>
        <div className="working-article-title body-padding">我要重寫 sentiment 的頁面囉</div>
        <div className="working-article-content body-padding" onMouseUp={mouseUpHandler}>健康老化有不少成功範例，例如被稱為「最帥大爺」的王德順，出生於1936年，
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
          <textarea 
          className="senti-working-textarea" 
          value={answer}
          onChange={()=>{return}}
          placeholder="請透過滑鼠反白方式選擇文章中的答案"/>
          <div className={sentiButtonCss.css} onClick={clickChooseSenti}> 劃記情緒 </div>
        </div>
        <div className="justify-center">
          <div className="function-button mr-40" onClick={handleNewQuestion}>新增題目</div>
          {(paragraph <= maxParagraph) ? 
            (<Link to={`/MRC/Label/${articleTitle}/${parseInt(paragraph)+1}`}>
              <div className="function-button">下一段</div>
            </Link>):null}
      </div>
      </div>
      <div className="question-history-container align-start">
        <div className="justify-center question-title">提問紀錄</div>
        <div className="overflow-scroll">
          {fakeQuestions.map((fakeQuestion, idx) => (
            <div key={idx} className="mb-15">
              <div className="mb-5">問：{fakeQuestion.question}</div>
              <div>答：{fakeQuestion.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Labeling;