import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SvgIcon from '@material-ui/core/SvgIcon';


function EditIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </SvgIcon>
    );
  }

export default class EditTaskList extends Component {
constructor(props){
    super(props);

    this.state = {
        open: false,
        name: ''
    }
}


  handleClickOpen = () => {
    this.setState({ open: true,
      name: this.props.title
    });
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

  editTaskListTitle(){
    this.props.changeTaskListName(this.state.name);
    this.handleClose();
  }

  render() {
    // console.log('1', this.state.name);
    // console.log('2', this.props.title);
    return (
      <div>
        <Button onClick={this.handleClickOpen} variant="fab" color="primary" aria-label="add" mini>
            <EditIcon/>
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">EDIT TASKLIST TITLE</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Type new name of the tasklist
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              // label={this.props.title}
              type="email"
              value={this.state.name}
              fullWidth
              onChange={this.handleChange.bind(this)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.editTaskListTitle.bind(this)} color="primary" disabled={!this.state.name}>
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
