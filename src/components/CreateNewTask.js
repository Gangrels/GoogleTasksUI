import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SvgIcon from '@material-ui/core/SvgIcon';


function AddIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </SvgIcon>
    );
  }

export default class CreateNewTask extends Component {
constructor(props){
    super(props);

    this.state = {
        open: false,
        name: ''
    }
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState(
      { name: '',
        open: false
      });
  };

  handleChange(e){
    this.setState({name: e.target.value});
  }

  createNewTask(){
    this.props.createTask(this.state.name);
    this.handleClose();
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen} variant="fab" color="secondary" aria-label="add" mini>
            <AddIcon/>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">ADD NEW TASK</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Type the name of the new task
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name of the task"
              type="email"
              fullWidth
              onChange={this.handleChange.bind(this)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.createNewTask.bind(this)} color="primary" disabled={!this.state.name}>
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
