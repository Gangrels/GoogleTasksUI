import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SvgIcon from '@material-ui/core/SvgIcon';


function DeleteIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </SvgIcon>
    );
  }

export default class DeleteTaskList extends Component {
constructor(props){
    super(props);

    this.state = {
        open: false
    }
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState(
      {
        open: false
      });
  };

  deleteTaskList(){
    this.props.delete();
    this.handleClose();
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen} variant="fab" aria-label="add" mini>
            <DeleteIcon/>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">DELETE TASKLIST</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure that you want to delete this tasklist
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.deleteTaskList.bind(this)} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
