import React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import CollectionCard from "./CollectionCard.js";
import Box from "@mui/material/Box";
import Project1Img from "../img/project1.png";
import Project2Img from "../img/project2.gif";
import Project3Img from "../img/project3.png";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    maxWight: 250,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

class Collections extends React.Component {
  state = {
    index: 0,
  };

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;

    return (
      <AutoPlaySwipeableViews
        index={index}
        onChangeIndex={this.handleChangeIndex}
        enableMouseEvents
      >
        <Box style={styles.slide}>
          <CollectionCard
            name="產學實習管理系統"
            introduce="使用Django框架搭建一個合作公司、學生與助教的三方交流平台，透過這個網站去上傳學生以及公司資料、自動配對學生與其所想要的公司，優化產學合作在媒合與發布放榜名單過程。"
            img={Project1Img}
            link="https://github.com/garyopen1876/Industry_Academy_Rebuild"
          />
        </Box>
        <Box style={styles.slide}>
          <CollectionCard
            name="溫溼度即時監測網"
            introduce="使用樹梅派將DHT11溫溼度感測器讀取的數值傳入資料庫，並透過MQTT將數值存入資料庫內。最後利用前端Html、Javascript以及後端Django達成網頁的即時顯示。"
            img={Project2Img}
            link="https://github.com/Jane0731/crazyPI"
          />
        </Box>
        <Box style={styles.slide}>
          <CollectionCard
            name="MONO鎖櫃登記系統"
            introduce="前端與後端分別使用React以及Express，透過前後端分離之方式打造的網站平台。提供Monospace會員鎖櫃的線上登記與抽選並降低抽籤所需要的時間與流程。"
            img={Project3Img}
            link="https://mono-lock-front.herokuapp.com/"
          />
        </Box>
      </AutoPlaySwipeableViews>
    );
  }
}

export default Collections;
