import NetworkApi from '@components/api/NetworkApi';
import paths from '@components/api/paths';
import { useState } from 'react';
import { getCookie } from 'cookies-next';
import { useStorage } from '@utils/Storage.client';
import { STORAGE_KEYS } from '@utils/keys';

const INITIAL_STATE = {
  isLoading: false,
  isFailed: false,
  isSuccess: false,
  data: undefined,
};

export const useProperty = () => {
  const [addPropertyState, setAddPropertyState] = useState<any>({ ...INITIAL_STATE });
  const {getItem} = useStorage();
  const authData = getItem(STORAGE_KEYS.AUTH_DATA);
  const token = authData?.token || getCookie("access_token");

  const handleAddProperty = (body: object) => {
    setAddPropertyState({
      isLoading: true,
      isFailed: false,
      isSuccess: false,
      data: undefined,
    });

    NetworkApi.post(
      paths.addProperty(),
      body,
      {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    ).then((res) => {
      setAddPropertyState({
        isLoading: false,
        isFailed: false,
        isSuccess: true,
        data: res?.data,
      });
    })
    .catch((err) => {
      setAddPropertyState({
        isLoading: false,
        isFailed: true,
        isSuccess: false,
        data: undefined,
        error: err
      });
    })
  }

  return {
    addPropertyState,
    handleAddProperty
  }
}