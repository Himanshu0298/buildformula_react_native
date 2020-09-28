import {instance, useConfig} from './init';

export default function useProject() {
  let {config} = useConfig();
  return {
    createProject: (data) => {
      console.log('-----> data', data);
      return instance.post(
        '/project/create',
        data,
        config({multipart: true, auth: false}),
      );
    },
  };
}
