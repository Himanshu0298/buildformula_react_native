import {useDispatch} from 'react-redux';
import {useSnackbar} from 'components/Atoms/Snackbar';
import {useResProcessor} from 'hooks/useResponseProcessor';
import useTodoServices from 'services/todoList';
import * as types from './actionTypes';

export default function useTodoActions() {
  const dispatch = useDispatch();
  const snackbar = useSnackbar();
  const {_err, _res} = useResProcessor();

  const {
    get_todo_list,
    add_todo_list,
    delete_todo_list,

    get_todo_list_tasks,

    add_todo_task,
    mark_task_complete,
    mark_task_important,
    share_task,
    rearrange_tasks,
    delete_task_file,
    delete_sub_task,
    delete_task,
  } = useTodoServices();

  return {
    get_todo_list: params =>
      dispatch({
        type: types.GET_TODO_LIST,
        payload: async () => {
          try {
            const response = _res(await get_todo_list(params));
            const {data} = response;
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    add_todo_list: params =>
      dispatch({
        type: types.ADD_TODO_LIST,
        payload: async () => {
          try {
            const response = _res(await add_todo_list(params));
            const {data} = response;
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    delete_todo_list: params =>
      dispatch({
        type: types.DELETE_TODO_LIST,
        payload: async () => {
          try {
            await delete_todo_list(params);
            snackbar.showMessage({
              message: 'List Deleted successfully!',
              variant: 'warning',
            });

            return Promise.resolve(params.data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    get_todo_list_tasks: params =>
      dispatch({
        type: types.GET_TODO_LIST_TASKS,
        payload: async () => {
          try {
            const response = _res(await get_todo_list_tasks(params));
            const {data} = response;
            return Promise.resolve(data);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    add_todo_task: params =>
      dispatch({
        type: types.ADD_TASK,
        payload: async () => {
          try {
            await add_todo_task(params);
            snackbar.showMessage({
              message: 'Task Added successfully!',
            });

            return Promise.resolve(params.status_id);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    mark_task_complete: params =>
      dispatch({
        type: types.MARK_TASK_COMPLETE,
        payload: async () => {
          try {
            await mark_task_complete(params);
            snackbar.showMessage({
              message: 'Task Status Updated Successfully!',
            });

            return Promise.resolve(params.status_id);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    mark_task_important: params =>
      dispatch({
        type: types.MARK_TASK_IMPORTANT,
        payload: async () => {
          try {
            await mark_task_important(params);
            snackbar.showMessage({
              message: 'Task Status Updated Successfully!',
            });

            return Promise.resolve(params.status_id);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    share_task: params =>
      dispatch({
        type: types.SHARE_TASKS_LIST,
        payload: async () => {
          try {
            await share_task(params);
            snackbar.showMessage({
              message: 'Task Shared!',
            });

            return Promise.resolve(params.status_id);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    rearrange_tasks: params =>
      dispatch({
        type: types.REARRANGE_TASKS,
        payload: async () => {
          try {
            await rearrange_tasks(params);
            snackbar.showMessage({
              message: 'Task Rearranged!',
            });

            return Promise.resolve(params.status_id);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    delete_task_file: params =>
      dispatch({
        type: types.DELETE_TASK_FILE,
        payload: async () => {
          try {
            await delete_task_file(params);
            snackbar.showMessage({
              message: 'File Removed!',
              variant: 'warning',
            });

            return Promise.resolve(params.status_id);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    delete_sub_task: params =>
      dispatch({
        type: types.DELETE_SUB_TASK,
        payload: async () => {
          try {
            await delete_sub_task(params);
            snackbar.showMessage({
              message: 'Sub-Task Removed!',
              variant: 'warning',
            });

            return Promise.resolve(params.status_id);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),

    delete_task: params =>
      dispatch({
        type: types.DELETE_TASK,
        payload: async () => {
          try {
            await delete_task(params);
            snackbar.showMessage({
              message: 'Task Deleted!',
            });

            return Promise.resolve(params.status_id);
          } catch (error) {
            const message = _err(error);
            snackbar.showMessage({message, variant: 'error'});
            return Promise.reject(message);
          }
        },
      }),
  };
}
