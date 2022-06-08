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
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Profile from "./Profile";
import JwtDecode from "jwt-decode";
import CircularProgress from "@mui/material/CircularProgress";
import GoogleIcon from "@mui/icons-material/Google";
import { gapi, loadAuth2 } from "gapi-script";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function LoginDialog(props) {
  const [token, setToken] = React.useState(localStorage.getItem("login_token"));
  const [open, setOpen] = React.useState(false);
  const [owner, setOwner] = React.useState();
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [reUsername, setReUsername] = React.useState();
  const [rePassword, setRePassword] = React.useState();
  const [reEmail, setReEmail] = React.useState();
  const [hidden, setHidden] = React.useState(false);
  const [hiddenAlert, setHiddenAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hiddenLoading, setHiddenLoading] = React.useState(false);

  const handleAnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAnClose = () => {
    setAnchorEl(null);
  };

  const openAn = Boolean(anchorEl);
  const id = openAn ? "simple-popover" : undefined;

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
    setHiddenAlert(false);
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

  const handleGoogleLogin = async () => {
    const auth2 = await loadAuth2(gapi, process.env.REACT_APP_CLIENT_ID, "");
    auth2.attachClickHandler(
      document.getElementById("googleBtn"),
      {},
      async (googleUser) => {
        console.log(googleUser.getBasicProfile().getEmail());
        const res = await props.onHandleGoogleLogin(
          googleUser.getBasicProfile().getEmail()
        );
        if (res[0] === true) {
          setHiddenLoading(true);
          setToken(localStorage.getItem("login_token"));
          setHiddenAlert(false);
          setOpen(false);
          setUsername();
          setPassword();
          window.location.reload();
          window.scrollTo(0, document.body.scrollHeight);
        } else {
          setHiddenAlert(true);
          setAlertMessage(res[1]);
        }
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  };

  const handleLogin = async () => {
    const res = await props.onHandleLogin(username, password);
    if (res[0] === true) {
      setHiddenLoading(true);
      setToken(localStorage.getItem("login_token"));
      setHiddenAlert(false);
      setOpen(false);
      setUsername();
      setPassword();
      window.location.reload();
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      setHiddenAlert(true);
      setAlertMessage(res[1]);
    }
  };

  const handleRegister = async () => {
    const res = await props.onHandleRegister(reUsername, rePassword, reEmail);
    if (res[0] === true) {
      setHiddenLoading(true);
      setToken(localStorage.getItem("login_token"));
      setHiddenAlert(false);
      setOpen(false);
      setReUsername();
      setRePassword();
      setReEmail();
      window.location.reload();
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      setHiddenAlert(true);
      setAlertMessage(res[1]);
    }
  };

  const handleLogout = async () => {
    setHiddenLoading(true);
    localStorage.removeItem("login_token");
    setAnchorEl(null);
    setOwner();
    setToken();
    window.location.reload();
    window.scrollTo(0, document.body.scrollHeight);
  };

  React.useEffect(() => {
    if (token) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    if (localStorage.getItem("login_token")) {
      setOwner(JwtDecode(localStorage.getItem("login_token"))["username"]);
    }
  }, [token]);

  return (
    <div>
      {hiddenLoading ? (
        <CircularProgress />
      ) : !hidden ? (
        <Button variant="contained" onClick={handleClickOpen}>
          登入
        </Button>
      ) : (
        <div>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt={owner} src="no" onClick={handleAnClick} />
          </StyledBadge>
          <Popover
            id={id}
            open={openAn}
            anchorEl={anchorEl}
            onClose={handleAnClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div>
              <Profile owner={owner} handleAnClose={handleAnClose} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={handleLogout}>登出</Button>
            </div>
          </Popover>
        </div>
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
                required
                variant="standard"
                onChange={onChangeUsername}
              />
              <TextField
                margin="dense"
                id="password"
                label="密碼"
                type="password"
                fullWidth
                required
                variant="standard"
                onChange={onChangePassword}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>取消</Button>
              <Button onClick={handleLogin}>登入</Button>
            </DialogActions>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                id="googleBtn"
                variant="contained"
                onClick={handleGoogleLogin}
              >
                <GoogleIcon />
                Google登入
              </Button>
            </div>
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
                required
                variant="standard"
                onChange={onChangeReUsername}
              />
              <TextField
                margin="dense"
                id="password"
                label="密碼"
                type="password"
                fullWidth
                required
                variant="standard"
                onChange={onChangeRePassword}
              />
              <TextField
                margin="dense"
                id="email"
                label="email"
                type="text"
                fullWidth
                required
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
