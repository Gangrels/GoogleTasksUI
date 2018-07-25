import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/Dispatcher';
import Constants from '../constants/Constants';



class SessionStore extends EventEmitter {
    constructor(initialState = []) {
        super();

        this._isLoggedIn = false;

        AppDispatcher.register((action) => {

            const {type, payload} = action;

            switch (type) {
                case Constants.AUTHORIZE_SUCCESS:
                    // console.log('Success', payload);
                    this._isLoggedIn = true;
                    this.emitChange();
                    break;

                case Constants.AUTHORIZE_FAIL:
                    console.log('Fail', payload);
                    this._isLoggedIn = false;
                    this.emitChange();
                    break;

                case Constants.LOGOUT_SUCCESS:
                    this._isLoggedIn = false;
                    this.emitChange();
                    break;

                default:
                    // console.log('empty');
            }
        })
    }

    changeAuthorize(){
        this._isLoggedIn = !this._isLoggedIn;
    }

    getAuthorize() {
        // console.log(this._isLoggedIn);
        return this._isLoggedIn;
    }

    addChangeListener(callback){
        this.on(Constants.AUTHORIZE_SUCCESS, callback);
    }

    removeChangeListener(callback){
        this.removeListener(Constants.AUTHORIZE_SUCCESS, callback);
    }

    emitChange(){
        this.emit(Constants.AUTHORIZE_SUCCESS);
    }

}

export default SessionStore;

// import {EventEmitter} from 'events';
// import AppDispatcher from '../dispatcher/Dispatcher';

// class Store extends EventEmitter{
//     constructor(initialState = []){
//         super();

//         this._items = {};
//         initialState.forEach(this._add);

//         AppDispatcher.register((action) => {
//             const {type, payload} = action;

//             switch (type) {
//                 case 'SOME_EVENT':
//                     payload.forEach(this._add);
//                     this.emitChange();
//                     break;
//                 default:
//                     console.log('empty');
//             }
//         })
//     }

//     getAll() {
//         return Object.keys(this._items).map(this.getById);
//     }

//     getById = (id) => this._items[id];

//     _add = (item) => {
//         this._items[item.id] = item;
//     }

//     addChangeListener(callback){
//         this.on('SOME_EVENT', callback);
//     }

//     removeChangeListener(callback){
//         this.removeListener('SOME_EVENT', callback);
//     }

//     emitChange(){
//         this.emit('SOME_EVENT');
//     }
// }

// export default Store;