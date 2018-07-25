import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './components/LoginPage.js';
import HomePage from './components/HomePage.js';
import DefaultPage from './components/DefaultPage.js';
// import logIn from './actions/SessionAction';


import store from './stores/index.js';


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggedIn : store.getAuthorize()
    }
  }


  componentDidMount(){
    store.addChangeListener(this.handleChange);
  }

  componentWillUnmount(){
    store.addChangeListener(this.handleChange);
  }

  handleChange = () => {
    this.setState({
      isLoggedIn: store.getAuthorize()
    })
  }

// Will-change потребляет слишком много памяти - ворнинг при нажатии на кнопки

// Добавить к времени значек таймера
// Добавить к комменту значек облака мыслей

// Сделать выполненые таски серым цветом и зачёркнутыми в css на 125 строке
// Поправить поведение при переполнении текста в таске
// Добавить домашнюю страницу

// logout работает только после перезагрузки браузера из-за localhost
// Можно попробовать logout с auth2
// https://github.com/r0bs/tasg/blob/master/src/actions/google.js
// https://github.com/wellingtonsampaio/react-kanban-board/blob/master/app/services/authApiService.js

// Попробовать заредериктеть ну ту страницу, которую изначально хотели открыть
// с помощью history, location, push или replace
// В рендер в роуте можно инициализировать собственные функции ( строка 66)



  render() {
    // console.log('q', store.getAuthorize());
    return (
      <Switch>
            <Route exact path="/" render={() => (
              store.getAuthorize() ? (
                <Redirect to="/home"/>
              ) : (
                <LoginPage/>
              )
            )}/>
            <Route path='/home' render={(props) => {
                // console.log('123');
                return <HomePage logIn={store.getAuthorize()} {...props}/>
              }
            } />

            <Route component={DefaultPage} />
      </Switch>
    );
  }
}

export default App;