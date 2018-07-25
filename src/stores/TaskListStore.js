import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';


class TaskListStore extends EventEmitter {
    constructor(initialState = []) {
        super();

        this._taskLists = [];
        this._title = '';
        this._previousTaskList = '';
        this._previousTaskListIndex = '';

        AppDispatcher.register((action) => {

            const {type, payload, id, taskListId} = action;

            switch (type) {
                case Constants.GETTASKLISTS_SUCCESS:
                    // console.log('Success', payload);
                    this._taskLists = [];
                    this.formatData(payload)
                    this.emitChange();
                    break;

                case Constants.GETTASKLISTS_FAIL:
                    this.emitChange();
                    break;

                case Constants.CREATE_NEW_TASK_SUCCESS:
                    this.addNewTask(payload);
                    this.emitChange();
                    break;

                case Constants.CREATE_NEW_TASK_FAIL:
                    this.emitChange();
                    break;

                case Constants.GET_TASK_LIST_TITLE_SUCCESS:
                    // console.log('pyaload', payload);
                    // console.log('pyaload', id);

                    this.getCurrentTasksListTitle(payload, id)
                    this.emitChange();
                    break;

                case Constants.GET_TASK_LIST_TITLE_FAIL:
                    this.emitChange();
                    break;


                case Constants.UPDATE_TASK_LIST_TITLE_SUCCESS:
                    const index = this._taskLists.findIndex( taskList => taskList.id === payload.id);
                    const value = {
                        id: payload.id,
                        title: payload.title
                    }

                    this._taskLists[index] = value;
                    this._title = value.title;

                    this.emitChange();
                    break;

                case Constants.UPDATE_TASK_LIST_TITLE_FAIL:
                    this.emitChange();
                    break;


                case Constants.DELETE_TASK_LIST_SUCCESS:

                    const deleteId = this._taskLists.findIndex( taskList => taskList.id === taskListId);

                    this._previousTaskList = this._taskLists[deleteId - 1];
                    this._previousTaskListIndex = ((deleteId - 1) < 0) ? 0 : (deleteId - 1);

                    this._taskLists.splice(deleteId,1);

                    this.emitChange();
                    break;

                case Constants.DELETE_TASK_LIST_FAIL:
                    this.emitChange();
                    break;


                default:

            }
        })
    }

    getPreviousDeletedIndex(){
        return this._previousTaskListIndex;
    }

    addNewTask(payload){
        this._taskLists.push({
            id: payload.id,
            title: payload.title
        });
    }

    formatData(data){
        if(data.items){
            data.items.map(item=> {
                return this._taskLists.push({
                    id: item.id,
                    title: item.title
                })
            })
        } else {
            return {}
        }
    }

    getPreviousTaskList(){
        return this._previousTaskList;
    }

    getTasksList() {
        return this._taskLists;
    }

    getCurrentTasksListTitle(payload, id){

        const ind = payload.items.findIndex( list => list.id === id);

        this._title = payload.items[ind].title
        // console.log('_title', this._title);

    }

    getTitle(){
        // console.log('q', this._title);
        return this._title;
    }

    addChangeListener(callback){
        this.on(Constants.GETTASKLISTS_SUCCESS, callback);
    }

    removeChangeListener(callback){
        this.removeListener(Constants.GETTASKLISTS_SUCCESS, callback);
    }

    emitChange(){
        this.emit(Constants.GETTASKLISTS_SUCCESS);
    }


    addTitleListener(callback){
        this.on(Constants.GET_TASK_LIST_TITLE_SUCCESS, callback);
    }

    removeTitleListener(callback){
        this.removeListener(Constants.GET_TASK_LIST_TITLE_SUCCESS, callback);
    }

    emitTitle(){
        this.emit(Constants.GET_TASK_LIST_TITLE_SUCCESS);
    }


    addTaskListDeleteListener(callback){
        this.on(Constants.DELETE_TASK_LIST_SUCCESS, callback);
    }

    removeTaskListDeleteListener(callback){
        this.removeListener(Constants.DELETE_TASK_LIST_SUCCESS, callback);
    }

    emitTaskListDeleteListener(){
        this.emit(Constants.DELETE_TASK_LIST_SUCCESS);
    }

}

export default TaskListStore;