import AppDispatcher from '../dispatcher/Dispatcher.js';
import api from '../api/index.js';
import Constants from '../constants/Constants.js';

const TaskListAction = {

    getTaskLists(){
        api.listTaskList()
        .then((payload)=>{
            AppDispatcher.dispatch({
                type:Constants.GETTASKLISTS_SUCCESS,
                payload: payload
            });
        })
        .catch((err)=>{
            AppDispatcher.dispatch({
                type: Constants.GETTASKLISTS_FAIL,
                error:err
            })
        })

    },

    insertNewTask(name){
        api.createNewTask( {name} )
        .then((payload)=>{
            AppDispatcher.dispatch({
                type:Constants.CREATE_NEW_TASK_SUCCESS,
                payload: payload
            });
        })
        .catch((err)=>{
            AppDispatcher.dispatch({
                type: Constants.CREATE_NEW_TASK_FAIL,
                error:err
            })
        })
    },

    updateTaskListName(params){
        api.updateTaskListTitle({
            taskListId: params.taskListId,
            title: params.title
        })
        .then( (payload) => {
            AppDispatcher.dispatch({
                type:Constants.UPDATE_TASK_LIST_TITLE_SUCCESS,
                payload: payload,
            });
        })
        .catch((err)=>{
            AppDispatcher.dispatch({
                type: Constants.UPDATE_TASK_LIST_TITLE_FAIL,
                error:err
            })
        })
    },

    deleteTaskList(params){
        api.deleteTaskList({
            taskListId: params.taskListId
        })
        .then( (payload) => {
            AppDispatcher.dispatch({
                type:Constants.DELETE_TASK_LIST_SUCCESS,
                payload: payload,
                taskListId: params.taskListId
            });
        })
        .catch((err)=>{
            AppDispatcher.dispatch({
                type: Constants.DELETE_TASK_LIST_FAIL,
                error:err
            })
        })
    },

    getTaskListTitle(id){
        api.listTaskList()
        .then( (payload) => {
            AppDispatcher.dispatch({
                type:Constants.GET_TASK_LIST_TITLE_SUCCESS,
                payload: payload,
                id: id
            });
        })
        .catch((err)=>{
            AppDispatcher.dispatch({
                type: Constants.GET_TASK_LIST_TITLE_FAIL,
                error:err
            })
        })
    }
};

export default TaskListAction;