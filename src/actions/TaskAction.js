import AppDispatcher from '../dispatcher/Dispatcher.js';
import api from '../api/index.js';
import Constants from '../constants/Constants.js';

const TaskAction = {

    getTasks(taskListId){
        api.listTasks({taskListId})
        .then((payload)=>{
            AppDispatcher.dispatch({
                type:Constants.GET_TASKS_SUCCESS,
                payload: payload || []
            });
        })
        .catch((err)=>{
            AppDispatcher.dispatch({
                type: Constants.GET_TASKS_FAIL,
                error:err
            })
        })

    },

    updateTaskStatus(params){
        // console.log('params', params);
        api.updateTask({
            taskListId: params.taskListId,
            taskId: params.taskId,
            status: params.isCompleted ? 'completed' : 'needsAction'
        })
        .then((payload)=>{
            AppDispatcher.dispatch({
                type:Constants.UPDATE_TASK_SUCCESS,
                payload: payload,
                taskId: params.taskId
            })
        })
        .catch((err)=>{
            AppDispatcher.dispatch({
                type: Constants.UPDATE_TASK_FAIL,
                error:err
            })
        })
    },

    updateTaskTitle(params){
        api.updateTask({
            taskListId: params.taskListId,
            taskId: params.taskId,
            title: params.title,
            note: params.note,
            time: new Date(params.date)
        })
        .then((payload)=>{
            AppDispatcher.dispatch({
                type:Constants.UPDATE_TASK_TITLE_SUCCESS,
                payload: payload,
                taskId: params.taskId
            })
        })
        .catch((err)=>{
            AppDispatcher.dispatch({
                type: Constants.UPDATE_TASK_TITLE_FAIL,
                error:err
            })
        })
    },

    deleteTask(params){
        // console.log('params', params);
        api.deleteTask({
            taskListId: params.taskListId,
            task: params.taskId
        })
        .then((payload)=>{
            AppDispatcher.dispatch({
                type:Constants.DELETE_TASK_SUCCESS,
                payload: payload,
                taskIndex: params.taskId
            })
        })
        .catch((err)=>{
            AppDispatcher.dispatch({
                type: Constants.DELETE_TASK_FAIL,
                error:err
            })
        })
    },

    insertNewTask(params){
        api.insertTask({
            taskListId: params.taskListId,
            title: params.title
        })
        .then((payload)=>{
            AppDispatcher.dispatch({
                type:Constants.CREATE_TASK_SUCCESS,
                payload: payload,
            })
        })
        .catch((err)=>{
            AppDispatcher.dispatch({
                type: Constants.CREATE_TASK_FAIL,
                error:err
            })
        })
    }
};

export default TaskAction;