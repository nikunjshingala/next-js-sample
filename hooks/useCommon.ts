import NetworkApi from '@components/api/NetworkApi';
import paths from '@components/api/paths';
import { getCookie } from 'cookies-next';

export const getStateList = async () => {
  try {
    const res = await NetworkApi.get(paths.getStates(), {}, {
      Accept: 'application/json'
    })
    const data = res.data;
  
    return data;
  } catch (error) {
    return [];
  }
};

export const getCityLists = async (stateId: string | null) => {
  try {
    const res = await NetworkApi.get(paths.getCity(stateId), {}, {
      Accept: 'application/json'
    })
  
    const data = res.data;
    return data;
  } catch (error) {
    return []
  }
}