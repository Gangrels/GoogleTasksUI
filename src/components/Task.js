import React, { Component } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function VertIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </SvgIcon>
  );
}

// const style = {
//     textfield: {
//         borderBottom: 'none'
//     }
// }


class Task extends Component {
  constructor(props){
    super(props);

    this.textInput = React.createRef();

    this.state = {
      checkedA: true,
      anchorEl: null,
      isEdit: false,
      name: '',
      date: '',
      note: this.props.note,
      focus: true
    }
  }
//this.props.date ? new Date(this.props.date).toLocaleDateString() :

  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.checked });
  // };

  componentWillMount(){
    this.formatDate(this.props.date);
  }

  componentDidUpdate(){

    if (this.state.isEdit){
      // console.dir(this.textInput.current.value.length)
      if(this.textInput.current.value.length === 0){
        return;
      }

      if(!this.state.name){
        this.setState({ name: this.textInput.current.value });
      }

      if(this.state.focus){
        this.setState({focus: false});
        this.textInput.current.focus();
      }
    }
  }

  handleChange(){
    this.props.statusChange(this.props.id, (!this.props.done));
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  escapeHandle(evt){
    if(evt.keyCode === 27){
      this.setState({ anchorEl: null });
    }
  }

  handleDelete = () => {
    this.setState({ anchorEl: null });
    this.props.deleteTask(this.props.id);
  };

  handleEdit = () => {
    this.setState({ anchorEl: null });
    this.setState({isEdit: true});
  };

  cancelEdit(){

    this.setState(
      {
        name: '',
        isEdit: false
      })
  }

  apllyEdit(){
    // console.log('date', this.state.date, this.state.note);
    this.props.changeTaskTitle(this.props.id, this.state.name, this.state.date, this.state.note);
    this.setState(
      {
        name: '',
        isEdit: false
      })
  }

  changeEdit(evt){
    this.setState({name: evt.target.value})
  }

  keyEvent(evt){
    if (evt.keyCode === 27){
      this.cancelEdit();
    }

    if (evt.keyCode === 13){
      this.apllyEdit();
    }
  }

  formatDate(date){
    if(!date){
      // console.log('not');
      return '';
    }

    let formatedDate = new Date(date);

    this.setState({date: `${formatedDate.getFullYear()}-${(('0'+(String(formatedDate.getMonth()+1))).slice(-2))}-${(('0'+(String(formatedDate.getDate()))).slice(-2))}`});
  }

  changeNote(evt){
    this.setState({note: evt.target.value});
  }

  dateChange(evt){
    this.setState({date: evt.target.value});
  }



  render() {
    const { anchorEl } = this.state;
    // console.log('date', this.state.name);

    return (
        this.state.isEdit
        ?
          <div className='task'>
            <div className='task-edit-container'>
              <div>
                  <input
                    className='task-input'
                    type='text'
                    defaultValue={this.props.text}
                    onChange={this.changeEdit.bind(this)}
                    // onKeyDown={this.handleKeyDown}
                    // ref={c => this.input = c}
                    ref={this.textInput}
                    onKeyDown={this.keyEvent.bind(this)}
                  />
              </div>
              <div className='task-date-pick'>
                {/* <span>Pick the date</span> */}
                <form className='task-date-picker' noValidate>
                  <TextField
                    id="date"
                    label="Pick the date"
                    type="date"
                    defaultValue={this.state.date}
                    className='task-date-picker-field'
                    onChange={this.dateChange.bind(this)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
              </div>
              <div className='task-note-edit'>
                <div className='task-note-head'>Note</div>
                  <input
                    // className='task-input'
                    type='text'
                    defaultValue={this.props.note}
                    className='task-note-body'
                    onChange={this.changeNote.bind(this)}
                  />
              </div>
              <div>
                <Button variant="contained" color="secondary" className='task-savebutton' style={{ 'marginRight': '10px', 'marginBottom': '10px', 'marginLeft': '10px'}} onClick={this.apllyEdit.bind(this)}>
                  Save
                </Button>
                <Button variant="contained" className='task-cancelbutton' style={{'marginRight': '10px', 'marginBottom': '10px'}} onClick={this.cancelEdit.bind(this)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        :
          <div className='task'>
            <Checkbox
              onChange={this.handleChange.bind(this)}
              value="checkedA"
              // checked={this.state.checkedA}
              checked={this.props.done}
              // style={{ 'border': '1px solid black'}}
            />
            <span className='task-text'>{this.props.text}</span>

            <span className='task-menu'>
              <IconButton
                aria-label="More"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
              <VertIcon/>
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
                onKeyDown={this.escapeHandle.bind(this)}
              >
                <MenuItem onClick={this.handleEdit.bind(this)}>Edit</MenuItem>
                <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
              </Menu>
            </span>
            {this.state.date || this.state.note
              ?
              <div className='task-additions'>
                {this.state.date
                  ?
                  <div className='task-date'>
                    {new Date(this.state.date).toLocaleDateString()}
                  </div>
                  :
                  ''
                }
                {this.state.note
                  ?
                  <div className='task-note'>
                    {this.state.note}
                  </div>
                  :
                  ''
                }
              </div>
              :
              ''
            }

          </div>

    );
  }
}

export default Task;


            // {/* {this.props.date || this.props.note
            //   ?
            //   <div className='task-additions'>
            //     {this.props.date
            //       ?
            //       <div className='task-date'>
            //         {new Date(this.props.date).toLocaleDateString()}
            //       </div>
            //       :
            //       ''
            //     }
            //     {this.props.note
            //       ?
            //       <div className='task-note'>
            //         {this.props.note}
            //       </div>
            //       :
            //       ''
            //     }
            //   </div>
            //   :
            //   ''
            // } */}