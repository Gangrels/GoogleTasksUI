// import googleTasksApi from 'google-tasks-api';

// export default function getAuthorize(){
//     async function asyncCall() {
//         await googleTasksApi.authorize('923829358165-hq9harltp2tg3adbup3uu1s1jt4lra25.apps.googleusercontent.com');
//       }

//     return asyncCall();
// }




const CLIENT_ID = '923829358165-hq9harltp2tg3adbup3uu1s1jt4lra25.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/plus.me'];

//function

export default {
    authorize(params){
        return  new Promise((resolve,reject)=>{
            return window.gapi.load('client:auth', () =>{
                return window.gapi.auth.authorize(
                    {
                            'client_id':CLIENT_ID,
                            'scope': SCOPES,
                            'immediate': params.immediate,
                            'cookie_policy':'single_host_origin'
                },
                authResult=>{
                        if(authResult.error){
                            return reject(authResult.error);
                        }
                        return window.gapi.client.load('tasks', 'v1', () => window.gapi.client.load('plus', 'v1', () => resolve('ok')));
                })
            })
        })
    },

    listTaskList(){

        const request = window.gapi.client.tasks.tasklists.list();

        return new Promise((resolve,rejected)=>{
            request.execute(resp=>resolve(resp))
        });
    },

    createNewTask({name}){
        const request = window.gapi.client.tasks.tasklists.insert({ title: name});

        return new Promise((resolve,rejected)=>{
            request.execute(resp=>resolve(resp))
        });
    },

    listTasks({taskListId}){
        const request = window.gapi.client.tasks.tasks.list({ tasklist: taskListId});

        return new Promise((resolve,rejected)=>{
            request.execute(resp=>resolve(resp))
        });
    },

    updateTask({ taskListId, taskId, note, time, ...params }) {
        const request = window.gapi.client.tasks.tasks.update({
            tasklist : taskListId,
            task     : taskId,
            id       : taskId,
            notes    : note,
            due      : time,
            ...params
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    deleteTask({ taskListId, task }) {
        const request = window.gapi.client.tasks.tasks.delete({
            tasklist : taskListId,
            task     : task
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },


    insertTask({ taskListId, title }) {
        const request = window.gapi.client.tasks.tasks.insert({
            tasklist : taskListId,
            title     : title
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    updateTaskListTitle({ taskListId, title, ...params }){

        const request = window.gapi.client.tasks.tasklists.patch({
            tasklist : taskListId,
            title    : title,
            ...params
        });


        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    deleteTaskList({ taskListId }) {
        const request = window.gapi.client.tasks.tasklists.delete({
            tasklist : taskListId
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },


    logout() {
        return new Promise((resolve, reject) => {
            //eslint-disable-next-line
            const token = gapi.auth.getToken();

            if (token) {
            //eslint-disable-next-line
            const accessToken = gapi.auth.getToken().access_token;


            fetch(`https://accounts.google.com/o/oauth2/revoke?token=${accessToken}`, {
                mode: 'no-cors'
            })
                .then((res) => {
                    //eslint-disable-next-line
                    gapi.auth.signOut();
                    resolve();
                })
                .catch((error) => reject(error));
            }

        });
    }
}
// export default {
//     authorize,
//     listTaskList
// };