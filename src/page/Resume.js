import * as React from "react";
import "./Resume.css";
import SkillBox from "../components/SkillBox.js";
import MyselfCard from "../components/MyselfCard.js";
import Timeline from "../components/Timeline.js";
import MessageBoard from "../components/MessageBoard.js";
import Collections from "../components/Collections.js";
import Grid from "@mui/material/Grid";
import axios from "../Axios.config.js";
import Typography from "@mui/material/Typography";

function Resume() {
  const [messageData, setMessageData] = React.useState([]);

  const loadingData = React.useCallback(() => {
    const loadData = async () => {
      await axios
        .get("api/message")
        .then((response) => {
          const resMessageData = response["data"]["data"];
          setMessageData(resMessageData);
        })
        .catch((error) => {
          console.log(error.response.data["message"]);
        });
    };
    loadData();
  }, []);

  const sendMessage = async (message_content) => {
    let head = {};

    if (localStorage.getItem("login_token")) {
      head = { token: localStorage.getItem("login_token") };
    }

    await axios
      .post(
        "api/message",
        {
          content: message_content,
        },
        {
          headers: head,
        }
      )
      .then((response) => {
        console.log(response["data"]["message"]);
        loadingData();
      })
      .catch((error) => {
        console.log(error.response.data["message"]);
      });
  };

  const onHandleLogin = async (username, password) => {
    let loginCheck = [false, ""];

    if (!username || !password) {
      return [false, "請填入帳號密碼"];
    }

    await axios
      .post("api/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const token = response["data"]["token"];
        localStorage.setItem("login_token", token);
        loginCheck = [true, response.data["message"]];
      })
      .catch((error) => {
        loginCheck = [false, error.response.data["message"]];
      });
    return loginCheck;
  };

  React.useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <div>
      <div className="Basic">
        <header className="Header"></header>
        <body>
          <div className="Body">
            <div className="Body-border">
              <Grid container justifyContent="center">
                <MyselfCard />
              </Grid>
              <Typography
                variant="h5"
                sx={{ p: 5, mb: -5, fontWeight: "bold" }}
                color="#B5B5B5"
              >
                學經歷 Education & Experience
              </Typography>
              <Grid container justifyContent="center">
                <hr
                  style={{
                    width: "90%",
                    height: 3,
                    backgroundColor: "#C9C9C9",
                    borderColor: "#FFF3DE",
                  }}
                />
                <Timeline />
              </Grid>
              <Typography
                variant="h5"
                sx={{ p: 5, mb: -5, fontWeight: "bold" }}
                color="#B5B5B5"
              >
                專長 Skills
              </Typography>
              <Grid container spacing={1} columns={{ xs: 3, sm: 6, md: 12 }}>
                <hr
                  style={{
                    width: "90%",
                    height: 3,
                    backgroundColor: "#C9C9C9",
                    borderColor: "#FFF3DE",
                  }}
                />
                <Grid item xs={3}>
                  <SkillBox title="Front-end" color="#DABEA7" />
                </Grid>
                <Grid item xs={3}>
                  <SkillBox title="Back-end" color="#A98B73" />
                </Grid>
                <Grid item xs={3}>
                  <SkillBox title="Database" color="#9D7553" />
                </Grid>
                <Grid item xs={3}>
                  <SkillBox title="More" color="#876D5A" />
                </Grid>
              </Grid>
              <Typography
                variant="h5"
                sx={{ p: 5, mb: -5, fontWeight: "bold" }}
                color="#B5B5B5"
              >
                作品集 Collections
              </Typography>
              <Grid container justifyContent="center" alignItems="center">
                <hr
                  style={{
                    width: "90%",
                    height: 3,
                    backgroundColor: "#C9C9C9",
                    borderColor: "#FFF3DE",
                  }}
                />
                <Collections />
              </Grid>
              <Typography
                variant="h5"
                sx={{ p: 5, mb: -5, fontWeight: "bold" }}
                color="#B5B5B5"
              >
                留言版 Message Board
              </Typography>
              <Grid container justifyContent="center" alignItems="center">
                <hr
                  style={{
                    width: "90%",
                    height: 3,
                    backgroundColor: "#C9C9C9",
                    borderColor: "#FFF3DE",
                  }}
                />
                <MessageBoard
                  data={messageData}
                  sendMessage={sendMessage}
                  onHandleLogin={onHandleLogin}
                />
              </Grid>
            </div>
          </div>
        </body>
      </div>
    </div>
  );
}

export default Resume;
