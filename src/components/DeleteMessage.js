import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

export default function DeleteMessage(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (message_id) => {
    const deleteCheck = await props.deleteMessage(message_id);
    setOpen(false);
    if (deleteCheck[1] === "token錯誤") {
      localStorage.removeItem("login_token");
      alert("登入逾時，請重新登入");
      window.location.reload();
    }
  };

  return (
    <div>
      <IconButton size="small" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"確定要刪除此訊息?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            訊息刪除將無法復原，請慎重考慮。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={() => handleDelete(props.messageId)} autoFocus>
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}