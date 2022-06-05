import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function LoginDialog(props) {
  const [token, setToken] = React.useState(localStorage.getItem("login_token"));
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [reUsername, setReUsername] = React.useState();
  const [rePassword, setRePassword] = React.useState();
  const [reEmail, setReEmail] = React.useState();
  const [hidden, setHidden] = React.useState(false);
  const [hiddenAlert, setHiddenAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeReUsername = (e) => {
    const reUsername = e.target.value;
    setReUsername(reUsername);
  };

  const onChangeRePassword = (e) => {
    const rePassword = e.target.value;
    setRePassword(rePassword);
  };

  const onChangeReEmail = (e) => {
    const reEmail = e.target.value;
    setReEmail(reEmail);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setHiddenAlert(false);
    setOpen(false);
  };

  const handleLogin = async () => {
    const res = await props.onHandleLogin(username, password);
    if (res[0] === true) {
      setToken(localStorage.getItem("login_token"));
      setHiddenAlert(false);
      setOpen(false);
      setUsername();
      setPassword();
      window.location.reload();
    } else {
      setHiddenAlert(true);
      setAlertMessage(res[1]);
    }
  };

  const handleRegister = async () => {
    const res = await props.onHandleRegister(reUsername, rePassword, reEmail);
    if (res[0] === true) {
      setToken(localStorage.getItem("login_token"));
      setHiddenAlert(false);
      setOpen(false);
      setReUsername();
      setRePassword();
      setReEmail();
      window.location.reload();
    } else {
      setHiddenAlert(true);
      setAlertMessage(res[1]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("login_token");
    setToken();
    window.location.reload();
  };

  React.useEffect(() => {
    if (token) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [token]);

  return (
    <div>
      {!hidden ? (
        <Button variant="contained" onClick={handleClickOpen}>
          登入
        </Button>
      ) : (
        <Button variant="contained" onClick={handleLogout}>
          登出
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="登入🔒" />
            <Tab label="註冊📝" />
          </Tabs>
        </AppBar>
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          <div value={value} index={0}>
            {hiddenAlert ? (
              <Alert severity="error">{alertMessage}</Alert>
            ) : null}
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="帳號"
                type="text"
                fullWidth
                variant="standard"
                onChange={onChangeUsername}
              />
              <TextField
                margin="dense"
                id="password"
                label="密碼"
                type="password"
                fullWidth
                variant="standard"
                onChange={onChangePassword}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>取消</Button>
              <Button onClick={handleLogin}>登入</Button>
            </DialogActions>
          </div>
          <div value={value} index={1}>
            {hiddenAlert ? (
              <Alert severity="error">{alertMessage}</Alert>
            ) : null}
            <DialogContent>
              <TextField
                margin="dense"
                id="username"
                label="帳號"
                type="text"
                fullWidth
                variant="standard"
                onChange={onChangeReUsername}
              />
              <TextField
                margin="dense"
                id="password"
                label="密碼"
                type="password"
                fullWidth
                variant="standard"
                onChange={onChangeRePassword}
              />
              <TextField
                margin="dense"
                id="email"
                label="email"
                type="text"
                fullWidth
                variant="standard"
                onChange={onChangeReEmail}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>取消</Button>
              <Button onClick={handleRegister}>註冊</Button>
            </DialogActions>
          </div>
        </SwipeableViews>
      </Dialog>
    </div>
  );
}
