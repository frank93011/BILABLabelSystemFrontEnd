import './Labeling.css'
import { fakeQuestionsHistory } from './fakeData'
import React from 'react';

function Labeling() {
  const [answer, setAnswer] = React.useState("");
  const [startIndex, setStartIndex] = React.useState(0);
  const fakeQuestions = fakeQuestionsHistory;

  // subscribe to selection event
  const mouseUpHandler = event => {
    event.stopPropagation();
    var selObj = window.getSelection();
    setAnswer(selObj.toString());
    var selRange = selObj.getRangeAt(0);
    setStartIndex(selRange.startOffset);
  };

  // textarea change event
  const handleTextAreaChange = event => {
    console.log(event)
    setAnswer(event.target.value);
  }

  // handle selection answers
  const handleAnswerSubmit = () => {
      let args = {
        answerString: answer,
        answerStart: startIndex,
      };
      console.log(args);
    }

  return (
    <div id="Labeling" className="justify-center">
      <div className="working-area-container overflow-scroll">
        <div className="back-button">〈 回上一層</div>
        <div className="working-article-title body-padding">80歲最帥大爺、70歲時尚超模都不約而同地做到</div>
        <div className="working-article-content body-padding" onMouseUp={mouseUpHandler}>健康老化有不少成功範例，例如被稱為「最帥大爺」的王德順，出生於1936年，
          理應是一位八旬長者，但他完全顛覆傳統對於八旬老翁的形象，有個性的白髮與歷經風霜的堅毅表情，
          還有讓許多中年男子羨慕的好身材——精壯的身形與肌肉，這是他自五十歲開始持續的健身成果。
          並不是每個人都必須仿效他的生活，而是他完全顛覆一個八十歲長者的生活樣貌，
          他持續工作、享受生活、與妻子旅遊，實現真正不受年齡限制的人生。</div>
        <div className="justify-start mb-30 body-padding">
          <div className="nowrap mr-10">問題：</div>
          <textarea className="working-textarea" />
        </div>
        <div className="justify-start body-padding">
          <div className="nowrap mr-10">答案：</div>
          <textarea 
          className="working-textarea" 
          value={answer}
          onChange={handleTextAreaChange}/>
          <div className="label-button justify-center nowrap" onClick={handleAnswerSubmit}>標記<br/>答案</div>
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