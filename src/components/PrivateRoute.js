import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Убрать комментирование в рендере для редиректа авторизации

class PrivateRoute extends Component {

  render() {
    let {user, component: Component, data, ...rest} = this.props
    // console.log('user', user);
    return (
      <Route {...rest} render={
          props => (
            user ?
                <Component data={data} {...props} />
                :
                <Redirect to='/' />
          )
      }

      />

    );
  }
}

export default PrivateRoute;
