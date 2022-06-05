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
    let sendCheck = [false, ""];
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
        loadingData();
        sendCheck = [true, response["data"]["message"]];
      })
      .catch((error) => {
        sendCheck = [false, error.response.data["message"]];
      });
    return sendCheck;
  };

  const onHandleLogin = async (username, password) => {
    let loginCheck = [false, ""];
    if (!username || !password) {
      return [false, "請填入帳號、密碼"];
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

  const onHandleRegister = async (username, password, email) => {
    let registerCheck = [false, ""];
    if (!username || !password|| !email) {
      return [false, "請填入帳號、密碼、Email"];
    }

    await axios
      .post("api/register", {
        username: username,
        password: password,
        mail: email,
      })
      .then((response) => {
        const token = response["data"]["token"];
        localStorage.setItem("login_token", token);
        registerCheck = [true, response.data["message"]];
      })
      .catch((error) => {
        registerCheck = [false, error.response.data["message"]];
      });
    return registerCheck;
  };

  const deleteMessage = async (message_id) => {
    let deleteCheck = [false, ""];

    await axios
      .delete("api/message", {
        headers: { token: localStorage.getItem("login_token") },
        data: { id: message_id },
      })
      .then((response) => {
        loadingData();
        deleteCheck = [true, response["data"]["message"]];
      })
      .catch((error) => {
        deleteCheck = [false, error.response.data["message"]];
      });
    return deleteCheck;
  };

  const editMessage = async (message_id, message_update_content) => {
    let editCheck = [false, ""];

    await axios
      .put(
        "api/message",
        {
          id: message_id,
          content: message_update_content,
        },
        {
          headers: { token: localStorage.getItem("login_token") },
        }
      )
      .then((response) => {
        loadingData();
        editCheck = [true, response["data"]["message"]];
      })
      .catch((error) => {
        editCheck = [false, error.response.data["message"]];
      });
    return editCheck;
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
                  onHandleRegister={onHandleRegister}
                  deleteMessage={deleteMessage}
                  editMessage={editMessage}
                />
              </Grid>
              <div>&nbsp;</div>
            </div>
          </div>
        </body>
      </div>
    </div>
  );
}

export default Resume;
