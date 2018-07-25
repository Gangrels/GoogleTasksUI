import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';


class TaskStore extends EventEmitter {
    constructor(initialState = []) {
        super();

        this._tasks = [];

        AppDispatcher.register((action) => {

            const {type, payload, taskIndex} = action;

            switch (type) {
                case Constants.GET_TASKS_SUCCESS:
                // console.log('Success', payload);
                this._tasks = payload.items ? payload.items.map(this.formatTask) : [];

                    // console.log('this._tasks', this._tasks);
                    this.emitChange();
                    break;

                case Constants.GET_TASKS_FAIL:
                    this.emitChange();
                    break;


                case Constants.UPDATE_TASK_SUCCESS:

                    const ind = this._tasks.findIndex( task => task.id === payload.id);

                    this._tasks[ind] = this.formatTask(payload)

                    this.emitChange();
                    break;

                case Constants.UPDATE_TASK_FAIL:
                    this.emitChange();
                    break;


                case Constants.UPDATE_TASK_TITLE_SUCCESS:
                    // console.log('payload', payload);
                    const indx = this._tasks.findIndex( task => task.id === payload.id);

                    this._tasks[indx] = this.formatTask(payload)

                    this.emitChange();
                    break;

                case Constants.UPDATE_TASK_TITLE_FAIL:
                    this.emitChange();
                    break;


                case Constants.CREATE_TASK_SUCCESS:

                    this._tasks.unshift(this.formatTask(payload));

                    this.emitChange();
                    break;

                case Constants.CREATE_TASK_FAIL:
                    this.emitChange();
                    break;


                case Constants.DELETE_TASK_SUCCESS:

                    const index = this._tasks.findIndex( task => task.id === taskIndex);

                    this._tasks.splice(index,1);

                    this.emitChange();
                    break;

                case Constants.DELETE_TASK_FAIL:
                    this.emitChange();
                    break;


                default:

            }
        })
    }

    formatTask(task){
        return {
            id: task.id,
            text: task.title,
            notes: task.notes ? task.notes : '',
            dueTime: task.due ? new Date(task.due) : '',
            isCompleted: task.status === 'completed',
            position: task.position
        };
    }


    getTasks() {
        return this._tasks;
    }

    addChangeListener(callback){
        this.on(Constants.GET_TASKS_SUCCESS, callback);
    }

    removeChangeListener(callback){
        this.removeListener(Constants.GET_TASKS_SUCCESS, callback);
    }

    emitChange(){
        this.emit(Constants.GET_TASKS_SUCCESS);
    }

}

export default TaskStore;