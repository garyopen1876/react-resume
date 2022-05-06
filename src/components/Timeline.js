import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import SchoolIcon from "@mui/icons-material/School";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Typography from "@mui/material/Typography";
import TimeCard from "./TimeCard.js";
import FCUImg from "../img/FCU.jpg";
import FCUBImg from "../img/FCU_b.png";
import InjectImg from "../img/Inject.jpg";
import InjectBImg from "../img/Inject_b.png";
import TrunkStudioImg from "../img/TrunkStudio.jpg";
import TrunkStudioBImg from "../img/TrunkStudio_b.png";

export default function CustomizedTimeline() {
  return (
    <Timeline position="alternate">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <SchoolIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography
            variant="h6"
            component="span"
            sx={{ fontWeight: "bold" }}
            color="#c1b28f"
          >
            2020 - 畢業
          </Typography>
          <TimeCard
            img={FCUImg}
            imgb={FCUBImg}
            motto="啟程與成長"
            paragraph1="C是我第一個觸碰的程式語言，剛開始學還勉強跟得上課程進度，但後來的Array、LinkedList讓我遇到了瓶頸，也曾思考為什麼自己要選擇資工，最後我告訴自己既然是自己的選擇，那麼就要想辦法做到最好。"
            paragraph2="漸漸的我學會了更多的語言、也學習到程式不光只是寫，還有使用者需求、設計、優化、維護這些必要且繁瑣的開發流程，以及團隊合作的重要性。"
          />
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
          <TimelineDot color="primary">
            <LaptopMacIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "primary.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography
            variant="h6"
            component="span"
            sx={{ fontWeight: "bold" }}
            color="#75809C"
          >
            2021 - 醫療資訊行政
          </Typography>
          <TimeCard
            img={InjectImg}
            imgb={InjectBImg}
            motto="磨練與助人"
            paragraph1="畢業後沒多久就面臨台灣疫情的爆發，我決定前往抗疫前線作戰，為防疫獻上心力，雖然時常忙得不可開交，但只要能聽到民眾的感謝，就會覺得一切的辛苦與勞累都非常值得。"
            paragraph2="在此期間我學會最重要的是工作時間的分配與減少錯誤的發生，讓我能在工作中得心應手的幫忙解答民眾的疑惑、安撫情緒不安的人、面對上層隨時變動的指令以及處理現場的突發狀況。"
          />
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector sx={{ bgcolor: "success.main" }} />
          <TimelineDot color="success" variant="outlined">
            <BusinessCenterIcon />
          </TimelineDot>
          <TimelineConnector sx={{ bgcolor: "success.main" }} />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography
            variant="h6"
            component="span"
            sx={{ fontWeight: "bold" }}
            color="#2F4F4F"
          >
            2022 - 創科資訊:實習生
          </Typography>
          <TimeCard
            img={TrunkStudioImg}
            imgb={TrunkStudioBImg}
            motto="精進與重生"
            paragraph1="隨著疫情的趨緩以及個人對程式的興趣，我很希望能再次投入科技業中，但對於前進業界，我面臨「經驗不足」以及「程式生疏」兩個嚴重的問題。"
            paragraph2="在我煩惱不已時，創科資訊提供我一個提升實力與增添經歷的機會，實習期間我也積極強化程式設計的即戰力以及培養與他人合作開發的能力。"
          />
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
