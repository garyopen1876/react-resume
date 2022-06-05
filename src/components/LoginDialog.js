import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function LoginDialog(props) {
  const [token, setToken] = React.useState(localStorage.getItem("login_token"));
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
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
      window.location.reload();
    } else {
      setHiddenAlert(true);
      setAlertMessage(res[1]);
    }
    setUsername();
    setPassword();
  };

  const handleLogout = () => {
    localStorage.removeItem("login_token");
    setToken();
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
        <DialogTitle>登入🔒</DialogTitle>
        {hiddenAlert ? (
          <Alert sx={{ width: "95%" }} severity="error">
            {alertMessage}
          </Alert>
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
      </Dialog>
    </div>
  );
}
