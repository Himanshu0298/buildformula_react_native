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
    getSalesData: (data) => {
      return instance.post('/followup/other_info', data, config());
    },
    addVisitor: (data) => {
      return instance.post('/visitors/add', data, config());
    },
    addFollowUp: (data) => {
      return instance.post('/visitors/addfollowup', data, config());
    },
  };
}
