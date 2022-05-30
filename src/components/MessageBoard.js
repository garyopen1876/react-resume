import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import LoginDialog from "./LoginDialog.js";

export default function MessageBoard(props) {
  const [messageContent, setMessageContent] = React.useState("");
  const handleSend = async () => {
    await props.sendMessage(messageContent);
    setMessageContent("");
  };

  return (
    <List sx={{ width: "80%", bgcolor: "background.paper" }}>
      {props.data.map((message) => (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={message.owner} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={message.owner}
            secondary={
              <React.Fragment>
                <Typography variant="body2" color="text.primary">
                  {message.content}
                </Typography>
                <Typography align="right" variant="body2" color="text.primary">
                  {message.createdAt.split(/[T.]/)[0]} {message.createdAt.split(/[T.]/)[1]}
                </Typography>
                <Divider sx={{ borderBottomWidth: 3 }} />
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
      <hr
        style={{
          width: "90%",
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
          width: "80%",
        }}
      >
        <LoginDialog onHandleLogin={props.onHandleLogin}/>
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
