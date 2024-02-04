import NetworkApi from '@components/api/NetworkApi';
import paths from '@components/api/paths';
import { useState } from 'react';

const INITIAL_STATE = {
  isLoading: false,
  isFailed: false,
  isSuccess: false,
  data: undefined,
};


export const useAuth = () => {
  const [submitLogin, setSubmitLogin] = useState<any>({ ...INITIAL_STATE });

  const handleLogin = (body: Object) => {
    setSubmitLogin({
      isLoading: true,
      isFailed: false,
      isSuccess: false,
      data: undefined,
    });
    NetworkApi.post(paths.login(), body, {}).then((res) => {
      setSubmitLogin({
        isLoading: false,
        isFailed: false,
        isSuccess: true,
        data: res?.data,
      });
    }).catch((err) => {
      console.log("Err", err)
      setSubmitLogin({
        isLoading: false,
        isFailed: true,
        isSuccess: false,
        data: err?.response?.data,
      });
    });
  }

  return {
    handleLogin,
    submitLogin
  }
}