import { Link, useRouteMatch, useHistory } from "react-router-dom";
import './Labeling.css'
import { fakeQuestionsHistory } from './fakeData'
import React from 'react';

function Labeling() {
  let history = useHistory();
  let { params } = useRouteMatch();
  let {articleTitle, paragraph} = params;
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [startIndex, setStartIndex] = React.useState(0);
  const [isFixedAnswer, setIsFixedAnswer] = React.useState(false);
  const [labelButtonCss, setLabelButtonCss] = React.useState("label-button justify-center nowrap");
  const [buttonString, setButtonString] = React.useState("標記答案");
  //[TODO]: change fake data
  const fakeQuestions = fakeQuestionsHistory;
  const maxParagraph = 10;

  React.useEffect(() => {
    if(isFixedAnswer){
      setLabelButtonCss("label-button justify-center nowrap light-green")
      setButtonString("重新標記")
    }
    else{
      setLabelButtonCss("label-button justify-center nowrap")
      setButtonString("標記答案")
    }
  }, [isFixedAnswer]);

  // subscribe to selection event
  const mouseUpHandler = event => {
    if(isFixedAnswer){
      return;
    }
    event.stopPropagation();
    var selObj = window.getSelection();
    setAnswer(selObj.toString());
    var selRange = selObj.getRangeAt(0);
    setStartIndex(selRange.startOffset);
    return;
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
    setIsFixedAnswer(false);
  }

  return (
    <div id="Labeling" className="justify-center">
      <div className="working-area-container overflow-scroll">
        <div className="back-button" onClick={() => history.push(`/MRC/Label/${articleTitle}`)}>〈 回上一層 </div>
        <div className="working-article-title body-padding">80歲最帥大爺、70歲時尚超模都不約而同地做到</div>
        <div className="working-article-content body-padding" onMouseUp={mouseUpHandler}>健康老化有不少成功範例，例如被稱為「最帥大爺」的王德順，出生於1936年，
          理應是一位八旬長者，但他完全顛覆傳統對於八旬老翁的形象，有個性的白髮與歷經風霜的堅毅表情，
          還有讓許多中年男子羨慕的好身材——精壯的身形與肌肉，這是他自五十歲開始持續的健身成果。
          並不是每個人都必須仿效他的生活，而是他完全顛覆一個八十歲長者的生活樣貌，
          他持續工作、享受生活、與妻子旅遊，實現真正不受年齡限制的人生。</div>
        <div className="justify-start mb-30 body-padding">
          <div className="nowrap mr-10">問題：</div>
          <textarea className="working-textarea" value={question} onChange={handleTextAreaChange}/>
        </div>
        <div className="justify-start body-padding">
          <div className="nowrap mr-10">答案：</div>
          <textarea 
          className="working-textarea" 
          value={answer}
          onChange={()=>{return}}
          placeholder="請透過滑鼠反白方式選擇文章中的答案"/>
          <div className={labelButtonCss} onClick={handleAnswerFixed}>{buttonString}</div>
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