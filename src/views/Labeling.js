import { Link, useRouteMatch, useHistory } from "react-router-dom";
import './Labeling.css'
import { useEffect, useState } from 'react';
import { BASEURL } from "../config";
import axios from 'axios';

function Labeling() {
  let history = useHistory();
  let { params } = useRouteMatch();
  let { articleId, taskId } = params;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [isFixedAnswer, setIsFixedAnswer] = useState(false);
  const [labelButtonCss, setLabelButtonCss] = useState("label-button justify-center nowrap");
  const [buttonString, setButtonString] = useState("標記答案");
  const taskInfo = JSON.parse(sessionStorage.getItem('paragraph'));
  const [task, setTask] = useState();
  const [qaPairs, setQaPairs] = useState();

  useEffect(() => {
    const getTask = async () => {
      console.log('taskid', taskInfo.taskId);
      const arg = {
        taskId: taskInfo.taskId.toString(),
        userId: ""
      }
      const res = await axios.post(`${BASEURL}/getTask`, arg);
      console.log('res', res);
      setTask(res.data);
      setQaPairs(res.data.qaList);
    }
    getTask();
  }, [taskInfo.taskId])

  useEffect(() => {
    if (isFixedAnswer) {
      setLabelButtonCss("label-button justify-center nowrap light-green")
      setButtonString("重新標記")
    }
    else {
      setLabelButtonCss("label-button justify-center nowrap")
      setButtonString("標記答案")
    }
  }, [isFixedAnswer]);

  // subscribe to selection event
  const mouseUpHandler = event => {
    if (isFixedAnswer) {
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
    if (answer === "") {
      alert("請以反白方式選擇內文再點選完成標註");
      return
    }

    setIsFixedAnswer(!isFixedAnswer)
  }

  const saveAnswer = async () => {
    let newAnswer = {
      userId: "0",
      taskId: taskInfo.taskId,
      taskType: 'MRC',
      isValiate: false,
      question: question,
      answer: answer
    }
    const res = await axios.post(`${BASEURL}/saveAnswer`, newAnswer)
    console.log('res', res)
  }

  const handleNewQuestion = () => {
    if (question === "" || answer === "") {
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

    saveAnswer();
  }

  const goToNextTask = (paragraph) => {
    console.log('max', taskInfo.totalTaskNum)
    console.log('para', paragraph)
    saveAnswer();
    history.push(`/MRC/Label/${articleId}/${parseInt(paragraph) + 1}`);
  }

  return (
    <div id="Labeling" className="justify-center">
      <div className="working-area-container overflow-scroll">
        <div className="back-button" onClick={() => history.push(`/MRC/Label/${articleId}`)}>〈 回上一層 </div>
        <div className="working-article-title body-padding">
          {task ? task.taskTitle : ""}
        </div>
        <div className="working-article-content body-padding" onMouseUp={mouseUpHandler}>
          {task ? task.context : ""}
        </div>
        <div className="justify-start mb-30 body-padding">
          <div className="nowrap mr-10">問題：</div>
          <textarea className="working-textarea" value={question} onChange={handleTextAreaChange} />
        </div>
        <div className="justify-start body-padding">
          <div className="nowrap mr-10">答案：</div>
          <textarea
            className="working-textarea"
            value={answer}
            onChange={() => { return }}
            placeholder="請透過滑鼠反白方式選擇文章中的答案" />
          <div className={labelButtonCss} onClick={handleAnswerFixed}>{buttonString}</div>
        </div>
        <div className="justify-center">
          <div className="function-button mr-40" onClick={handleNewQuestion}>新增題目</div>
          {(taskId <= taskInfo.totalTaskNum) ?
            (<div onClick={() => goToNextTask()}>
              <div className="function-button">下一段</div>
            </div>) : null}
        </div>
      </div>
      <div className="question-history-container align-start">
        <div className="justify-center question-title">提問紀錄</div>
        <div className="overflow-scroll">
          {qaPairs ? qaPairs.map((qaPairs, idx) => (
            <div key={idx} className="mb-15">
              <div className="mb-5">問：{qaPairs.question}</div>
              <div>答：{qaPairs.answer}</div>
            </div>
          )) : ""}
        </div>
      </div>
    </div>
  )
}

export default Labeling;