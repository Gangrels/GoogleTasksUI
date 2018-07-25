import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import CreateNewList from './CreateNewList.js';
import SessionAction from '../actions/SessionAction';
import TaskListAction from '../actions/TaskListAction';
import { taskStore } from '../stores/index.js';
import TaskAction from '../actions/TaskAction';


import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
// import TaskListStore from '../stores/TaskListStore.js';

function AboutIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/>
    </SvgIcon>
  );
}

function FolderIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </SvgIcon>
  );
}

function ExitIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
    </SvgIcon>
  );
}


class SideBar extends Component {
	constructor(props){
		super(props);

		this.state = {
			tasksList: ''
		}
	}

  logOutHandle(){
    SessionAction.logout();
  }

  componentWillMount(){
    TaskListAction.getTaskLists();
  }

  componentDidMount(){
    taskStore.addChangeListener(this.handleChange);
    // taskStore.addChangeListener(this.)
  }

  componentWillUnmount(){
    taskStore.removeChangeListener(this.handleChange);
    // taskStore.addChangeListener(this.)
  }

  handleChange = () => {
    this.setState({
		tasksList: taskStore.getTasksList()
    })
  }

  componentDidUpdate(){

    let locationPathname = this.props.history.location.pathname.slice(6)

    const find = this.state.tasksList.find( tasksList => tasksList.id === locationPathname);

    if(!find){
      if(this.state.tasksList[taskStore.getPreviousDeletedIndex()]){
        const path = this.state.tasksList[taskStore.getPreviousDeletedIndex()];
        this.props.history.push(`/home/${path.id}`);
        this.reloadTasks(path.id);
      }
    }
  }

  createNewTask(name){
    TaskListAction.insertNewTask(name);
  }


  reloadTasks(id){
    TaskListAction.getTaskListTitle(id);
    TaskAction.getTasks(id);
  }

  render() {

    return (
      <div className='side-bar'>
        <h2>Google Tasks Client</h2>
        <Divider />
        <Link to='/about'>
          <Button variant="outlined" style={{ 'border': 'none', 'width': '100%', 'justifyContent': 'flex-start'}}>
            <AboutIcon style={{ 'marginRight': '10px' }}/>
            About
          </Button>
        </Link>
        <Divider />
        <p className='side-bar-divide'>Task List</p>
        <ul className='side-bar-list'>
			{this.state.tasksList
        ?
				this.state.tasksList.map((item,index) => {
					return (
						<li key={item.id}>
            {/* {console.log(this.props.history)} */}
							<NavLink to={`/home/${item.id}`} >
								<Button variant="outlined" style={{ 'border': 'none', 'width': '100%', 'justifyContent': 'flex-start' }} onClick={this.reloadTasks.bind(this, item.id)}>
									<FolderIcon style={{ 'marginRight': '10px' }}/>
									  <p className='tasks-text'>{item.title}</p>
								</Button>
							</NavLink>
						</li>
					)
				})
				:
				''
			}
          <li>
            <CreateNewList createTask={this.createNewTask}/>
          </li>
        </ul>
        <Divider />
        <Button onClick={this.logOutHandle} variant="outlined" style={{ 'border': 'none', 'width': '100%', 'justifyContent': 'flex-start' }}>
          <ExitIcon style={{ 'marginRight': '10px' }}/>
            Log Out
        </Button>
      </div>
    );
  }
}

export default SideBar;

