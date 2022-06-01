import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import LoginDialog from "./LoginDialog.js";
import messageBackground from "../img/message_background.jpg";
import messagePaper from "../img/message_paper.jpg";

export default function MessageBoard(props) {
  const [messageContent, setMessageContent] = React.useState("");
  const handleSend = async () => {
    await props.sendMessage(messageContent);
    setMessageContent("");
  };

  return (
    <List
      sx={{
        width: "80%",
        backgroundImage: `url(${messageBackground})`,
      }}
    >
      {props.data.map((message) => (
        <div>
          <ListItem
            alignItems="flex-start"
            sx={{
              width: "90%",
              margin: "auto",
              backgroundImage: `url(${messagePaper})`,
            }}
          >
            <ListItemAvatar>
              <Avatar alt={message.owner} src="https://anitar.dev/get/r" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ fontWeight: "bold" }}
                >
                  {message.owner}
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body2" color="text.primary">
                    {message.content}
                  </Typography>
                  <Typography
                    align="right"
                    variant="body2"
                    color="text.primary"
                  >
                    {message.createdAt.split(/[T.]/)[0]}{" "}
                    {message.createdAt.split(/[T.]/)[1]}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <div>&nbsp;</div>
        </div>
      ))}
      <hr
        style={{
          width: "95%",
          height: 3,
          backgroundColor: "#C9C9C9",
          borderColor: "#FFF3DE",
        }}
      />
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "95%",
          margin: "auto",
        }}
      >
        <LoginDialog onHandleLogin={props.onHandleLogin} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="請輸入留言"
          value={messageContent ? messageContent : ""}
          onChange={(event) => {
            setMessageContent(event.target.value);
          }}
        />
        <IconButton
          onClick={handleSend}
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </List>
  );
}
