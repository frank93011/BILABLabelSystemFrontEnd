import './ParagraphCards.css'
import { useParams, useRouteMatch, useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { BASEURL } from "../config";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { useSelector} from 'react-redux';

function ParagraphCards() {
  let history = useHistory();
  let { url } = useRouteMatch();
  let { articleId } = useParams();
  const [articleTitle, setArticleTitle] = useState();
  const [paragraphs, setParagraphs] = useState();
  let isLabeled = true;
  const profileObj = useSelector(state => state.profileObj);

  useEffect(() => {
    const getSetParagraphs = async () => {
      let actionURL = BASEURL + '/tasks'
      let arg = {
        "userId": profileObj.googleId,
        "taskType": "MRC",
        "articleId": articleId
      }
      const response = await axios.post(actionURL, arg)
      // console.log('res', response)
      setParagraphs(response.data.taskList);
      setArticleTitle(response.data.articleTitle);
      // setqaList(response.data.qaList)
    }
    getSetParagraphs();
  }, [articleId, profileObj.googleId])

  // When api not get responding
  if (!paragraphs || !paragraphs.length) {
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

  const goToLabel = (taskId) => {
    let idx = taskId.split('-')[1]
    history.push(`${url}/${idx}`);
    const data = {
      articleId: articleId,
      articleTitle: articleTitle,
      taskId: taskId,
      totalTaskNum: paragraphs.length,
      // paragraph: paragraphs[idx]
    }
    sessionStorage.setItem("paragraph", JSON.stringify(data));
  }

  return (
    <div id="Paragraphs" className="center-center">
      <div className="paragraph-title-container justify-start f-20">
        <div className="line" />
        <div className="center-center mb-3">{articleTitle}</div>
      </div>
      <div className="start-start flex-wrap">
        {paragraphs.map((paragraph, idx) => (
          <div key={idx} className="paragraph-link" onClick={() => { goToLabel(paragraph.taskId) }}>
            <div key={idx} className={
              `paragraph-card-container center-center f-16 
                ${paragraph.isAnswered ? "paragraph-is-labeled" : ""}`
            }>
              <div className="paragraph-counter center-center mb-20">{paragraph.answered}</div>
              <div>
                {paragraph.taskTitle}
              </div>
            </div>
          </div>
        ))}
        <div
          className={
            `paragraph-card-container center-center f-16 
              ${isLabeled ? "paragraph-is-labeled" : ""}`
          }>
          <div className="paragraph-counter center-center mb-20">0</div>
          <div className="paragraph-content">
            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            ?????????????????????????????????????????????????????????????????????????????????????????????????????????...
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParagraphCards;