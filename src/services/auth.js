import { instance, useConfig } from './init';

export default function useAuth() {
  let { config } = useConfig();
  return ({
    login: (data) => {
      return instance.post('/login', data, config({ multipart: true }));
    },
  });
}
