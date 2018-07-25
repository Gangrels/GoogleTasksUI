import AppDispatcher from '../dispatcher/Dispatcher.js';
import api from '../api/index.js';
import Constants from '../constants/Constants.js';

// export default function logIn(){
//     getAuthorize()
//     .then( () => AppDispatcher.dispatch({
//         type: Constants.AUTHORIZE_SUCCESS,
//         payload: ''
//     }))
//     .catch( err => AppDispatcher.dispatch({
//         type: Constants.AUTHORIZE_FAIL,
//         payload: err
//     }))
// }


const SessionAction = {

    authorize(immediate=false, callback){

        api.authorize({ immediate }).then(()=>{
            AppDispatcher.dispatch({
                type:Constants.AUTHORIZE_SUCCESS
            });

            if(callback){
                callback();
            }
        })
        .catch((err)=>{
            AppDispatcher.dispatch({
                type: Constants.AUTHORIZE_FAIL,
                error:err
            })
            if(callback){
                callback();
            }
        })

    },

    logout() {
        return new Promise((resolve, reject) => {
          api.logout()
              .then(() => {
                AppDispatcher.dispatch({
                  type: Constants.LOGOUT_SUCCESS
                });
                resolve();
              })
              .catch((error) => reject(error));
        });
      }
};

export default SessionAction;