import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog({header,body,primaryText,secondaryText,onPrimaryBtnClick,onSecondaryBtnClick,open,handleClose}) {

  return (
    <div>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{header}</DialogTitle>
       { body && <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {body}
          </DialogContentText>
        </DialogContent>}
        <DialogActions>
          <Button onClick={onPrimaryBtnClick} color="primary">
            {primaryText}
          </Button>
          <Button onClick={onSecondaryBtnClick} color="primary" autoFocus>
            {secondaryText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
