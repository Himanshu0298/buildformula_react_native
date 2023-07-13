import {instance, config} from './init';

export default function useTodoServices() {
  const params = config({multipart: false});

  return {
    get_todo_list: data => {
      return instance.post('/todolists/list', data, params);
    },
    // list will be updated if todo_id is passed
    add_todo_list: data => {
      return instance.post('/todolist/save', data, params);
    },
    delete_todo_list: data => {
      return instance.post('/todolist/delete', data, params);
    },

    get_todo_list_tasks: data => {
      return instance.post('/todolist/details', data, params);
    },

    // add tasks in list
    add_todo_task: data => {
      return instance.post(
        '/todolist/save/task',
        data,
        config({multipart: true}),
      );
    },
    mark_task_complete: data => {
      return instance.post('/todolist/task/complate', data, params);
    },
    mark_task_important: data => {
      return instance.post('/todolist/task/important', data, params);
    },
    share_task: data => {
      return instance.post('/todolists/sharelist', data, params);
    },
    rearrange_tasks: data => {
      return instance.post('/todolists/rearrange', data, params);
    },
    delete_task_file: data => {
      return instance.post('/todolists/file_delete', data, params);
    },
    delete_sub_task: data => {
      return instance.post('/todolists/delete/sub/task', data, params);
    },
    delete_task: data => {
      return instance.post('/todolist/delete/task', data, params);
    },
  };
}
