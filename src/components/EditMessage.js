import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Create";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

export default function EditMessage(props) {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");

  const onChangeContent = (e) => {
    const content = e.target.value;
    setContent(content);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setContent(props.messageContent)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = async (message_id) => {
    if (props.messageContent === content) {
      console.log("沒變");
    } else {
      const editCheck = await props.editMessage(message_id, content);
      if (editCheck[1] === "token錯誤") {
        localStorage.removeItem("login_token");
        alert("登入逾時，請重新登入");
        window.location.reload();
      }
    }
    setOpen(false);
  };

  return (
    <div>
      <IconButton size="small" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"修改訊息"}</DialogTitle>
        <DialogContent>
          <TextField
            id="filled-multiline-static"
            hiddenLabel
            multiline
            rows={4}
            defaultValue={content}
            inputProps={{ maxLength: 50 }}
            onChange={onChangeContent}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={() => handleEdit(props.messageId)} autoFocus>
            修改
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
