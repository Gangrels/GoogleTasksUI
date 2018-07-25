import React, { Component } from 'react';

import Main from './Main.js';
import SideBar from './SideBar.js';
import PrivateRoute from './PrivateRoute.js';


class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {

          }
    }

  render() {
    return (
      <div className='home-container'>
          <PrivateRoute path='/home' user={this.props.logIn} component={SideBar} data={'qwe'}/>
          <PrivateRoute path='/home/:id' user={this.props.logIn} component={Main} data={'ewq'}/>
      </div>
    );
  }
}

export default HomePage;
