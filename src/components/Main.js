import React, { Component } from 'react';

import Task from './Task.js';
import CreateNewTask from './CreateNewTask.js';
import EditTaskList from './EditTaskList.js';
import DeleteTaskList from './DeleteTaskList.js';
import {allTasks, taskStore} from '../stores/index.js';
import TaskAction from '../actions/TaskAction';
import TaskListAction from '../actions/TaskListAction';


import Divider from '@material-ui/core/Divider';


class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      tasks: '',
      title: ''
    }
  }

  componentWillMount(){
    TaskAction.getTasks(this.props.match.params.id);
    TaskListAction.getTaskListTitle(this.props.match.params.id);
  }

  componentDidMount(){
    allTasks.addChangeListener(this.handleChange);
    taskStore.addChangeListener(this.titleChange);
  }

  componentWillUnmount(){
    allTasks.removeChangeListener(this.handleChange);
    taskStore.removeChangeListener(this.titleChange);
  }

  handleChange = () => {
    this.setState({
      tasks: allTasks.getTasks()
    })
  }

  titleChange = () => {
    this.setState({
      title: taskStore.getTitle()
    })
  }

  statusChange(taskId, isCompleted){
    TaskAction.updateTaskStatus({
      taskListId: this.props.match.params.id,
      taskId: taskId,
      isCompleted: isCompleted
    })
  }

  createTask(name){
    TaskAction.insertNewTask({
      taskListId: this.props.match.params.id,
      title: name
    });
  }

  changeTaskTitle(taskId, name, date, note){
    TaskAction.updateTaskTitle({
      taskListId: this.props.match.params.id,
      taskId: taskId,
      title: name,
      date: date,
      note:note
    })
  }

  deleteTask(taskId){
    TaskAction.deleteTask({
      taskListId: this.props.match.params.id,
      taskId: taskId
    })
  }

  changeTaskListName(name){
    TaskListAction.updateTaskListName({
      taskListId: this.props.match.params.id,
      title: name
    })
  }

  deleteTaskList(){
    TaskListAction.deleteTaskList({
      taskListId: this.props.match.params.id
    })
  }

  render() {
    // console.log('this', this.props.match.params.id);
    // console.log('var', this.state.title);
    return (
      <div className='main'>
        <b className='main-title'>{this.state.title}</b>
        <span className='main-add_button'>
          <CreateNewTask createTask={this.createTask.bind(this)}/>
        </span>
        <span className='main-edit_button'>
          <EditTaskList title={this.state.title} changeTaskListName={this.changeTaskListName.bind(this)}/>
        </span>
        <span className='main-remove_button'>
          <DeleteTaskList delete={this.deleteTaskList.bind(this)}/>
        </span>
        <div className='main-tasks'>
          {
            this.state.tasks
            ?
            this.state.tasks.map(task => {
              return(
                <div key={task.id}>
                  <Task text={task.text} date={(task.dueTime).toString()} note={task.notes} done={task.isCompleted} statusChange={this.statusChange.bind(this)} id={task.id} changeTaskTitle={this.changeTaskTitle.bind(this)} deleteTask={this.deleteTask.bind(this)}/>
                  <Divider/>
                </div>
              )
            })
            :
            ''
          }
        </div>
      </div>
    );
  }
}

export default Main;
