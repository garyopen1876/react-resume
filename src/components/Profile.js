import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Profile(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.handleAnClose();
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>個人頁面</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.owner + "先生/女士 歡迎您的到來"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            很感謝您對於本網站的支持，以下是您曾提供的意見，希望您能持續回饋使我們進步。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>掰掰</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
