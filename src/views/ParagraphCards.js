import './ParagraphCards.css'
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { fakeParagraphs } from '../views/fakeData';

function ParagraphCards() {
  let { url } = useRouteMatch();
  let { articleTitle } = useParams();
  let paragraphs = fakeParagraphs;

  let isLabeled = true;
  return (
    <div id="Paragraphs" className="center-center">
      <div className="paragraph-title-container justify-start f-20">
        <div className="line"></div>
        <div className="center-center mb-3">{articleTitle}</div>
      </div>
      <div className="start-start flex-wrap">
        {paragraphs.map((paragraph, idx) => (
          <Link className="paragraph-link" to={`${url}/${idx}`}>
            <div key={idx} className="paragraph-card-container center-center f-16">
              <div className="paragraph-counter center-center mb-20">0</div>
              <div>
                {paragraph}
              </div>
            </div>
          </Link>
        ))}
        <div 
          className={
            `paragraph-card-container center-center f-16 
              ${isLabeled ? "paragraph-is-labeled" : "" }`
          }>
          <div className="paragraph-counter center-center mb-20">0</div>
          <div className="paragraph-content">
            【這篇是示範標過的會變淡】普遍建議複雜一點的比較好。多年前，有項刊登在新英格蘭醫學期刊的研究分析，
            在各種不同類別的運動當中，跳舞是失智症風險最低的絕佳運動選擇，因為跳舞...
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParagraphCards;