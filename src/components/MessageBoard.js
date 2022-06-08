import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import LoginDialog from "./LoginDialog.js";
import messageBackground from "../img/message_background.jpg";
import messagePaper from "../img/message_paper.jpg";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import JwtDecode from "jwt-decode";
import EditIcon from "./EditMessage";
import DeleteIcon from "./DeleteMessage";
import Pagination from "@mui/material/Pagination";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MessageBoard(props) {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [messageContent, setMessageContent] = React.useState("");
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const itemsPerPage = 5;
  const [page, setPage] = React.useState(1);
  const [noOfPages, setNoOfPages] = React.useState();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const onChangeKeyword = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
  };

  const onChangeContent = (e) => {
    const content = e.target.value;
    setMessageContent(content);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSearchClear = () => {
    props.loadingData();
    setSearchKeyword("");
  };

  const handleSend = async () => {
    const sendCheck = await props.sendMessage(messageContent);
    setMessageContent("");
    if (sendCheck[1] === "token錯誤") {
      localStorage.removeItem("login_token");
      alert("登入逾時，請重新登入");
      window.location.reload();
      window.scrollTo(0, document.body.scrollHeight);
    } else if (sendCheck[1] === "留言內容為空") {
      setOpenSnackbar(true);
    }
  };

  const handleSearch = async () => {
    await props.searchData(searchKeyword);
  };

  React.useEffect(() => {
    if (localStorage.getItem("login_token")) {
      setUsername(JwtDecode(localStorage.getItem("login_token"))["username"]);
    }
    setNoOfPages(Math.ceil(props.data.length / itemsPerPage));
    setPage(noOfPages);
  }, [noOfPages, props.data]);

  return (
    <List
      sx={{
        width: "90%",
        border: 5,
        borderRadius: "16px",
        borderColor: "#976749",
        backgroundImage: `url(${messageBackground})`,
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "flex-end", margin: "5px" }}
      >
        <Box
          sx={{
            borderRadius: "16px",
            width: "30%",
            backgroundColor: "white",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="搜尋留言"
            value={searchKeyword ? searchKeyword : ""}
            onChange={onChangeKeyword}
            inputProps={{ maxLength: 50 }}
          />
          {searchKeyword ? (
            <IconButton onClick={handleSearchClear}>
              <ClearIcon />
            </IconButton>
          ) : null}
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>
      </div>
      <div>&nbsp;</div>
      {props.data
        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
        .map((message) => (
          <div>
            <Box
              sx={{
                width: "90%",
                margin: "auto",
                backgroundImage: `url(${messagePaper})`,
              }}
            >
              <ListItem
                alignItems="flex-start"
                sx={{
                  width: "100%",
                  margin: "auto",
                }}
              >
                <ListItemAvatar>
                  <Avatar alt={message.owner} src="no" />
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
                      {message.owner === username ? (
                        <div style={{ textAlign: "right" }}>
                          <IconButton size="small">
                            <EditIcon
                              editMessage={props.editMessage}
                              messageId={message.id}
                              messageContent={message.content}
                            />
                          </IconButton>
                          <IconButton size="small">
                            <DeleteIcon
                              deleteMessage={props.deleteMessage}
                              messageId={message.id}
                            />
                          </IconButton>
                        </div>
                      ) : null}
                      <Typography
                        align="right"
                        variant="body2"
                        color="text.primary"
                      >
                        {message.createdAt === message.updatedAt
                          ? new Date(message.createdAt).toLocaleString(
                              "en-US",
                              {
                                timeZone: "Asia/Taipei",
                              }
                            )
                          : new Date(message.updatedAt).toLocaleString(
                              "en-US",
                              {
                                timeZone: "Asia/Taipei",
                              }
                            ) + " 編輯"}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Box>
            <div>&nbsp;</div>
          </div>
        ))}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          color="secondary"
        />
      </div>
      <hr
        style={{
          width: "95%",
          height: 3,
          backgroundColor: "#976749",
          borderColor: "#FFF3DE",
        }}
      />
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "90%",
          margin: "auto",
        }}
      >
        <LoginDialog
          onHandleLogin={props.onHandleLogin}
          onHandleRegister={props.onHandleRegister}
          onHandleGoogleLogin={props.onHandleGoogleLogin}
        />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="請輸入留言"
          value={messageContent ? messageContent : ""}
          onChange={onChangeContent}
          inputProps={{ maxLength: 50 }}
        />
        <IconButton
          onClick={handleSend}
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
        >
          <SendIcon />
        </IconButton>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openSnackbar}
          autoHideDuration={1000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            留言內容不得為空
          </Alert>
        </Snackbar>
      </Paper>
    </List>
  );
}
