import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import store from '../stores/index.js';

import SessionAction from '../actions/SessionAction';

import { withRouter } from 'react-router-dom';


const style = {
    button: {
        background: 'linear-gradient(135deg, #23db97 0%,#6db1d6 100%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        width: '20%',
        margin: '30px 0'
    }
}

class LoginPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoggedIn : store.getAuthorize()
          }
    }

    clickHandle(){
        // console.log('this clicked');

        SessionAction.authorize();

        this.props.history.push('/home');
        // console.log('clicked', this.props);
    }


  render() {

    return (
      <div className='login-page'>
        <div className='login-page-container'>
            <h1>My Google Tasks App</h1>
            <Button variant="contained" style={style.button} onClick={this.clickHandle.bind(this)}>
                Log In
            </Button>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
