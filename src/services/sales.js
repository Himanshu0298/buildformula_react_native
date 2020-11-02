import {instance, useConfig} from './init';

export default function useSales() {
  let {config} = useConfig();
  return {
    getVisitorsList: (data) => {
      return instance.post('/visitors/get_lists', data, config());
    },
    getFollowUpList: (data) => {
      return instance.post('/followup/get_lists', data, config());
    },
  };
}
