import './ValidationPage.css'
import './Labeling.css'

function ValidationPage() {

  return (
    <div id="validation" className="justify-center">
      <div className="working-area-container overflow-scroll validation-working-area">
        <div className="working-article-title body-padding">
          AZ疫苗22日開打 我國建議避孕藥、荷爾蒙治療者暫緩接種
        </div>
        <div className="working-article-content body-padding">
          歐盟：AZ疫苗可能與罕見血栓有關
          英國與歐洲經濟區已有約2000萬人接種AZ疫苗，而歐盟官方審到7例瀰散性血管內
          凝固（DIC）與18例腦靜脈竇栓塞（CVST）報告，
          其中9人過世；這些案例多發生於55歲以下人群，且以女性居多。
          就數據資料而言，目前個案數少，且新冠肺炎本身就經常引起凝血障礙，
          因此難估計上述疾病在未接種疫苗人群中的背景發生率。不過，
          歐洲管理局仍根據疫情之前的數據推估－截至3月16日的接種人群裏頭，
          50歲以下的年齡層有可能出現不到1例DIC病例，
          但如今卻報告出5例；類似地，同年齡層推估會有1.35例CVST病例，但目前已知有12例。
          因此他們表示，「上述疾病與接種疫苗的因果關係尚未被證實，但是可能的，且值得進一步分析」。
        </div>
        <div className="justify-start mb-30 body-padding">
          <div className="nowrap mr-10">問題：</div>
            請問英國與歐洲經濟區已有約多少人接種 AZ 疫苗?
        </div>
        <div className="justify-start body-padding">
          <div className="nowrap mr-10">答案：</div>
          <textarea
            className="working-textarea"
            placeholder="請透過滑鼠反白方式選擇文章中的答案" />
        </div>
        <div className="justify-center"></div>
      </div>
    </div>
  )
}

export default ValidationPage;