import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
    setOpen(false);
  };

  const handleLogin = async () => {
    await props.onHandleLogin(username, password);
    setUsername();
    setPassword();
    setToken(localStorage.getItem("login_token"));
    setOpen(false);
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
        <Button variant="outlined" onClick={handleClickOpen}>
          登入
        </Button>
      ) : (
        <Button variant="outlined" onClick={handleLogout}>
          登出
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>登入</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            label="帳號"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChangeUsername}
          />
          <TextField
            required
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
