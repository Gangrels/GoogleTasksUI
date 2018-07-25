import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class DefaultPage extends Component {

  render() {

    return (
      <div>
        <div>Такой страницы нет</div>
        <Link to='/home'> Домой </Link>
      </div>
    );
  }
}

export default DefaultPage;
